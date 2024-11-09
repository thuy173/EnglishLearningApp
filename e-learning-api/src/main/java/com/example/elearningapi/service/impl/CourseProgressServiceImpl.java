package com.example.elearningapi.service.impl;

import com.example.elearningapi.beans.request.CourseEnrollRequest;
import com.example.elearningapi.beans.request.UpdateLearningTimeRequest;
import com.example.elearningapi.beans.response.UserCourseResponse;
import com.example.elearningapi.beans.response.user.UserProgressResponse;
import com.example.elearningapi.entity.Lesson;
import com.example.elearningapi.entity.UserCourse;
import com.example.elearningapi.entity.UserLesson;
import com.example.elearningapi.enums.UserCourseStatus;
import com.example.elearningapi.enums.UserLessonStatus;
import com.example.elearningapi.exception.DuplicateException;
import com.example.elearningapi.exception.ResourceNotFoundException;
import com.example.elearningapi.mapper.UserCourseMapper;
import com.example.elearningapi.repository.CourseRepository;
import com.example.elearningapi.repository.UserCourseRepository;
import com.example.elearningapi.repository.UserLessonRepository;
import com.example.elearningapi.repository.UserRepository;
import com.example.elearningapi.service.CourseProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseProgressServiceImpl implements CourseProgressService {
    private final UserCourseRepository userCourseRepository;
    private final UserLessonRepository userLessonRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final UserCourseMapper userCourseMapper;

    @Override
    public UserProgressResponse getUserProgress(Long userId, Long courseId) {
        UserCourse userCourse = userCourseRepository.findUserCourseById(userId, courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course progress not found"));

        UserProgressResponse response = new UserProgressResponse();
        response.setCourseProgress(userCourseMapper.toUserCourseResponse(userCourse));

        Map<String, Integer> statistics = new HashMap<>();
        statistics.put("totalLessonCompleted", calculateCompletedLessons(userCourse));
        statistics.put("totalTimeSpent", calculateTotalTimeSpent(userCourse));
        response.setStatistics(statistics);

        return response;
    }

    @Override
    public UserCourseResponse enrollCourse(CourseEnrollRequest request) {
        if(userCourseRepository.findUserCourseById(
                request.getUserId(),
                request.getCourseId()).isPresent()){
            throw new DuplicateException("Already enrolled in this course");
        }

        UserCourse userCourse = new UserCourse();
        userCourse.setUser(userRepository.getReferenceById(request.getUserId()));
        userCourse.setCourse(courseRepository.getReferenceById(request.getCourseId()));
        userCourse.setEnrollDate(LocalDateTime.now());
        userCourse.setStatus(UserCourseStatus.ENROLLED);

        userCourse = userCourseRepository.save(userCourse);

        initializedLessons(userCourse);

        return userCourseMapper.toUserCourseResponse(userCourse);
    }

    @Override
    public void updateLearningTime(UpdateLearningTimeRequest request) {
        UserLesson userLesson = userLessonRepository.findByUserCourse_IdAndLesson_Id(
                        request.getUserCourseId(),
                        request.getLessonId())
                .orElseThrow(() -> new ResourceNotFoundException("User lesson not found"));

        // Cập nhật thời gian học
        int currentTimeSpent = userLesson.getTimeSpent() != null ? userLesson.getTimeSpent() : 0;
        userLesson.setTimeSpent(currentTimeSpent + request.getLearningTimeInMinutes());

        // Cập nhật trạng thái bài học nếu cần
        if (request.getIsCompleted() != null && request.getIsCompleted()) {
            userLesson.setStatus(UserLessonStatus.COMPLETED);
            userLesson.setCompletedDate(LocalDateTime.now());
        } else if (userLesson.getStatus() == UserLessonStatus.NOT_STARTED) {
            userLesson.setStatus(UserLessonStatus.IN_PROGRESS);
        }

        // Cập nhật điểm số nếu có
        if (request.getScore() != null) {
            userLesson.setScore(request.getScore());
        }

        userLessonRepository.save(userLesson);

        // Kiểm tra và cập nhật trạng thái khóa học nếu tất cả bài học đã hoàn thành
        updateCourseStatusIfNeeded(userLesson.getUserCourse());
    }

    @Override
    public Map<String, Object> getUserStatistics(Long userId) {
        List<UserCourse> userCourses = userCourseRepository.findAllByUserId(userId);
        Map<String, Object> statistics = new HashMap<>();

        int totalTimeSpent = userCourses.stream()
                .mapToInt(this::calculateTotalTimeSpent)
                .sum();

        int totalCompleteLessons = userCourses.stream()
                .mapToInt(this::calculateCompletedLessons)
                .sum();

        long completedCourses = userCourses.stream()
                .filter(course -> UserCourseStatus.COMPLETED.equals(course.getStatus()))
                .count();

        double overallAverge = userCourses.stream()
                .mapToDouble(this::calculateAverageScore)
                .average()
                .orElse(0.0);

        int currentStreak = calculateCurrentStreak(userId);
        statistics.put("totalTimeSpentMinutes", totalTimeSpent);
        statistics.put("totalCompleteLessons", totalCompleteLessons);
        statistics.put("completedCourses", completedCourses);
        statistics.put("overallAverage", Math.round(overallAverge * 10.0) / 10.0);
        statistics.put("currentStreak", currentStreak);
        statistics.put("learningByDay", getLearningByDay(userId));

        return statistics;
    }

    @Override
    public List<UserCourseResponse> getUserCourses(Long userId, UserCourseStatus status) {
        List<UserCourse> userCourses;

        if(status != null){
//            userCourses = userCourseRepository.findByUserIdAndStatus(userId, status);
            userCourses = userCourseRepository.findAllByUserId(userId);
        }else{
            userCourses = userCourseRepository.findAllByUserId(userId);
        }
        userCourses.forEach(this::calculateAdditionalInfo);

        return userCourseMapper.toUserCourseResponseList(userCourses);
    }

    private void initializedLessons(UserCourse userCourse) {
        List<Lesson> lessons = userCourse.getCourse().getLessons();
        lessons.forEach( lesson -> {
            UserLesson userLesson = new UserLesson();
            userLesson.setUserCourse(userCourse);
            userLesson.setLesson(lesson);
            userLesson.setStartDate(LocalDateTime.now());
            userLesson.setStatus(UserLessonStatus.NOT_STARTED);
            userLessonRepository.save(userLesson);
        });
    }

    private int calculateCompletedLessons(UserCourse userCourse){
        return (int) userCourse.getUserLessons().stream()
                .filter(lesson -> UserLessonStatus.COMPLETED.equals(lesson.getStatus()))
                .count();
    }

    private int calculateTotalTimeSpent(UserCourse userCourse){
        return userCourse.getUserLessons().stream()
                .mapToInt(UserLesson::getTimeSpent)
                .sum();
    }

    private double calculateAverageScore(UserCourse userCourse){
        List<UserLesson> completedLessons = userCourse.getUserLessons().stream()
                .filter(lesson -> lesson.getScore() != null)
                .collect(Collectors.toList());
        if(completedLessons.isEmpty()){
            return 0.0;
        }

        double totalScore = completedLessons.stream()
                .mapToInt(UserLesson::getScore)
                .sum();

        return totalScore / completedLessons.size();
    }

    private int calculateCurrentStreak(Long userId){
        List<LocalDateTime> learningDays = userLessonRepository
                .findLearningDaysByUserId(userId);

        if(learningDays.isEmpty()){
            return 0;
        }

        int streak = 1;
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime lastLearningDay = learningDays.get(0);

        if(lastLearningDay.isBefore(currentDate.minusDays(1))){
            return 0;
        }

        for(int i =1; i < learningDays.size(); i++){
            LocalDateTime previousDay = learningDays.get(i);
            if(lastLearningDay.minusDays(1).equals(previousDay)){
                streak++;
                lastLearningDay = previousDay;
            }else{
                break;
            }
        }
        return streak;
    }

    private Map<String, Integer> getLearningByDay(Long userId) {
        LocalDateTime startDate = LocalDateTime.now().minusDays(6).truncatedTo(ChronoUnit.DAYS);
        List<Object[]> learningByDay = userLessonRepository
                .findLearningTimeByDayAndUser(userId, startDate);
        Map<String, Integer> result = new HashMap<>();

        for (Object[] row : learningByDay) {
            LocalDateTime dateTime = ((Date) row[0]).toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            Integer minutes = ((Number) row[1]).intValue();
            result.put(dateTime.toLocalDate().toString(), minutes);
        }
        return result;
    }


    private void calculateAdditionalInfo(UserCourse userCourse){
        List<UserLesson> lessons = userLessonRepository.findByUserCourseId(userCourse.getId());
        long completeCount = lessons.stream()
                .filter(l -> l.getStatus() == UserLessonStatus.COMPLETED)
                .count();
        int progress = (int) ((completeCount * 100.0) / lessons.size());
        userCourse.setProgressPercentage(progress);

        userCourse.setLastAccessDate(LocalDateTime.now());
    }

    private void updateCourseStatusIfNeeded(UserCourse userCourse) {
        boolean allLessonsCompleted = userCourse.getUserLessons().stream()
                .allMatch(lesson -> UserLessonStatus.COMPLETED.equals(lesson.getStatus()));

        if (allLessonsCompleted && !UserCourseStatus.COMPLETED.equals(userCourse.getStatus())) {
            userCourse.setStatus(UserCourseStatus.COMPLETED);
            userCourse.setCompletedDate(LocalDateTime.now());
            userCourseRepository.save(userCourse);
        }
    }
}

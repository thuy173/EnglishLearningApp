import { Card } from "@/components/ui/card";
import LessonImg from "../../../assets/course-progress-star-2.svg";
import LessonCompletedImg from "../../../assets/course-progress-star-1.svg";
import VocabImg from "../../../assets/course-progress-not-learn-1.svg";
import VocabCompleteImg from "../../../assets/course-progress-learned-1.svg";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectProgressCourse } from "@/redux/apps/progress/ProgressSelectors";
import { fetchProgressCourseData } from "@/redux/apps/progress/ProgressSlice";

interface ProgressProps {
  courseId: number;
}
const ProgressItem: React.FC<ProgressProps> = ({ courseId }) => {
  const dispatch = useAppDispatch();
  const progress = useAppSelector(selectProgressCourse);

  useEffect(() => {
    dispatch(fetchProgressCourseData(courseId));
  }, [dispatch, courseId]);

  const unfinished = progress
    ? progress.totalLessons - progress.completedLessons
    : 0;

  const vocabStats = useMemo(() => {
    if (!progress || !progress.lessonProgress) {
      return {
        totalVocabs: 0,
        correctVocabs: 0,
      };
    }
    return progress.lessonProgress.reduce(
      (acc, lesson) => {
        return {
          totalVocabs: acc.totalVocabs + lesson.totalVocabs,
          correctVocabs: acc.correctVocabs + lesson.correctVocabs,
        };
      },
      {
        totalVocabs: 0,
        correctVocabs: 0,
      }
    );
  }, [progress]);

  const incorrectVocabs = vocabStats
    ? vocabStats.totalVocabs - vocabStats.correctVocabs
    : 0;

  return (
    <section>
      <Card className="rounded-2xl shadow-none mb-2">
        <div className="py-7 px-1 md:px-4">
          <h4 className="text-lg">Tiến độ của bạn</h4>
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 md:gap-3">
            <div className="w-36 md:w-44 h-16 px-2 md:px-4 py-2 flex space-x-4 border-b-4 border border-gray-300 rounded-xl">
              <img
                src={LessonCompletedImg}
                className="w-6 h-6 object-contain"
              />
              <div className="flex flex-col">
                <h5 className="text-xl font-semibold">
                  {progress?.completedLessons}
                </h5>
                <p className="text-sm">Bài đã học</p>
              </div>
            </div>
            <div className="w-36 md:w-44 h-16 px-2 md:px-4 py-2 flex space-x-4 border-b-4 border border-gray-300 rounded-xl">
              <img src={LessonImg} className="w-6 h-6 object-contain" />
              <div className="flex flex-col">
                <h5 className="text-xl font-semibold">{unfinished}</h5>
                <p className="text-sm">Bài chưa học</p>
              </div>
            </div>
            <div className="w-36 md:w-44 h-16 px-2 md:px-4 py-2 flex space-x-4 border-b-4 border border-gray-300 rounded-xl">
              <img src={VocabCompleteImg} className="w-6 h-6 object-contain" />
              <div className="flex flex-col">
                <h5 className="text-xl font-semibold">
                  {vocabStats.correctVocabs}
                </h5>
                <p className="text-sm">Từ đã thuộc</p>
              </div>
            </div>
            <div className="w-36 md:w-44 h-16 px-2 md:px-4 py-2 flex space-x-4 border-b-4 border border-gray-300 rounded-xl">
              <img src={VocabImg} className="w-6 h-6 object-contain" />
              <div className="flex flex-col">
                <h5 className="text-xl font-semibold">{incorrectVocabs}</h5>
                <p className="text-sm">Từ chưa thuộc</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ProgressItem;

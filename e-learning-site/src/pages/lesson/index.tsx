import { useAppDispatch } from "@/hooks/use-app-dispatch";
import Banner from "./sections/Banner";
import InfoLesson from "./sections/Info";
import LessonList from "./sections/LessonList";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectOneCourse } from "@/redux/apps/course/CourseSelectors";
import { useEffect } from "react";
import { fetchCourseDataById } from "@/redux/apps/course/CourseSlice";

const LessonPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const courseId = parseInt(id ?? "1", 10);
  const course = useAppSelector(selectOneCourse);

  useEffect(() => {
    if (!isNaN(courseId)) {
      dispatch(fetchCourseDataById(courseId));
    }
  }, [dispatch, courseId]);

  return (
    <section>
      {course && <Banner course={course} />}
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        <div className="md:col-span-2 px-12">
          <LessonList />
        </div>
        {course && (
          <div className="md:col-span-1">
            <InfoLesson course={course}/>
          </div>
        )}
      </div>
    </section>
  );
};

export default LessonPage;

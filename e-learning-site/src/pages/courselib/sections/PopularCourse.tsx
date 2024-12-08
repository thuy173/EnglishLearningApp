import { useAppDispatch } from "@/hooks/use-app-dispatch";
import StandingCard from "@/components/standing-card";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectCourseMostEnroll } from "@/redux/apps/course/CourseSelectors";
import { useEffect } from "react";
import { fetchMostEnrolledData } from "@/redux/apps/course/CourseSlice";
import { useNavigate } from "react-router-dom";
import { enroll } from "@/redux/apps/progress/ProgressSlice";

const PopularCourse = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const courseMostEnrolled = useAppSelector(selectCourseMostEnroll);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMostEnrolledData());
  }, [dispatch]);

  const handleDetail = (courseId: number) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(enroll({ courseId }));
      navigate(`/lesson/${courseId}`);
    }
  };

  return (
    <section>
      <div className="container md:px-36 mb-20">
        <h1 className="font-bold text-xl text-start mt-10">
          Bắt đầu chinh phục tiếng Anh với các khóa học nổi bật
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-center items-center mt-5">
          {courseMostEnrolled.map((data, index) => (
            <StandingCard
              key={index}
              title={data.name}
              imageUrl={data.thumbnail}
              buttonText="Tham gia ngay"
              onClick={() => handleDetail(data.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourse;

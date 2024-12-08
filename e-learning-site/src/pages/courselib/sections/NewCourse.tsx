import HorizontalCard from "@/components/horizontal-card";
import communicativeImage from "../../../assets/store-communicative.svg";
import workImage from "../../../assets/store-work.svg";
import businessImage from "../../../assets/store-business.svg";
import toeicImage from "../../../assets/store-toeic.svg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectCourseLatest } from "@/redux/apps/course/CourseSelectors";
import { useEffect } from "react";
import { fetchLatestData } from "@/redux/apps/course/CourseSlice";
import { enroll } from "@/redux/apps/progress/ProgressSlice";

const NewCourse = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const courseLatest = useAppSelector(selectCourseLatest);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchLatestData());
  }, [dispatch]);

  const handleDetail = (courseId: number) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(enroll({ courseId }));
      navigate(`/lesson/${courseId}`);
    }
  };

  const defaultCardData = [
    {
      buttonLabel: "Bắt Đầu Ngay",
      imageUrl: communicativeImage,
    },
    {
      buttonLabel: "Tham Gia Ngay",
      imageUrl: workImage,
    },
    {
      buttonLabel: "Khám Phá Ngay",
      imageUrl: businessImage,
    },
    {
      buttonLabel: "Học Ngay",
      imageUrl: toeicImage,
    },
  ];

  const mapApiDataToCards = () => {
    if (!courseLatest) return [];

    return courseLatest.map((course, index) => ({
      id: course.id,
      title: course.name,
      buttonLabel: defaultCardData[index % defaultCardData.length].buttonLabel,
      imageUrl: defaultCardData[index % defaultCardData.length].imageUrl,
      thumbnail: course.thumbnail,
    }));
  };

  const mappedCardData = mapApiDataToCards();

  return (
    <section>
      <div className="container md:px-36 mb-20">
        <h1 className="font-bold text-xl text-start mt-10">
          Khóa học mới, đừng bỏ lỡ
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center items-center mt-5">
          {mappedCardData.map((data) => (
            <HorizontalCard
              key={data.id}
              title={data.title}
              buttonLabel={data.buttonLabel}
              imageUrl={data.imageUrl}
              onClick={() => handleDetail(data.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewCourse;

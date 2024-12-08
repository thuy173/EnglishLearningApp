import LevelCard from "@/components/level-card";
import random1Image from "../../../assets/random-course1.png";
import random2Image from "../../../assets/random-course2.png";
import random3Image from "../../../assets/random-course3.png";
import random4Image from "../../../assets/random-course4.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectCourseRandom } from "@/redux/apps/course/CourseSelectors";
import { useEffect } from "react";
import { fetchRandomData } from "@/redux/apps/course/CourseSlice";
import { useNavigate } from "react-router-dom";
import { enroll } from "@/redux/apps/progress/ProgressSlice";

const Level = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const courseRandom = useAppSelector(selectCourseRandom);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchRandomData());
  }, [dispatch]);

  const defaultCardData = [
    {
      buttonText: "Bắt Đầu Ngay",
      imageUrl: random1Image,
    },
    {
      buttonText: "Tham Gia Ngay",
      imageUrl: random3Image,
    },
    {
      buttonText: "Bắt Đầu Luyện Ngay",
      imageUrl: random2Image,
    },
    {
      buttonText: "Tham Gia Ngay",
      imageUrl: random4Image,
    },
  ];

  const mapApiDataToCards = () => {
    if (!courseRandom) return [];

    return courseRandom.map((course, index) => ({
      id: course.id,
      title: course.name,
      thumbnail: course.thumbnail,
      description: course.description,
      imageUrl: defaultCardData[index % defaultCardData.length].imageUrl,
      buttonLabel: defaultCardData[index % defaultCardData.length].buttonText,
    }));
  };

  const mappedCardData = mapApiDataToCards();

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
      <h1 className="font-bold text-2xl text-center mt-20">
        Bắt đầu chinh phục tiếng Anh
      </h1>
      <div className="container mt-10 md:px-28">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full container"
        >
          <CarouselContent className="flex gap-0 pt-28">
            {mappedCardData.map((data, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <LevelCard
                  title={data.title}
                  description={data.description}
                  buttonText={data.buttonLabel}
                  imageUrl={data.imageUrl}
                  onClick={() => handleDetail(data.id)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-10" />
          <CarouselNext className="mr-10" />
        </Carousel>
      </div>
    </section>
  );
};

export default Level;

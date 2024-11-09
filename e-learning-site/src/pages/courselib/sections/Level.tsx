import LevelCard from "@/components/level-card";
import levelImage from "../../../assets/level.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Level = () => {
  const cardDataArray = [
    {
      title: "Học Theo Cấp Độ",
      description:
        "Giúp bạn toàn diện 4 kỹ năng Anh ngữ theo lộ trình 7 cấp độ CEFR từ A0 đến C2",
      buttonText: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
    {
      title: "Khóa Học Từ Vựng",
      description:
        "Tập trung vào việc phát triển vốn từ vựng tiếng Anh, từ cơ bản đến nâng cao.",
      buttonText: "Tham Gia Ngay",
      imageUrl: levelImage,
    },
    {
      title: "Luyện Kỹ Năng Nghe",
      description:
        "Phát triển kỹ năng nghe hiểu tiếng Anh qua các bài tập và bài nghe thực tế.",
      buttonText: "Bắt Đầu Luyện Ngay",
      imageUrl: levelImage,
    },
    {
      title: "Luyện Kỹ Năng Nghe",
      description:
        "Phát triển kỹ năng nghe hiểu tiếng Anh qua các bài tập và bài nghe thực tế.",
      buttonText: "Bắt Đầu Luyện Ngay",
      imageUrl: levelImage,
    },
    {
      title: "Luyện Kỹ Năng Nghe",
      description:
        "Phát triển kỹ năng nghe hiểu tiếng Anh qua các bài tập và bài nghe thực tế.",
      buttonText: "Bắt Đầu Luyện Ngay",
      imageUrl: levelImage,
    },
  ];
  return (
    <section>
      <h1 className="font-bold text-2xl text-center mt-20">
        Bắt đầu chinh phục tiếng Anh cùng VOCA
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
            {cardDataArray.map((data, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <LevelCard
                  title={data.title}
                  description={data.description}
                  buttonText={data.buttonText}
                  imageUrl={data.imageUrl}
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

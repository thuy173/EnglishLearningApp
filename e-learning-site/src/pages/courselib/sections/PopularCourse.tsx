import levelImage from "../../../assets/bgr-auth.jpg";
import StandingCard from "@/components/standing-card";

const PopularCourse = () => {
  const cardDataArray = [
    {
      title: "LET'S GO!",
      buttonText: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonText: "Tham Gia Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonText: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonText: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonText: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonText: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonText: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
  ];
  return (
    <section>
      <div className="container md:px-36 mb-20">
        <h1 className="font-bold text-xl text-start mt-10">
          Bắt đầu chinh phục tiếng Anh cùng VOCA
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-center items-center mt-5">
          {cardDataArray.map((data, index) => (
            <StandingCard
              key={index}
              title={data.title}
              imageUrl={data.imageUrl}
              buttonText={data.buttonText}
              onButtonClick={() => alert("Continue Learning")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourse;

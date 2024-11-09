import HorizontalCard from "@/components/horizontal-card";
import levelImage from "../../../assets/store-communicative.svg";
import { useNavigate } from "react-router-dom";

const NewCourse = () => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate("/lesson");
  };
  const cardDataArray = [
    {
      title: "LET'S GO!",
      buttonLabel: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonLabel: "Tham Gia Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonLabel: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonLabel: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonLabel: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonLabel: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
    {
      title: "English Words For Starter (A0)",
      buttonLabel: "Bắt Đầu Ngay",
      imageUrl: levelImage,
    },
  ];
  return (
    <section>
      <div className="container md:px-36 mb-20">
        <h1 className="font-bold text-xl text-start mt-10">
          Khóa học mới, đừng bỏ lỡ
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center items-center mt-5">
          {cardDataArray.map((data, index) => (
            <HorizontalCard
              key={index}
              title={data.title}
              buttonLabel={data.buttonLabel}
              imageUrl={data.imageUrl}
              onClick={handleDetail}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewCourse;

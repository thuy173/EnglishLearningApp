import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import canvasImg1 from "../../../assets/method.svg";
import canvasImg2 from "../../../assets/method-2.svg";
import canvasImg3 from "../../../assets/method-3.svg";
import canvasImg4 from "../../../assets/method-4.svg";

const items = [
  {
    id: "method-voca",
    title: "LEARNING.VN",
    imageSrc: "https://www.voca.vn/assets/images/home/method-icon-1.png",
    description:
      "Nền tảng học tiếng Anh tổng quát cho mọi đối tượng! Mang đến hơn 500+ khóa học tiếng Anh theo từng kỹ năng, cấp độ,.. giúp bạn học dễ dàng ghi nhớ và học tiếng Anh một cách thú vị, hiệu quả và khoa học hơn.",
    link: {
      href: "https://www.voca.vn/library",
      text: "BẮT ĐẦU MIỄN PHÍ",
    },
    canvasImage: canvasImg1,
  },
  {
    id: "method-superkids",
    title: "LEARNING SuperKids",
    imageSrc: "https://www.voca.vn/assets/images/home/method-icon-2.png",
    description:
      "Dành cho trẻ em! Ứng dụng truyền cảm hứng giúp trẻ học tập một cách tự tin, vui vẻ, hạnh phúc thông qua những lớp học mô phỏng thực tế được thiết kế phù hợp riêng với từng nhóm trẻ, phương pháp học tập tích cực Play & Learn (Học qua chơi), và chương trình học dựa trên Khung tiêu chuẩn giáo dục quốc tế.",
    link: {
      href: "https://apps.apple.com/vn/app/voca-superkids/id6458878050",
      text: "TẢI ỨNG DỤNG SUPERKIDS",
    },
    canvasImage: canvasImg2,
  },
  {
    id: "method-classNamezoom",
    title: "lEARNING classNameZoom",
    imageSrc: "https://www.voca.vn/assets/images/home/method-icon-3.png",
    description:
      "Lớp học tiếng Anh trực tuyến 1 kèm 1! Kết hợp giữa nền tảng học tập E-learning với chuyên môn và kinh nghiệm sư phạm của đội ngũ giáo viên, giúp người học duy trì sự tập trung và có được hiệu quả học tập ngoại ngữ tốt hơn.",
    link: {
      href: "https://className.voca.vn",
      text: "NHẬN 2 BUỔI HỌC THỬ MIỄN PHÍ",
    },
    canvasImage: canvasImg3,
  },
  {
    id: "method-english-test",
    title: "LEARNING English Test",
    imageSrc: "https://www.voca.vn/assets/images/home/method-icon-4.png",
    description:
      "Kiểm tra năng lực tiếng Anh! EPT (English Proﬁciency Test) là bài kiểm tra trình độ tiếng Anh theo chuẩn quốc tế được phát triển nhằm giúp cho mỗi người học có thể xác định và đánh giá chính xác khả năng tiếng Anh của bản thân, định hướng và xây dựng lộ trình học tập hiệu quả.",
    link: {
      href: "https://www.voca.vn/ept",
      text: "LÀM BÀI KIỂM TRA NGAY",
    },
    canvasImage: canvasImg4,
  },
];

const HomeObject = () => {
  return (
    <section>
      <div className="container py-20">
        <div className="space-y-20 flex flex-col items-center justify-center">
          {items.map((item, index) => (
            <div key={item.id} className="flex gap-5">
              {index % 2 === 0 ? (
                <>
                  <div className="w-full sm:w-1/2 space-y-4 flex flex-col justify-center">
                    <div className="item-title flex items-center space-x-2">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-8 h-8"
                      />
                      <span className="font-bold">{item.title}</span>
                    </div>
                    <p className="font-bold">{item.description}</p>
                    <Link to={item.link.href}>
                      <Button className="hover:underline mt-3">
                        {item.link.text}
                      </Button>
                    </Link>
                  </div>
                  <div className="flex justify-center w-full sm:w-1/2">
                    <img src={item.canvasImage} className="object-contain"/>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center w-full sm:w-1/2">
                    <img src={item.canvasImage} className="object-contain"/>
                  </div>
                  <div className="item-text w-full sm:w-1/2 space-y-4 flex flex-col justify-center">
                    <div className="item-title flex items-center space-x-2">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-8 h-8"
                      />
                      <span className="font-bold">{item.title}</span>
                    </div>
                    <p className="font-bold">{item.description}</p>
                    <Link to={item.link.href}>
                      <Button className="hover:underline mt-3">
                        {item.link.text}
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HomeObject;

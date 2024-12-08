import { Card, CardContent } from "@/components/ui/card";
import Learning1Image from "../../../assets/learning-2.svg";
import Learning2Image from "../../../assets/learning-4.svg";
import Learning3Image from "../../../assets/learning-3.svg";
import Learning4Image from "../../../assets/learning-1.svg";
import Learning5Image from "../../../assets/learning-5.svg";
import Learning6Image from "../../../assets/learning-6.svg";

const methodItemData = [
  {
    image: Learning1Image,
    title: "VAK",
    description:
      "Phương pháp kích thích khả năng ghi nhớ của não bộ thông qua 3 giác quan Thị giác, Thính giác, Tương tác",
  },
  {
    image: Learning2Image,
    title: "Personalized-learning",
    description:
      "Phương pháp học tập cá nhân hóa theo đặc thù của mỗi người học",
  },
  {
    image: Learning3Image,
    title: "Flashcards",
    description:
      "Phương pháp ghi nhớ thông tin dựa trên việc phân mảnh và sắp xếp có chủ đích",
  },
  {
    image: Learning4Image,
    title: "Gamification",
    description:
      "Phương pháp học tiếng Anh dựa trên ứng dụng chương trình game hóa với nhiều hoạt động mang tính tương tác cao.",
  },
  {
    image: Learning5Image,
    title: "Forgetting curves",
    description:
      "Phương pháp ôn tập theo đường cong trí nhớ của Hermann Ebbinghaus",
  },
  {
    image: Learning6Image,
    title: "The Mozart Effect",
    description:
      "Phương pháp kích thích khả năng tiếp thu ngôn ngữ thông qua âm nhạc",
  },
];
const MethodItem = () => {
  return (
    <>
      {methodItemData.map((item, index) => (
        <Card
          key={index}
          className="shadow-none border-2 rounded-2xl px-8 py-3"
        >
          <CardContent>
            <div className="grid grid-cols-7 space-x-5">
              <div className="col-span-2 flex justify-center items-center">
                <img src={item.image} className="w-32 h-32 object-contain" />
              </div>
              <div className="col-span-5 flex flex-col justify-center space-y-2">
                <h2 className="text-xl font-bold text-gray-600">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default MethodItem;

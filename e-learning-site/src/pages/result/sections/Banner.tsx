import { Card } from "@/components/ui/card";
import ExcellentImage from "../../../assets/testing-excellent.png";
import ButtonCustom from "@/components/button-custom";
import { useNavigate } from "react-router-dom";
import { QuizResult } from "@/types/feature/Quiz";
import { GoFileSymlinkFile } from "react-icons/go";
import { PiBookOpenText  } from "react-icons/pi";

interface ResultProps {
  result: QuizResult;
}
const BannerResult: React.FC<ResultProps> = ({ result }) => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="md:container px-6 py-3 md:px-32 md:py-6">
        <Card className="border-2 shadow-none p-2 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 md:space-x-10 mx-5 md:mx-10">
            <div className="md:col-span-1">
              <img src={ExcellentImage} className="object-contain" />
            </div>
            <div className="md:col-span-4 space-y-4 text-center md:text-start flex flex-col justify-center">
              <h2 className="text-xl font-bold text-gray-400">
                Kết quả cũng khá tuyệt vời
              </h2>
              <h2 className="text-2xl font-bold text-[#1cb0f6]">
                {result.score} điểm
              </h2>
              <p className="text-md text-gray-400">
                Hãy cố gắng luyện tập, kiểm tra thường xuyên để không quên từ
                vựng bạn nhé!
              </p>
              <div className="flex space-x-3">
                <ButtonCustom
                  onClick={() => navigate("/library")}
                  title="Học lại"
                  icon={<PiBookOpenText  />}
                />
                <ButtonCustom
                  onClick={() => navigate("/level-choice")}
                  title="Tiếp tục kiểm tra"
                  icon={<GoFileSymlinkFile />
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BannerResult;

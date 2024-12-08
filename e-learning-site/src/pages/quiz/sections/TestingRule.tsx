import RuleImage from "../../../assets/testing-rule.svg";
import TargetImage from "../../../assets/testing-rule-1.svg";
import FailImage from "../../../assets/testing-rule-2.svg";
import OpenImage from "../../../assets/testing-rule-3.svg";

interface RuleProps {
  onStart: () => void;
  onCancel: () => void;
}
const TestingRule: React.FC<RuleProps> = ({ onStart, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <section className="relative bg-white p-0 md:p-8 h-full w-full flex justify-center items-center">
        <div className="container grid grid-cols-3 gap-3 justify-items-center items-center pb-[10%]">
          <div className="col-span-1">
            <img src={RuleImage} className="w-full" />
          </div>
          <div className="col-span-2">
            <h1
              className="text-5xl text-orange-400"
              style={{ fontWeight: "1000px" }}
            >
              Nội quy phòng thi
            </h1>
            <h3 className="text-lg text-gray-500">
              Dưới đây là một số điểm cần lưu ý
            </h3>

            <div className="flex flex-col space-y-6 pt-8">
              <div className="flex items-center space-x-4">
                <span>
                  <img src={TargetImage} className="w-12 h-12" />
                </span>
                <p className="text-gray-400 text-lg">
                  Bạn cần đạt kết quả kiểm tra tối thiểu 80% để có thể qua bài
                  học mới.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="w-[65px]">
                  <img src={FailImage} className="w-full object-contain" />
                </span>
                <p className="text-gray-400 text-lg">
                  Trong lúc làm bài kiểm tra, nếu bạn thoát ra khỏi phòng thi
                  khi chưa hoàn thành những câu còn lại sẽ được tính là SAI.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span>
                  <img src={OpenImage} className="w-12 h-12" />
                </span>
                <p className="text-gray-400 text-lg">
                  Bài mới sẽ được mở ngay sau khi bạn đạt kết quả kiểm tra tối
                  thiểu 80%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 bottom-0 w-full bg-white">
          <div className="border-t border-gray-300 flex justify-between py-4 px-10 md:py-10 md:px-72">
            <button
              onClick={onCancel}
              className="px-4 py-2 xl:w-1/5 rounded-xl border border-b-4 text-[#1cb0f6] font-semibold"
            >
              Quay lại
            </button>
            <button
              onClick={onStart}
              className="px-4 py-2 xl:w-1/5 bg-[#1cb0f6] rounded-xl text-white font-semibold border-b-4 border-b-[#1899d6]"
            >
              Sẵn sàng
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestingRule;

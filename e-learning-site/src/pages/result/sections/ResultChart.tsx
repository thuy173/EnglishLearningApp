import { Card } from "@/components/ui/card";
import CardImage from "../../../assets/course-progress-learned-1.svg";
import { ClockIcon } from "@radix-ui/react-icons";
import { QuizResult } from "@/types/feature/Quiz";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

interface CardProps {
  title: string;
  cardImage?: string;
  icon?: React.ElementType;
  value: number;
  unit?: string;
}
const CardContent: React.FC<CardProps> = ({
  title,
  cardImage,
  icon: Icon,
  value,
  unit,
}) => (
  <div className="grid grid-cols-6 rounded-lg bg-white p-5">
    <div className="col-span-1">
      {cardImage ? (
        <img src={cardImage} className="w-10 h-10" />
      ) : (
        Icon && <Icon className="w-8 h-8 font-bold text-purple-400" />
      )}
    </div>
    <div className="col-span-3">
      <h3 className="font-bold text-xl">{title}</h3>
    </div>
    <div className="col-span-2 flex justify-end space-x-1">
      <p className="font-bold text-2xl">{value}</p>
      <p className="font-bold text-2xl">{unit}</p>
    </div>
  </div>
);

interface ResultProps {
  result: QuizResult;
}

const ResultChart: React.FC<ResultProps> = ({ result }) => {
  const options = {
    cutout: "50%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const data = {
    labels: ["Đã học", "Chưa học"],
    datasets: [
      {
        data: [result.statistics.accuracy, 100 - result.statistics.accuracy],
        backgroundColor: ["#58cc02", "#e4e4e7"],
        borderWidth: 0,
      },
    ],
  };
  return (
    <section>
      <div className="md:container px-6 md:px-32 py-6">
        <Card className="border-2 shadow-none p-2 md:p-6 bg-[#f8fafb]">
          <h3 className="text-lg font-bold text-gray-400">Kết quả kiểm tra</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 m-4">
            <div className="relative ml-7 md:ml-32 w-56 h-56">
              <div>
                <Doughnut data={data} options={options} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-bold text-5xl">
                  {result.statistics.accuracy}%
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-5">
              <CardContent
                cardImage={CardImage}
                title="Đáp án đúng"
                value={result.statistics.correctAnswers}
              />
              <CardContent
                icon={ClockIcon}
                title="Thời gian"
                value={result.totalTimeSpent}
                unit="giây"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
export default ResultChart;

import { Card } from "@/components/ui/card";
import { QuizResult } from "@/types/feature/Quiz";

interface ResultProps {
  result: QuizResult;
}
const ResultContent: React.FC<ResultProps> = ({ result }) => {
  return (
    <section>
      <div className="md:container px-6 md:px-32 md:py-10">
        <h1 className="text-3xl font-bold mb-3">Kết quả chi tiết</h1>
        {result.questionResults.map((question, index) => (
          <Card key={index} className="border-2 shadow-none p-2 md:p-6 my-2">
            <div className="grid grid-cols-1 space-y-2">
              <div className="space-y-5">
                <div className="flex flex-col md:flex-row space-x-1 md:items-center">
                  <p className="text-xl font-bold">{`Câu ${index + 1}:`}</p>
                  <p className="text-md text-gray-500">
                    ({question.earnedPoints}/{question.points})
                  </p>
                  <h2 className="text-lg">{question.prompt}</h2>
                </div>
                <div>
                  <p className="text-center italic text-xl">
                    {question.content}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 justify-items-center gap-2">
                {question.options.map((item, index) => {
                  const isSelect = question.selectedOptions.includes(
                    item.content
                  );
                  const isCorrect = question.correctAnswers.includes(
                    item.content
                  );
                  return (
                    <div
                      key={index}
                      className={`px-4 py-2 rounded-full ${
                        isSelect && !isCorrect
                          ? "bg-red-100 text-red-800 font-semibold"
                          : isCorrect
                          ? "bg-green-100 text-green-800 font-semibold"
                          : "bg-gray-100"
                      }`}
                    >
                      {item.content}
                    </div>
                  );
                })}
              </div>
            </div>
            {question.explanation && (
              <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-md border-l-4 border-blue-500">
                <h3 className="font-semibold">Giải thích:</h3>
                <p>{question.explanation}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};
export default ResultContent;

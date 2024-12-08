import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectTestingDetail } from "@/redux/apps/quiz/QuizSelectors";
import {
  fetchTestingDataById,
  submitTesting,
} from "@/redux/apps/quiz/QuizSlice";
import { Answer, OptionDto } from "@/types/feature/Quiz";
import { ClockIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmExit from "./ConfirmExit";
import { IoClose } from "react-icons/io5";

const QuestionItem = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const quizDetail = useAppSelector(selectTestingDetail);
  const { id } = useParams();

  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [questionTime, setQuestionTime] = useState(0);

  const [answers, setAnswers] = useState<Answer[]>([]);
  const questionStartTimeRef = useRef<number>(Date.now());
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchTestingDataById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (quizDetail?.questions?.length && quizDetail.timeLimit) {
      const timePerQuestion = Math.floor(
        quizDetail.timeLimit / quizDetail.questions.length
      );
      setQuestionTime(timePerQuestion);
      setTimeRemaining(timePerQuestion);

      questionStartTimeRef.current = Date.now();
    }
  }, [quizDetail]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          handleOptionSelect(null);
          return questionTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const currentQuestion = quizDetail?.questions[currentQuestionIndex];

  const handleOptionSelect = (selectedOption: OptionDto | null) => {
    if (!quizDetail) return;

    const currentQuestion = quizDetail.questions[currentQuestionIndex];
    const timeSpent = Math.floor(
      (Date.now() - questionStartTimeRef.current) / 1000
    );

    const newAnswer = {
      questionId: currentQuestion.id,
      selectedOptions: selectedOption ? [selectedOption.content] : [],
      timeSpent,
    };

    setAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = newAnswer;
      return updatedAnswers;
    });

    if (currentQuestionIndex === quizDetail.questions.length - 1) {
      handleSubmitQuiz([...answers, newAnswer]);
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    questionStartTimeRef.current = Date.now();
    setProgress(
      ((currentQuestionIndex + 1) / quizDetail.questions.length) * 100
    );
    setTimeRemaining(questionTime);
  };

  const handleSubmitQuiz = async (finalAnswers: typeof answers) => {
    if (!id) return;

    const payload = {
      quizId: id,
      answers: finalAnswers,
    };

    try {
      const attemptId = await dispatch(submitTesting(payload)).unwrap();
      navigate(`/attempt/${attemptId}/result`);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  };

  const handleOpenConfirm = () => setIsConfirmOpen(true);
  const handleCloseConfirm = () => setIsConfirmOpen(false);
  const handleExit = () => {
    handleCloseConfirm();
    navigate(-1);
  };

  return (
    <section>
      <div className="container px-2 md:px-40 mb-16 mt-6">
        <div className="my-2">
          <h2 className="text-3xl font-bold">{quizDetail?.title}</h2>
        </div>
        <div className="flex items-center space-x-2 w-full p-2 mb-5">
          <button onClick={handleOpenConfirm}>
            <IoClose className="text-gray-400 hover:text-gray-500" size={24}/>
          </button>

          <div className="relative flex-grow h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>

          <div className="flex items-center space-x-1 text-purple-400">
            <ClockIcon className="w-6 h-6" />
            <span className="text-xl font-bold font-mono">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {currentQuestion && (
          <div key={currentQuestion.id}>
            <div className="grid grid-cols-1">
              <h2 className="text-center text-3xl font-bold">
                {`Câu hỏi ${currentQuestionIndex + 1}: ${
                  currentQuestion.prompt
                }`}
              </h2>
              <Card className="rounded-2xl shadow-none p-8 md:p-20 my-5 border-2 border-b-8">
                <CardContent>
                  <div className="flex justify-center items-center">
                    <p className="text-xl font-semibold">
                      {currentQuestion.content}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
              {currentQuestion.options.map((option, i) => (
                <Card
                  key={i}
                  onClick={() => handleOptionSelect(option)}
                  className="rounded-2xl shadow-none p-4 border-b-4 cursor-pointer"
                >
                  <CardContent className="flex justify-center items-center">
                    <p className="text-xl">{option.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <ConfirmExit
        isOpen={isConfirmOpen}
        onOpenChange={handleCloseConfirm}
        onExit={handleExit}
      />
    </section>
  );
};
export default QuestionItem;

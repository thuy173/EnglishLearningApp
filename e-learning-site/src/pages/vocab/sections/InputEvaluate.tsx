import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectEvaluationResult } from "@/redux/apps/vocab/VocabSelectors";
import { evaluateUserVocab } from "@/redux/apps/vocab/VocabSlice";
import { useEffect, useRef, useState } from "react";
import Error from "../../../assets/error.mp3";
import { VocabProgressDto } from "@/types/feature/Progress";
import { lessonEnroll } from "@/redux/apps/progress/ProgressSlice";

interface InputEvaluateComponentProps {
  vocabId: number;
  lessonId: number;
  courseId: number;
  isLastVocab: boolean;
  onCorrectAnswer: () => void;
}
const InputEvaluateComponent: React.FC<InputEvaluateComponentProps> = ({
  vocabId,
  lessonId,
  courseId,
  isLastVocab,
  onCorrectAnswer,
}) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector(selectEvaluationResult);
  const [value, setValue] = useState("");
  const [vocabProgress, setVocabProgress] = useState<VocabProgressDto[]>([]);
  const [startDate] = useState(new Date().toISOString());
  const [score, setScore] = useState(0);

  const errorSoundRef = useRef<HTMLAudioElement | null>(null);

  const [lastCorrectTime, setLastCorrectTime] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        evaluateUserVocab({ vocabId, word: value })
      ).unwrap();

      const isCorrect = result === "Correct!";
      if (isCorrect) {
        setScore((prev) => prev + 1);
        onCorrectAnswer();
        setValue("");
        setLastCorrectTime(Date.now());

        const newVocabProgress: VocabProgressDto = { vocabId, isCorrect };
        setVocabProgress((prev) => [...prev, newVocabProgress]);

        if (isLastVocab) {
          await dispatch(
            lessonEnroll({
              request: {
                courseId,
                lessonId,
                startDate,
                completedDate: new Date().toISOString(),
                score: score + 1,
                timeSpent: Math.floor(
                  (new Date().getTime() - new Date(startDate).getTime()) / 1000
                ),
                vocabProgress: [...vocabProgress, newVocabProgress],
              },
            })
          ).unwrap();
        }
      } else if (result === "Incorrect, try again.") {
        errorSoundRef.current?.play();
      }
    } catch (error) {
      console.error("Error evaluating vocab: ", error);
    }
  };

  useEffect(() => {
    if (lastCorrectTime && !isLastVocab) {
      timeoutRef.current = setTimeout(async () => {
        try {
          await dispatch(
            lessonEnroll({
              request: {
                courseId,
                lessonId,
                startDate,
                score,
                timeSpent: Math.floor(
                  (new Date().getTime() - new Date(startDate).getTime()) / 1000
                ),
                vocabProgress,
              },
            })
          ).unwrap();
        } catch (error) {
          console.error("Error in delayed lessonEnroll: ", error);
        }
      }, 60000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    lastCorrectTime,
    isLastVocab,
    score,
    vocabProgress,
    startDate,
    courseId,
    lessonId,
    dispatch,
  ]);

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-4xl">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Gõ từ vựng đoán được vào đây"
        className={`flex-1 md:px-4 py-3 rounded-xl border ${
          result === "Correct!"
            ? "border-green-500 border-2"
            : result === "Incorrect, try again."
            ? "border-red-500 border-2"
            : "border-gray-200 border-2"
        } focus:outline-none focus:border-gray-300 text-gray-600 bg-white`}
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className={`px-6 py-3 rounded-xl font-medium ${
          value.trim()
            ? "bg-[#58cc02] text-white border-b-4 border-b-[#58a700]"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        Kiểm tra
      </button>
      <audio ref={errorSoundRef} src={Error} />
    </form>
  );
};

export default InputEvaluateComponent;

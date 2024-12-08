import { Card, CardContent } from "@/components/ui/card";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { HiSpeakerWave } from "react-icons/hi2";
import { LuFlipVertical2 } from "react-icons/lu";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectVocabularies } from "@/redux/apps/vocab/VocabSelectors";
import { useLocation, useParams } from "react-router-dom";
import { fetchVocabDataByLessonId } from "@/redux/apps/vocab/VocabSlice";
import { VocabDetailDto } from "@/types/feature/Vocab";
import InputEvaluateComponent from "./InputEvaluate";
import { FcNext, FcPrevious } from "react-icons/fc";
import NoDataPage from "@/pages/shared/NoDataPage";

const WordCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const vocab = useAppSelector(selectVocabularies);
  const { id } = useParams();
  const lessonId = parseInt(id ?? "1", 10);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryCourseId = parseInt(searchParams.get('courseId') ?? "1", 10);

  const { speak } = useSpeechSynthesis();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [rotateIndex, setRotateIndex] = useState(0);
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [filteredVocab, setFilteredVocab] = useState<VocabDetailDto[]>([]);

  useEffect(() => {
    if (!isNaN(lessonId)) {
      dispatch(fetchVocabDataByLessonId(lessonId));
    }
  }, [dispatch, lessonId]);

  useEffect(() => {
    const choiceVocab = JSON.parse(
      localStorage.getItem("choiceVocab") || "[]"
    ) as number[];
    const matchingVocab = vocab.filter((item) => choiceVocab.includes(item.id));
    setFilteredVocab(matchingVocab);
  }, [vocab]);

  const handleSpeak = () => {
    if (headingRef.current) {
      speak({ text: headingRef.current.textContent });
    }
  };

  const handleNextFace = () => {
    setRotateIndex((prev) => (prev + 1) % 4);
  };

  const getCurrentFace = (rotateIndex: number) => {
    const faces = ["front", "right", "back", "left"];
    return faces[rotateIndex % 4];
  };

  const handleNextVocab = () => {
    setRotateIndex(0);
    setCurrentVocabIndex((prev) => (prev + 1) % filteredVocab.length);
  };

  const handlePreviousVocab = () => {
    setRotateIndex(0);
    setCurrentVocabIndex((prev) =>
      prev === 0 ? filteredVocab.length - 1 : prev - 1
    );
  };

  const handleCorrectAnswer = () => {
    handleSpeak();
  };

  if (!filteredVocab || filteredVocab.length === 0) {
    return <NoDataPage />;
  }

  const currentVocab = filteredVocab[currentVocabIndex];

  const isLastVocab = currentVocabIndex === filteredVocab.length - 1;

  const cardFaces = [
    {
      key: "front",
      title: currentVocab.word,
      content: (
        <>
          <div className="flex flex-col space-y-3">
            <h2
              ref={headingRef}
              className="text-3xl font-semibold text-[#1cb0f6] mt-2"
            >
              {currentVocab.meaning}
            </h2>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSpeak}
                className="border-none mt-2 bg-[#1cb0f6] text-white rounded-xl"
              >
                <HiSpeakerWave size={30} />
              </Button>
              <p className="text-xl font-semibold text-gray-500">
                {currentVocab.ipa}
              </p>
            </div>
          </div>
        </>
      ),
      style: styles.front,
    },
    {
      key: "right",
      title: "Ví dụ",
      content: (
        <div className="flex flex-col items-start justify-center">
          <h2
            ref={headingRef}
            className="text-3xl font-semibold text-[#1cb0f6] mt-2"
          >
            {currentVocab.word}
          </h2>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSpeak}
              className="border-none mt-2 bg-[#1cb0f6] text-white rounded-xl"
            >
              <HiSpeakerWave size={30} />
            </Button>
            <p className="text-xl font-semibold text-gray-500">
              {currentVocab.ipa}
            </p>
          </div>
          <div className="py-3 w-full overflow-y-auto max-h-32">
            <h2 className="text-lg font-semibold text-[#1cb0f6]">Ví dụ:</h2>
            <p className="break-words whitespace-pre-wrap">
              {currentVocab.example}
            </p>
          </div>
        </div>
      ),
      style: styles.right,
    },
    {
      key: "back",
      title: "Từ đồng nghĩa",
      content: (
        <div className="flex flex-col items-start justify-center space-y-5">
          <div>
            <h2 className="text-lg font-semibold">Từ đồng nghĩa:</h2>
            <p>{currentVocab.synonym}</p>
          </div>
          <div className="md:flex justify-center items-center space-x-2">
            <h2 className="text-lg font-semibold">Cụm từ: </h2>
            <span>{currentVocab.collocation}</span>
          </div>
        </div>
      ),
      style: styles.back,
    },
    {
      key: "left",
      title: "Định nghĩa",
      content: (
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-lg font-semibold text-[#1cb0f6]">Định nghĩa:</h2>
          <p>{currentVocab.definition}</p>
        </div>
      ),
      style: styles.left,
    },
  ];

  return (
    <section className="pb-20">
      <div className="flex my-24 px-5 md:px-24 lg:px-48 justify-center items-center space-x-4">
        <div style={styles.perspective}>
          <div
            style={{
              ...styles.cube,
              transform: `rotateX(${rotateIndex * 90}deg)`,
            }}
          >
            {cardFaces.map((face) => (
              <Card
                key={face.key}
                style={{ ...styles.face, ...face.style }}
                className="shadow-none border-2 border-gray-200 px-2 py-5"
              >
                <CardContent>
                  <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-1">
                      <img
                        src={currentVocab.image || ""}
                        alt={currentVocab.word}
                        className="w-full h-52 object-cover rounded-lg"
                      />
                    </div>
                    <div className="col-span-2">{face.content}</div>
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextFace}
                    className="absolute right-4 bottom-2"
                  >
                    <LuFlipVertical2 size={24} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {getCurrentFace(rotateIndex) !== "left" && (
        <div className="flex justify-center items-center py-5">
          <div className="md:w-1/2">
            <InputEvaluateComponent
              vocabId={currentVocab.id}
              lessonId={lessonId}
              courseId={queryCourseId}
              onCorrectAnswer={handleCorrectAnswer}
              isLastVocab={isLastVocab}
            />
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-center items-center gap-4 md:gap-20 py-5">
          <Button
            onClick={handlePreviousVocab}
            className="h-10 w-10 bg-transparent hover:bg-transparent shadow-none text-gray-400 border border-gray-300 rounded-full border-b-4"
          >
            <FcPrevious />
          </Button>
          <Button
            className="h-10 w-10 bg-transparent hover:bg-transparent shadow-none text-gray-400 border border-gray-300 rounded-full border-b-4"
            onClick={handleNextVocab}
          >
            <FcNext />
          </Button>
        </div>
      </div>
    </section>
  );
};

const styles = {
  perspective: {
    perspective: "900px",
    width: "90%",
    height: "260px",
    position: "relative" as const,
  },
  cube: {
    width: "100%",
    height: "100%",
    position: "relative" as const,
    transformStyle: "preserve-3d" as const,
    transition: "transform 1s",
  },
  face: {
    position: "absolute" as const,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid gray",
    backfaceVisibility: "hidden" as const,
  },
  front: {
    transform: "rotateX(0deg) translateZ(130px)",
  },
  right: {
    transform: "rotateX(90deg) translateZ(130px)",
  },
  back: {
    transform: "rotateX(180deg) translateZ(130px)",
  },
  left: {
    transform: "rotateX(-90deg) translateZ(130px)",
  },
};

export default WordCard;

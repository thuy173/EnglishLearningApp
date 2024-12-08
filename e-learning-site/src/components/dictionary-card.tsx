import { useState } from "react";
import { LuFlipHorizontal2 } from "react-icons/lu";

interface DictionaryProps {
  word: string;
  image: string;
  ipa: string;
  meaning: string;
  example: string;
}
const DictionaryCard: React.FC<DictionaryProps> = ({
  word,
  image,
  ipa,
  meaning,
  example,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative h-60 w-full">
      <div
        onClick={handleFlip}
        className="w-full h-full border-2 border-green-700 bg-green-200 rounded-xl cursor-pointer transition-transform duration-500 transform-gpu hover:shadow-xl absolute"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Mặt trước */}
        <div
          className="absolute w-full h-full p-5"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="w-full">
            <img
              src={image}
              alt={word}
              className="object-cover w-full h-28 rounded-lg"
            />
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-semibold line-clamp-2">{word}</h3>
            <p className="text-sm font-semibold line-clamp-2">{ipa}</p>
          </div>
          <button className="absolute bottom-2 right-2 bg-green-100 rounded-xl hover:bg-green-300 p-2 transition-colors">
            <LuFlipHorizontal2 className="w-5 h-5" />
          </button>
        </div>

        {/* Mặt sau */}
        <div
          className="absolute w-full h-full p-5 bg-green-200 rounded-xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flex flex-col h-full justify-center items-center">
            <h3 className="text-lg font-semibold mb-2">{meaning}</h3>
            <p className="text-center">{example}</p>
          </div>
          <button className="absolute bottom-2 right-2 bg-green-100 rounded-xl hover:bg-green-300 p-2 transition-colors">
            <LuFlipHorizontal2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DictionaryCard;

import React from "react";

interface VocabCardProps {
  word: string;
  image: string;
  partOfSpeech: string;
  isSelected: boolean;
  onSelect: () => void;
}

const VocabCard: React.FC<VocabCardProps> = ({
  word,
  image,
  partOfSpeech,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`grid grid-cols-3 items-center space-x-4 p-4 border-2 border-b-4 rounded-xl cursor-pointer ${
        isSelected
          ? "bg-[#ddf4ff] border-[#84d8ff]"
          : "bg-white border-gray-300"
      }`}
    >
      <img
        src={image}
        alt={word}
        className="w-16 h-16 rounded-md object-cover border"
      />
      <span
        className={`text-lg font-semibold ${
          isSelected ? "text-[#1cb0f6]" : "text-gray-500"
        } overflow-hidden text-ellipsis whitespace-normal leading-tight`}
      >
        {word} ({partOfSpeech})
      </span>
      <div className="flex justify-end items-end">
        <label className="relative w-5 h-5">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="appearance-none w-5 h-5 rounded border border-gray-300 focus:outline-none cursor-pointer"
          />
          <span
            className={`absolute inset-0 flex items-center justify-center rounded ${
              isSelected
                ? "bg-[#ddf4ff] border-2 border-[#1cb0f6]"
                : "bg-white border border-gray-400"
            }`}
          >
            {isSelected && (
              <svg
                className="w-10 h-10 text-[#1cb0f6]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
        </label>
      </div>
    </div>
  );
};

export default VocabCard;

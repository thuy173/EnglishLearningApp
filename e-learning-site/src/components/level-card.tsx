import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const colors = [
  "#ce82ff",
  "#58cc02",
  "#ff9600",
  "#1cb0f6",
  "#ffaade",
  "#FF5733",
];
let colorIndex = 0;

const getColor = () => {
  const color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
  return color;
};

interface LevelCardProps {
  title: string;
  description?: string;
  buttonText: string;
  imageUrl: string;
  onClick?: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({
  title,
  description,
  buttonText,
  imageUrl,
  onClick,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>("");

  useEffect(() => {
    setBackgroundColor(getColor());
  }, []);

  return (
    <div
      className="rounded-3xl py-4 px-8 max-w-sm mx-auto relative shadow-lg flex flex-col justify-between h-[260px] lg:h-[380px]"
      style={{ backgroundColor }}
    >
      <div className="flex justify-center -mt-32">
        <img src={imageUrl} alt={title} className="object-cover" />
      </div>
      <div className="text-center mt-1">
        <h2 className="text-white text-2xl font-bold mb-2 line-clamp-2">{title}</h2>
        <p className="text-white mb-4 line-clamp-2">{description}</p>
        <Button
          className="bg-white hover:bg-white rounded-lg w-full font-semibold"
          style={{ color: backgroundColor }}
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default LevelCard;

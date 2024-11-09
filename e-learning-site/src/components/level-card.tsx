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
  description: string;
  buttonText: string;
  imageUrl: string;
}

const LevelCard: React.FC<LevelCardProps> = ({
  title,
  description,
  buttonText,
  imageUrl,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>("");

  useEffect(() => {
    setBackgroundColor(getColor());
  }, []);

  return (
    <div
      className="rounded-3xl py-4 px-8 max-w-sm mx-auto relative shadow-lg"
      style={{ backgroundColor }}
    >
      <div className="flex justify-center -mt-36">
        <img src={imageUrl} alt={title} className="object-cover" />
      </div>
      <div className="text-center mt-1">
        <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
        <p className="text-white mb-4">{description}</p>
        <Button
          className="bg-white hover:bg-white rounded-lg w-full font-semibold"
          style={{ color: backgroundColor }}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default LevelCard;

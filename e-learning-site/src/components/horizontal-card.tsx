import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface HCardProps {
  title: string;
  buttonLabel: string;
  imageUrl: string;
  onClick?: () => void;
}

const colors = [
  "#0083a4",
  "#cd7900",
  "#009256",
  "#ea2b2b",
  "#49ced1",
  "#2b70c9",
];
let colorIndex = 0;

const getColor = () => {
  const color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
  return color;
};

const HorizontalCard: React.FC<HCardProps> = ({
  title,
  buttonLabel,
  imageUrl,
  onClick,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>("");

  useEffect(() => {
    setBackgroundColor(getColor());
  }, []);
  return (
    <div
      className="pt-8 pl-8 text-white rounded-2xl h-full cursor-pointer"
      style={{ backgroundColor }}
      onClick={onClick}
    >
      <div className="relative bottom-0 right-0 grid grid-cols-7 h-full">
        <div className="col-span-4 flex flex-col justify-between mb-4">
          <h2 className="text-lg font-semibold mb-4 line-clamp-2">{title}</h2>
          <Button
            className="bg-white hover:bg-white rounded-md"
            style={{
              fontSize: "12px",
              height: "22px",
              width: "60%",
              color: backgroundColor,
            }}
          >
            {buttonLabel}
          </Button>
        </div>
        <div className="col-span-3 flex justify-end items-end">
          <img src={imageUrl} alt="Promotion image" />
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;

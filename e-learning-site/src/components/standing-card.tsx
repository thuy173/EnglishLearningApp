import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface CardProps {
  title: string;
  imageUrl: string;
  buttonText: string;
  onClick: () => void;
}

const StandingCard: React.FC<CardProps> = ({
  title,
  imageUrl,
  buttonText,
  onClick,
}) => {
  return (
    <Card className="rounded-2xl overflow-hidden h-full flex flex-col transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
      <CardHeader className="p-0">
        <img src={imageUrl} alt={title} className="w-full h-24 object-cover" />
      </CardHeader>

      <CardContent className="flex-grow p-2">
        <CardTitle className="text-sm font-semibold line-clamp-3">{title}</CardTitle>
      </CardContent>

      <CardFooter className="pt-2 -mb-3">
        <Button
          onClick={onClick}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-md"
          style={{ fontSize: "12px", height: "22px", padding: "0 10px" }}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StandingCard;

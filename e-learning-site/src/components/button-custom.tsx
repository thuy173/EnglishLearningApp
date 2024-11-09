import React, { ButtonHTMLAttributes } from "react";
import { Button } from "./ui/button";

interface ButtonCustomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  className?: string;
  title: string;
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({
  onClick,
  className,
  title,
  ...props
}) => {
  return (
    <div className="relative">
      {/* Invisible element to maintain space */}
      <div className="invisible">
        <Button
          className={`
            bg-white 
            text-center 
            text-[#1CB0F6] 
            uppercase 
            rounded-lg 
            border-b-4
            border-[#84D8FF] 
            text-sm 
            font-semibold 
            py-5             
            ${className || ""}
          `}
        >
          {title}
        </Button>
      </div>
      
      {/* Actual button with absolute positioning */}
      <Button
        onClick={onClick}
        className={`
          absolute
          top-0
          left-0
          bg-white 
          text-center 
          text-[#1CB0F6] 
          hover:bg-white 
          hover:text-[#1CB0F6] 
          uppercase 
          rounded-lg 
          border-b-4
          border-[#84D8FF] 
          text-sm 
          font-semibold 
          py-5         
          transition-all
          duration-100
          active:border-b-0
          active:translate-y-1
          active:shadow-inner
          ${className || ""}
        `}
        {...props}
      >
        {title}
      </Button>
    </div>
  );
};

export default ButtonCustom;
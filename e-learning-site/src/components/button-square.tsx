import { Button } from "./ui/button";

interface ButtonSquareProps {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
}
const ButtonSquare: React.FC<ButtonSquareProps> = ({
  title,
  Icon,
  isActive,
  type,
  onClick,
}) => {
  return (
    <section>
      <Button
        type={type}
        variant="outline"
        onClick={onClick}
        className={`flex flex-col items-center justify-center text-[#48bff8]
             bg-[#ddf4ff] hover:text-white hover:bg-[#1cb0f6] p-4 w-24 h-24 md:w-32 md:h-32 
             ${isActive ? "text-white bg-[#1cb0f6]" : "border-transparent"}`}
      >
        <Icon className="mb-2 text-2xl" />
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </Button>
    </section>
  );
};
export default ButtonSquare;

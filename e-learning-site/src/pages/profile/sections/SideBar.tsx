import { Button } from "@/components/ui/button";
import { ButtonSlideBar } from "@/types/ui/SlideBarProfile";

interface SideBarProps {
  activeButton: string;
  setActiveButton: (button: ButtonSlideBar) => void;
}

const SideBar: React.FC<SideBarProps> = ({ activeButton, setActiveButton }) => {
  return (
    <section>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
        {Object.values(ButtonSlideBar).map((item, index) => (
          <div key={index} className="mb-2">
            <Button
              onClick={() => setActiveButton(item)}
              className={`w-full md:w-5/6 ${
                activeButton === item
                  ? "bg-[#ddf4ff] border-2 border-[#84d8ff] text-[#1cb0f6] hover:bg-[#ddf4ff]"
                  : "bg-transparent text-gray-400 hover:bg-gray-200"
              } shadow-none rounded-xl p-5 text-lg flex justify-start`}
            >
              {item}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SideBar;

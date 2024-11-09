import { Button } from "@/components/ui/button";

interface SideBarProps {
  activeButton: string;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
}
const SideBar: React.FC<SideBarProps> = ({ activeButton, setActiveButton }) => {
  const buttons = ["Cài đặt", "Từ điển", "Lịch sử"];

  return (
    <section>
      <div>
        {buttons.map((item, index) => (
          <div key={index} className="mb-2">
            <Button
              onClick={() => setActiveButton(item)}
              className={`w-2/3 ${
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

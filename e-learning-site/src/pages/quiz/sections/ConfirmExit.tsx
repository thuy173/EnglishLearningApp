import { Sheet, SheetContent } from "@/components/ui/sheet";

interface ConfirmProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onExit: () => void;
}

const ConfirmExit: React.FC<ConfirmProps> = ({
  isOpen,
  onOpenChange,
  onExit,
}) => {
  return (
    <section>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom">
          <div className="container p-10">
            <div className="grid grid-cols-2">
              <div className="space-y-4">
                <div className="text-2xl font-bold">
                  Bạn muốn dừng lại thật sao?
                </div>
                <div className="text-xl text-gray-400">
                  Bạn sẽ mất cả tiến trình học vừa rồi đấy!
                </div>
              </div>
              <div className="flex items-center gap-8">
                <button
                  onClick={onOpenChange}
                  className="border border-b-4 border-gray-300 text-gray-500 text-xl rounded-xl w-full h-2/3"
                >
                  Ở lại
                </button>
                <button
                  onClick={onExit}
                  className="border border-b-4 border-[#1899d6] text-white text-xl bg-[#1cb0f6] rounded-xl w-full h-2/3"
                >
                  Thoát
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};
export default ConfirmExit;

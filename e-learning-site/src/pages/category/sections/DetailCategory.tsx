import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface DetailCategoryProps {
  description?: string;
  isOpen: boolean;
  onOpenChange: () => void;
}
const DetailCategory: React.FC<DetailCategoryProps> = ({
  description,
  isOpen,
  onOpenChange,
}) => {
  return (
    <section>
      <div className="grid grid-cols-2 gap-2">
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
          <SheetContent side="bottom" className="w-full h-full overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Thông Tin Chi Tiết</SheetTitle>
              <SheetDescription />
            </SheetHeader>
            <div className="grid py-4">
              <p className="whitespace-pre-line">{description}</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

export default DetailCategory;

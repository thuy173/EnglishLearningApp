import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface DetailCourseProps {
  description?: string;
  isOpen: boolean;
  onOpenChange: () => void;
}
const DetailCourse: React.FC<DetailCourseProps> = ({
  description,
  isOpen,
  onOpenChange,
}) => {
  return (
    <section>
      <div className="grid grid-cols-2 gap-2">
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
          <SheetContent
            side="left"
            className="overflow-y-auto w-full sm:max-w-full"
          >
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

export default DetailCourse;

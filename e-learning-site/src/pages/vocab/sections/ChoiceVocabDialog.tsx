import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VocabCard from "@/components/vocab-card";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectShortVocab } from "@/redux/apps/vocab/VocabSelectors";
import { fetchShortVocabDataByLessonId } from "@/redux/apps/vocab/VocabSlice";
import { useEffect, useState } from "react";

interface ChoiceVocabDialogProps {
  onClose: (confirmed: boolean) => void;
  open: boolean;
  lessonId: number;
}

const ChoiceVocabDialog: React.FC<ChoiceVocabDialogProps> = ({
  onClose,
  open,
  lessonId,
}) => {
  const dispatch = useAppDispatch();
  const vocab = useAppSelector(selectShortVocab);
  const [selectedVocab, setSelectedVocab] = useState<number[]>([]);

  useEffect(() => {
    const savedVocab = localStorage.getItem("choiceVocab");
    if (savedVocab) {
      setSelectedVocab(JSON.parse(savedVocab));
    }
  }, []);

  useEffect(() => {
    if (!isNaN(lessonId)) {
      dispatch(fetchShortVocabDataByLessonId(lessonId));
    }
  }, [dispatch, lessonId]);

  useEffect(() => {
    setSelectedVocab([]);
  }, [open]);

  useEffect(() => {
    localStorage.setItem("choiceVocab", JSON.stringify(selectedVocab));
  }, [selectedVocab]);

  const handleSelectAll = () => {
    if (selectedVocab.length === vocab.length) {
      setSelectedVocab([]);
    } else {
      setSelectedVocab(vocab.map((item) => item.id));
    }
  };

  const handleConfirm = () => {
    onClose(true);
  };

  return (
    <section>
      <Dialog open={open} onOpenChange={() => onClose(false)}>
        <DialogContent className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex justify-center items-center">
            <div className="flex items-center space-x-10">
              <DialogTitle className="text-center">
                Chọn từ muốn học
              </DialogTitle>
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" onClick={handleSelectAll} />
                <Label htmlFor="airplane-mode">Chọn tất cả</Label>
              </div>
            </div>
            <DialogDescription />
          </DialogHeader>
          <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-3 my-2">
              {vocab.map((item) => (
                <VocabCard
                  key={item.id}
                  word={item.word}
                  image={item.image}
                  partOfSpeech="n"
                  isSelected={selectedVocab.includes(item.id)}
                  onSelect={() => {
                    if (selectedVocab.includes(item.id)) {
                      setSelectedVocab(
                        selectedVocab.filter((id) => id !== item.id)
                      );
                    } else {
                      setSelectedVocab([...selectedVocab, item.id]);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <DialogFooter>
            {selectedVocab.length !== 0 && (
              <div className="w-full flex justify-center">
                <Button
                  onClick={handleConfirm}
                  type="button"
                  className="w-1/2 text-center bg-[#1cb0f6] hover:bg-[#1cb0f6] hover:text-lg"
                >
                  Bắt đầu
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ChoiceVocabDialog;

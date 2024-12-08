import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectLessons } from "@/redux/apps/lesson/LessonSelectors";
import { useEffect, useState } from "react";
import { fetchLessonsData } from "@/redux/apps/lesson/LessonSlice";
import NoDataPage from "@/pages/shared/NoDataPage";
import ChoiceVocabDialog from "@/pages/vocab/sections/ChoiceVocabDialog";

const LessonList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lessons = useAppSelector(selectLessons);
  const { id } = useParams();
  const courseId = parseInt(id ?? "1", 10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<number>(0);

  useEffect(() => {
    if (!isNaN(courseId)) {
      dispatch(
        fetchLessonsData({
          name: "",
          courseId,
          pageNumber: 0,
          pageSize: 100,
          sortField: "id",
          sortDirection: "ASC",
        })
      );
    }
  }, [dispatch, courseId]);

  const handleDetail = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setIsDialogOpen(true);
  };

  const handleCloseChoiceWord = (confirm: boolean) => {
    setIsDialogOpen(false);
    if (confirm && selectedLessonId !== null) {
      navigate(`/vocab/${selectedLessonId}?courseId=${courseId}`);
    }
  };

  return (
    <>
      {lessons.length === 0 ? (
        <NoDataPage />
      ) : (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {lessons.map((item) => (
              <div key={item.id} className="grid grid-cols-1 space-y-3">
                <Card
                  className="rounded-2xl shadow-none border-none p-6 bg-gray-100"
                  onClick={() => handleDetail(item.id)}
                >
                  <CardContent className="flex-grow cursor-pointer">
                    <div className="w-full h-0 pb-[80%] relative">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-container rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="space-y-3">
                  <h2 className="text-center font-semibold text-xl line-clamp-1 cursor-pointer">
                    {item.name}
                  </h2>
                  <div className="flex items-center space-x-3 pl-2">
                    <div className="relative w-full h-5 bg-gray-50 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-5 bg-green-500 rounded-full"
                        style={{
                          width: `${
                            item.vocabCount > 0
                              ? (Number(item.knownVocabCount) /
                                  Number(item.vocabCount)) *
                                100
                              : 0
                          }%`,
                        }}
                      ></div>
                      <div
                        className={`absolute inset-0 flex items-center justify-center ${
                          item.vocabCount > 0 &&
                          item.knownVocabCount === item.vocabCount
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {item.knownVocabCount}/{item.vocabCount}
                      </div>
                    </div>
                    <FaStar
                      className={
                        item.knownVocabCount === item.vocabCount
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }
                      size={30}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {isDialogOpen && (
        <ChoiceVocabDialog
          open={isDialogOpen}
          onClose={handleCloseChoiceWord}
          lessonId={selectedLessonId}
        />
      )}
    </>
  );
};

export default LessonList;

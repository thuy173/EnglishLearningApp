import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { useEffect, useState } from "react";
import NoDataPage from "@/pages/shared/NoDataPage";
import {
  selectAllTesting,
  selectTotalPages,
} from "@/redux/apps/quiz/QuizSelectors";
import { fetchTestingsData, startTesting } from "@/redux/apps/quiz/QuizSlice";
import TestingRule from "./TestingRule";
import { showNotification } from "@/redux/apps/message/MessageSlice";
import CustomPagination from "@/components/pagination-custom";
import { BookOpen, ClipboardList, Clock, ListChecks } from "lucide-react";
import { formatTimeLimit } from "@/utils/format/format-time";
import { debounce } from "lodash";

const PAGE_SIZE = 10;

const QuizList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const testings = useAppSelector(selectAllTesting);
  const totalPages = useAppSelector(selectTotalPages);
  const { id } = useParams();
  const levelId = parseInt(id ?? "1", 10);
  const [searchParams, setSearchParams] = useSearchParams();

  const [showTestingRule, setShowTestingRule] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [searchTitle, setSearchTitle] = useState("");

  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  useEffect(() => {
    const fetchQuiz = () => {
      dispatch(
        fetchTestingsData({
          title: searchTitle.trim(),
          levelId,
          lessonId: 0,
          pageNumber: currentPage - 1,
          pageSize: PAGE_SIZE,
          sortField: "id",
          sortDirection: "ASC",
        })
      );
    };

    const debouncedFetch = debounce(fetchQuiz, 300);
    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [dispatch, levelId, currentPage, searchTitle]);

  const handleDetail = (id: string) => {
    setSelectedQuizId(id);
    setShowTestingRule(true);
  };

  const handleStartQuiz = async () => {
    if (selectedQuizId) {
      try {
        await dispatch(startTesting({ quizId: selectedQuizId })).unwrap();
        navigate(`/quiz/${selectedQuizId}`);
      } catch (error) {
        dispatch(
          showNotification({
            message:
              "Bạn đang ở trong 1 bài thi khác. Hãy hoàn thành bài thi trước!",
            type: "warning",
          })
        );
        setShowTestingRule(false);
        console.error("Failed to start quiz:", error);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <>
      {showTestingRule && (
        <TestingRule
          onStart={handleStartQuiz}
          onCancel={() => setShowTestingRule(false)}
        />
      )}
      <>
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-5 flex items-center justify-center gap-4">
          <ClipboardList className="w-10 h-10 text-blue-400 mb-4" />
          Danh Sách Đề Thi
        </h1>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm đề thi..."
            className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
      </>

      {testings.length === 0 ? (
        <NoDataPage />
      ) : (
        <section>
          <div className="grid grid-cols-2 md:grid-cols-2 container md:px-28 gap-8">
            {testings.map((item) => (
              <Card
                className={`w-full overflow-hidden transition-all duration-300 border-blue-400 border-2 shadow-md hover:shadow-lg`}
                onClick={() => handleDetail(item.id)}
              >
                <CardContent className="flex-grow bg-[#ddf4ff] shadow-md rounded-xl p-4 cursor-pointer">
                  <div>
                    <div className="flex">
                      <BookOpen
                        className={`w-10 h-10 mr-4 transition-colors bg-[#ddf4ff]`}
                      />
                      <div className="flex flex-col">
                        <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                          {item.title}
                        </h2>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {item.description}
                        </p>
                        <div className="flex items-center space-x-4 pt-2">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="w-5 h-5 text-blue-400" />
                            <span className="text-sm mt-1">
                              {formatTimeLimit(item.timeLimit)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <ListChecks className="w-5 h-5 text-green-400" />
                            <span className="text-sm mt-1">
                              {item.totalQuestions} câu hỏi
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {totalPages > 1 && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      )}
    </>
  );
};

export default QuizList;

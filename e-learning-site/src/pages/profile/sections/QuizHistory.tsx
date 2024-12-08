import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  Timer,
  Clock,
  Calendar,
  Trophy,
  Search,
  Filter,
} from "lucide-react";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import {
  selectAttempts,
  selectTotalPages,
} from "@/redux/apps/quiz/QuizSelectors";
import { fetchUserQuizAttempts } from "@/redux/apps/quiz/QuizSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoDataPage from "@/pages/shared/NoDataPage";
import CustomPagination from "@/components/pagination-custom";
import { UserQuizAttemptResponse } from "@/types/feature/Quiz";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_SIZE = 20;

interface Filters {
  quizTitle: string;
  passed: string;
  startedAt: string;
  completedAt: string;
}

const QuizAttemptsList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const attempts = useAppSelector(selectAttempts);
  const totalPages = useAppSelector(selectTotalPages);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    quizTitle: searchParams.get("quizTitle") || "",
    passed: searchParams.get("passed") || "all",
    startedAt: searchParams.get("startedAt") || "",
    completedAt: searchParams.get("completedAt") || "",
  });

  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  useEffect(() => {
    dispatch(
      fetchUserQuizAttempts({
        ...filters,
        passed:
          filters.passed === "true"
            ? true
            : filters.passed === "false"
            ? false
            : false,
        pageNumber: currentPage - 1,
        pageSize: PAGE_SIZE,
        sortField: "score",
        sortDirection: "ASC",
      })
    );
  }, [dispatch, currentPage, filters]);

  const handlePageChange = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: page.toString(),
    });
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setFilters({
      quizTitle: "",
      passed: "all",
      startedAt: "",
      completedAt: "",
    });
    setSearchParams({ page: "1" });
  };

  const handleDetail = (attempt: UserQuizAttemptResponse) => {
    if (!attempt.completedAt) {
      navigate(`/quiz/${attempt.quizId}`);
    } else {
      navigate(`/attempt/${attempt.attemptId}/result`);
    }
  };

  return (
    <>
      <Collapsible
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        className="mt-2 mb-5 md:container"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Tìm kiếm theo tiêu đề..."
                value={filters.quizTitle}
                onChange={(e) =>
                  handleFilterChange("quizTitle", e.target.value)
                }
                className="pl-8"
              />
            </div>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Bộ lọc
            </Button>
          </CollapsibleTrigger>
          {Object.values(filters).some((v) => v) && (
            <Button variant="ghost" size="sm" onClick={handleResetFilters}>
              Xóa bộ lọc
            </Button>
          )}
        </div>

        <CollapsibleContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Trạng thái</label>
              <Select
                value={filters.passed}
                onValueChange={(value) => handleFilterChange("passed", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="true">Đạt</SelectItem>
                  <SelectItem value="false">Không đạt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ngày bắt đầu</label>
              <Input
                type="date"
                value={filters.startedAt}
                onChange={(e) =>
                  handleFilterChange("startedAt", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ngày hoàn thành</label>
              <Input
                type="date"
                value={filters.completedAt}
                onChange={(e) =>
                  handleFilterChange("completedAt", e.target.value)
                }
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      {attempts.length === 0 ? (
        <NoDataPage />
      ) : (
        <div className="md:container mx-auto mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Danh sách bài kiểm tra</h1>
              <p className="text-gray-500 mt-2">
                Xem lại các bài kiểm tra của bạn
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attempts.map((attempt) => (
              <Card
                key={attempt.attemptId}
                onClick={() => handleDetail(attempt)}
                className="hover:shadow-lg transition-shadow cursor-pointer relative"
              >
                <CardHeader>
                  <div className="flex items-start">
                    <div>
                      <CardTitle
                        className="text-xl my-3 line-clamp-2"
                        style={{ wordBreak: "break-word" }}
                      >
                        {attempt.quizTitle}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(attempt.startedAt), "dd/MM/yyyy")}
                      </CardDescription>
                    </div>
                    <div className="absolute top-0 right-0">
                      {attempt.completedAt ? (
                        attempt.passed ? (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                            <Check className="w-4 h-4 mr-1" />
                            Đạt
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                            <X className="w-4 h-4 mr-1" />
                            Không đạt
                          </Badge>
                        )
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                        >
                          <Timer className="w-4 h-4 mr-1" />
                          Đang làm
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 px-4 pb-6">
                    <div className="grid grid-cols-2 items-center">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Trophy className="w-4 h-4" />
                        <span>Điểm số:</span>
                      </div>
                      <span className="font-semibold flex justify-end">
                        {attempt.score !== null
                          ? `${attempt.score}`
                          : "Chưa có"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Thời gian:</span>
                      </div>
                      <span className="text-sm">
                        {attempt.completedAt
                          ? format(new Date(attempt.completedAt), "HH:mm")
                          : "Đang làm bài"}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-full h-2 mt-4 rounded-full absolute bottom-0 ${
                      attempt.completedAt
                        ? attempt.passed
                          ? "bg-green-500"
                          : "bg-red-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <div
                      className="h-full bg-green-700 rounded-full"
                      style={{
                        width: `${attempt.completedAt ? "100%" : "50%"}`,
                        transition: "width 0.5s ease-in-out",
                      }}
                    />
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
        </div>
      )}
    </>
  );
};

export default QuizAttemptsList;

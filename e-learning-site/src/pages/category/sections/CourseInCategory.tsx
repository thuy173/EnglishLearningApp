import ProgressBar from "@/components/progress-bar";
import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { selectCourses } from "@/redux/apps/course/CourseSelectors";
import { useAppSelector } from "@/hooks/use-app-selector";
import { fetchCoursesData } from "@/redux/apps/course/CourseSlice";
import { useNavigate, useParams } from "react-router-dom";
import CourseDto from "@/types/feature/Course";
import NoDataPage from "@/pages/shared/NoDataPage";
import { enroll } from "@/redux/apps/progress/ProgressSlice";

const CourseInCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const categoryId = parseInt(id ?? "1", 10);
  const [pageNumber, setPageNumber] = useState(0);
  const [allCourses, setAllCourses] = useState<CourseDto[]>([]);

  const handleSeeMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handleCourseClick = (courseId: number) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(enroll({ courseId }));
      navigate(`/lesson/${courseId}`);
    }
  };

  useEffect(() => {
    if (!isNaN(categoryId)) {
      dispatch(
        fetchCoursesData({
          name: "",
          categoryId,
          levelId: 0,
          pageNumber,
          pageSize: 8,
          sortField: "id",
          sortDirection: "ASC",
        })
      );
    }
  }, [dispatch, categoryId, pageNumber]);

  useEffect(() => {
    if (courses?.length > 0) {
      setAllCourses((prev) => {
        const newCourses = courses.filter(
          (newCourse) =>
            !prev.some((existingCourse) => existingCourse.id === newCourse.id)
        );
        return [...prev, ...newCourses];
      });
    }
  }, [courses]);

  useEffect(() => {
    setAllCourses([]);
  }, [categoryId]);

  return (
    <>
      {allCourses.length === 0 ? (
        <NoDataPage />
      ) : (
        <section>
          <div className="mt-5">
            <h2 className="text-xl font-semibold text-gray-500">
              Nhóm khóa học:
            </h2>
            <div className="mt-5 overflow-hidden overflow-y-auto max-h-96 pr-3 mb-16">
              <div className="space-y-4">
                {allCourses.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-6 p-5 space-x-5 justify-center rounded-xl bg-gray-100"
                    onClick={() => handleCourseClick(item.id)}
                  >
                    <div className="col-span-1 cursor-pointer">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="rounded-xl w-full h-16 object-cover"
                      />
                    </div>
                    <div className="col-span-2 flex items-center text-lg font-semibold uppercase cursor-pointer">
                      <p className="line-clamp-2">{item.name}</p>
                    </div>
                    <div className="col-span-3 flex items-center h-full">
                      <div className="w-full">
                        <ProgressBar current={item.completedLessons} total={item.totalLessons} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {courses?.length > 0 && (
                <div className="mt-3 flex items-center justify-center">
                  <button onClick={handleSeeMore}>
                    <span className="ml-1">
                      <MdKeyboardDoubleArrowDown
                        size={30}
                        className="animate-bounce"
                      />
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CourseInCategory;

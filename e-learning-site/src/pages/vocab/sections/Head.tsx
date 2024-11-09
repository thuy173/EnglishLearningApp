import ButtonCustom from "@/components/button-custom";
import Logo from "../../../../public/favicon.svg";
import { useNavigate, useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectOneLesson } from "@/redux/apps/lesson/LessonSelectors";
import { useEffect } from "react";
import { fetchLessonDataById } from "@/redux/apps/lesson/LessonSlice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";

const HeaderVocabList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const lessonId = parseInt(id ?? "1", 10);
  const lesson = useAppSelector(selectOneLesson);

  useEffect(() => {
    if (!isNaN(lessonId)) {
      dispatch(fetchLessonDataById(lessonId));
    }
  }, [dispatch, lessonId]);

  return (
    <section>
      <div className="bg-[#1cb0f6] text-white">
        <div className="grid grid-cols-4 justify-around items-center mx-32 px-4 py-2 ">
          <div className="col-span-1">
            <button
              className="flex justify-center items-center space-x-5"
              onClick={() => navigate(-1)}
            >
              <IoClose size={32} />
              <span className="text-xl font-semibold">{lesson?.name}</span>
            </button>
          </div>
          <div
            className="col-span-2 flex justify-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="V" width={42} />
          </div>
          <div className="col-span-1 flex justify-end">
            <ButtonCustom onClick={() => {}} title="Learning" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderVocabList;

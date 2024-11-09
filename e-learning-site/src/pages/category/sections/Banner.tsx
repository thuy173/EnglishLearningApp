import ButtonCustom from "@/components/button-custom";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectOneCategory } from "@/redux/apps/category/CategorySelectors";
import { fetchCategoryDataById } from "@/redux/apps/category/CategorySlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Banner = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const categoryId = parseInt(id ?? "1", 10);
  const category = useAppSelector(selectOneCategory);

  useEffect(() => {
    if (!isNaN(categoryId)) {
      dispatch(fetchCategoryDataById(categoryId));
    }
  }, [dispatch, categoryId]);

  return (
    <section>
      <div className="mt-20 p-10 bg-[#1cb0f6] text-white rounded-3xl">
        <div className="grid grid-cols-7">
          <div className="col-span-5">
            <h1 className="text-2xl font-bold">{category?.name}</h1>
            <p className="line-clamp-2">{category?.description}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="w-full">
              <ButtonCustom
                onClick={() => {}}
                title="Thông tin chi tiết"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

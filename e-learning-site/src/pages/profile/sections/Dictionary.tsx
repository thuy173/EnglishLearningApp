import DictionaryCard from "@/components/dictionary-card";
import CustomPagination from "@/components/pagination-custom";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import NoDataPage from "@/pages/shared/NoDataPage";
import {
  selectTotalPages,
  selectVocabularies,
} from "@/redux/apps/user/UserSelectors";
import { fetchUserVocab } from "@/redux/apps/user/UserSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 12;
const MyDictionary = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectVocabularies);
  const totalPages = useAppSelector(selectTotalPages);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  useEffect(() => {
    dispatch(
      fetchUserVocab({
        word: "",
        pageNumber: currentPage - 1,
        pageSize: PAGE_SIZE,
        sortField: "id",
        sortDirection: "ASC",
      })
    );
  }, [currentPage, dispatch]);

  return (
    <>
      {userInfo.length === 0 ? (
        <NoDataPage />
      ) : (
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {userInfo.map((item, index) => (
              <DictionaryCard
                word={item.word}
                image={item.image}
                ipa={item.ipa}
                meaning={item.meaning}
                example={item.example}
                key={index}
              />
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

export default MyDictionary;

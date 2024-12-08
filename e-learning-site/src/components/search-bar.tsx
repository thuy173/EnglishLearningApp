import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import {
  clearSearchResults,
  searchData,
} from "@/redux/apps/search/SearchSlice";
import SearchRequest from "@/types/feature/Search";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
  minChars?: number;
  debounceMs?: number;
  pageSize?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Tìm kiếm khóa học, từ vựng...",
  minChars = 2,
  debounceMs = 300,
  pageSize = 10,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, courses, vocabularies } = useSelector(
    (state: RootState) => state.search
  );

  const createSearchRequest = (keyword: string): SearchRequest => ({
    keyword,
    page: 0,
    size: pageSize,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      if (term.length >= minChars) {
        dispatch(searchData(createSearchRequest(term)));
      } else {
        dispatch(clearSearchResults());
      }
    }, debounceMs),
    [dispatch, minChars, pageSize]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.length >= minChars) {
      e.preventDefault();
      debouncedSearch.cancel();
      dispatch(searchData(createSearchRequest(searchTerm)));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);

  const handleCourseClick = (courseId: number) => {
    navigate(`/lesson/${courseId}`);
    dispatch(clearSearchResults());
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          disabled={loading}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {loading ? (
            <div className="w-5 h-5 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {(courses.length > 0 || vocabularies.length > 0) && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border">
          {/* Courses section */}
          {courses.length > 0 && (
            <div className="p-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Khóa học
              </h3>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div
                    className="font-medium line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: course.highlightedName }}
                  />
                  <div
                    className="text-sm text-gray-600 truncate"
                    dangerouslySetInnerHTML={{ __html: course.highlightedDesc }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Vocabularies section */}
          {vocabularies.length > 0 && (
            <div className="p-2 border-t">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Từ vựng
              </h3>
              {vocabularies.map((vocab) => (
                <div
                  key={vocab.id}
                  className="p-2 hover:bg-gray-50 rounded cursor-pointer flex justify-between"
                >
                  <div
                    className="font-medium"
                    dangerouslySetInnerHTML={{ __html: vocab.highlightedWord }}
                  />
                  <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: vocab.highlightedMeaning,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

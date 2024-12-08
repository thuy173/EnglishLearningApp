import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import headerConfig from "../header-config";
import { cn } from "@/lib/utils";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectCategories } from "@/redux/apps/category/CategorySelectors";
import { fetchCategoriesData } from "@/redux/apps/category/CategorySlice";
import { FaRegUser } from "react-icons/fa";
import { logoutUser } from "@/redux/apps/auth/AuthSlice";
import { persistor } from "@/redux/store";
import Cookies from "js-cookie";
import { API_CONFIG } from "@/types/feature/Config";

const Nav: React.FC<{ toggleDrawer: () => void }> = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const login = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Cookies.remove(API_CONFIG.tokenCookieName);
    Cookies.remove(API_CONFIG.refreshTokenCookieName);
    persistor.purge();
    dispatch(logoutUser());
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    dispatch(
      fetchCategoriesData({
        name: "",
        pageNumber: 0,
        pageSize: 10,
        sortField: "id",
        sortDirection: "DESC",
      })
    );
  }, [dispatch]);

  return (
    <div>
      <nav className="flex flex-col space-y-4">
        {headerConfig.map((item) => {
          const isActive = item.children?.some(
            (child) => location.pathname === child.path
          );

          if (item.children) {
            return (
              <div key={item.title} className="flex flex-col">
                <span
                  className={cn(
                    isActive ? "bg-blue-100" : "",
                    "py-2 flex rounded-md hover:bg-blue-200"
                  )}
                  onClick={() => navigate("/library")}
                >
                  {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                  {item.title}
                </span>
                <div className="pl-4 flex flex-col space-y-2">
                  {categories.map((child, idx) => (
                    <Link
                      key={idx}
                      to={`/course/${child.id}`}
                      onClick={toggleDrawer}
                      className={cn(
                        "flex select-none gap-4 rounded-md p-2 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground",
                        location.pathname === `/course/${child.id}`
                          ? "bg-accent text-accent-foreground"
                          : ""
                      )}
                    >
                      {child.icon && (
                        <img
                          src={child.icon}
                          alt={child.name}
                          className="w-10 h-10 rounded-md shrink-0"
                        />
                      )}
                      <span>{child.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          } else {
            return (
              <Link
                key={item.title}
                to={item.path || "#"}
                onClick={toggleDrawer}
                className={cn(
                  "flex items-center space-x-2 hover:text-blue-400",
                  location.pathname === item.path
                    ? "bg-blue-100 p-2 rounded-full"
                    : ""
                )}
              >
                {item.icon ? (
                  <item.icon className="w-5 h-5" />
                ) : (
                  <IoNavigateCircleOutline className="w-5 h-5" />
                )}

                <span>{item.title}</span>
              </Link>
            );
          }
        })}
      </nav>
      <div className="flex justify-start mt-10">
        {isAuthenticated ? (
          <div className="relative">
            <Avatar
              className="bg-indigo-600 cursor-pointer"
              onClick={toggleDropdown}
            >
              <AvatarFallback>
                <FaRegUser size={20} />
              </AvatarFallback>
            </Avatar>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              className="font-medium hover:text-gray-900 pr-3 hover:font-bold"
              onClick={login}
            >
              Đăng nhập
            </button>
            |
            <button
              className="font-medium hover:text-gray-900 pl-3 hover:font-bold"
              onClick={() => navigate("/register")}
            >
              Đăng kí
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;

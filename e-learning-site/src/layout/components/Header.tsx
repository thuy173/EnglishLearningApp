import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { IoMenu, IoSearch } from "react-icons/io5";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import headerConfig from "../header-config";
import Nav from "./Nav";
import Logo from "../../../public/favicon.svg";
import { useAppSelector } from "@/hooks/use-app-selector";
import { FaRegUser } from "react-icons/fa";
import Cookies from "js-cookie";
import { persistor } from "@/redux/store";
import { logoutUser } from "@/redux/apps/auth/AuthSlice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { selectCategories } from "@/redux/apps/category/CategorySelectors";
import { fetchCategoriesData } from "@/redux/apps/category/CategorySlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const login = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
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
    <header className="fixed top-0 z-50 w-full p-1 bg-white/30 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-lg font-semibold">
          <img src={Logo} alt="V" className="w-10 ml-10" />
        </div>
        <nav className="hidden lg:flex space-x-6 font-semibold">
          {headerConfig.map((item) => {
            const isActive = item.children?.some(
              (child) => location.pathname === child.path
            );

            if (item.children) {
              return (
                <NavigationMenu key={item.title}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          isActive
                            ? "bg-[#ddf4ff]"
                            : "border-2 border-transparent",
                          "bg-transparent px-2 py-1 rounded-md hover:bg-[#ddf4ff] focus:bg-[#ddf4ff] hover:border-2 hover:border-[#84d8ff] text-gray-700"
                        )}
                        onClick={() => navigate('/library')}
                      >
                        {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                        <span className="text-base font-semibold">
                          {item.title}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid lg:grid-cols-1 gap-1 p-2 md:w-[200px] ">
                          {categories.map((child, idx) => (
                            <li key={idx}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={`/course/${child.id}`}
                                  className={cn(
                                    "flex items-center select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                    location.pathname === `/course/${child.id}`
                                      ? "bg-accent text-accent-foreground"
                                      : ""
                                  )}
                                >
                                  {child.icon && (
                                    <img src={child.icon} alt="Vocabulary" className="w-10 h-10 rounded-md shrink-0" />
                                  )}
                                  <div className="text-sm font-semibold">
                                    {child.name}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              );
            } else {
              return (
                <Link
                  key={item.title}
                  to={item.path || "#"}
                  className={cn(
                    "flex items-center space-x-2 text-gray-600 hover:text-gray-700",
                    location.pathname === item.path
                      ? "bg-[#ddf4ff] border-2 border-[#84d8ff] text-gray-700 px-4 rounded-md "
                      : ""
                  )}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span>{item.title}</span>
                </Link>
              );
            }
          })}
        </nav>
        <div className="flex items-center space-x-4 lg:hidden">
          <IoMenu
            className="w-6 h-6 text-gray-600 cursor-pointer"
            onClick={toggleDrawer}
          />
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              className="pl-10 pr-4 py-1 rounded-full bg-white focus:outline-none"
            />
            <IoSearch className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
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
            <button className="font-medium hover:text-gray-900" onClick={login}>
              Login | Register
            </button>
          )}
        </div>
      </div>
      <Sheet open={isDrawerOpen} onOpenChange={toggleDrawer}>
        <SheetContent side={"right"}>
          <div className="p-4">
            <Nav toggleDrawer={toggleDrawer} />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;

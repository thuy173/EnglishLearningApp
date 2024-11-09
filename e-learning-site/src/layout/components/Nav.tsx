import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import headerConfig from "../header-config";
import { cn } from "@/lib/utils";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Nav: React.FC<{ toggleDrawer: () => void }> = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);

  const login = () => {
    setIsLogin(true);
    navigate("/login");
  };

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
                    isActive ? "bg-orange-100" : "",
                    "py-2 flex rounded-md hover:bg-orange-200"
                  )}
                >
                  <IoNavigateCircleOutline className="w-5 h-5 mt-0.5 mr-2" />
                  {item.title}
                </span>
                <div className="pl-4 flex flex-col space-y-2">
                  {item.children.map((child, idx) => (
                    <Link
                      key={idx}
                      to={child.path || "#"}
                      onClick={toggleDrawer}
                      className={cn(
                        "flex select-none gap-4 rounded-md p-2 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground",
                        location.pathname === child.path
                          ? "bg-accent text-accent-foreground"
                          : ""
                      )}
                    >
                      {child.icon && (
                        <child.icon className="w-5 h-5 shrink-0" />
                      )}
                      <span>{child.title}</span>
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
                  "flex items-center space-x-2 hover:text-orange-700",
                  location.pathname === item.path
                    ? "bg-orange-100 p-2 rounded-full"
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
      <div className="flex justify-end mt-4">
        {isLogin ? (
          <Avatar className="bg-indigo-600">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        ) : (
          <Button className="font-medium w-full" onClick={login}>
            Đăng nhập
          </Button>
        )}
      </div>
    </div>
  );
};

export default Nav;

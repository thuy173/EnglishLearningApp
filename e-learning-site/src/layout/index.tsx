import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { matchPath, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideFooter =
    location.pathname === "/library" ||
    location.pathname === "/level-choice" ||
    matchPath("/course/:id", location.pathname) ||
    matchPath("/lesson/:id", location.pathname) ||
    matchPath("/vocab/:id", location.pathname) ||
    matchPath("/quiz/:id", location.pathname) ||
    matchPath("/level-choice/:id/quiz", location.pathname) ||
    matchPath("/attempt/:id/result", location.pathname) ||
    matchPath("/profile/:section", location.pathname);

  const hideHeader =
    location.pathname === "/level-choice" ||
    matchPath("/quiz/:id", location.pathname) ||
    matchPath("/attempt/:id/result", location.pathname) ||
    matchPath("/vocab/:id", location.pathname);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {!hideHeader && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;

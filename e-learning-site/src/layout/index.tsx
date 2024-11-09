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
    matchPath("/course/:id", location.pathname) ||
    matchPath("/lesson/:id", location.pathname) ||
    matchPath("/vocab/:id", location.pathname) ||
    location.pathname === "/profile";

  const hideHeader = matchPath("/vocab/:id", location.pathname);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {!hideHeader && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";

function Layout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  const isSigninPage = location.pathname.includes("signin");
  const isRegisterPage = location.pathname.includes("register");
  const isHomePage = location.pathname.includes("home");

  return (
    <div className="bg-white dark:bg-gray-900 font-intervariable w-screen">
      <Header
        className="max-w-none"
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <div className="flex flex-row mt-[52px] lg:mt-[72px] h-[calc(100vh-52px-92px)] md:h-[calc(100vh-52px-56px)] lg:h-[calc(100vh-72px-56px)] ">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        {/* h-[calc(100vh-52px-92px)] md:h-[calc(100vh-52px-56px)] md:h-[calc(100vh-52px-56px)]  */}
        <div
          className={`${
            !isHomePage && !isRegisterPage && !isSigninPage
              ? `w-[-webkit-fill-available] lg:ml-80 lg:w-[calc(100vw-20rem)]`
              : `w-screen`
          } px-6 py-4 lg:px-8 overflow-y-auto`}
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "@/components/home/Home";
import Transactions from "@/components/transactions/Transactions";
import Header from "@/components/header/Header";
import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/Footer";
import Register from "@/components/register/Register";
import Signin from "@/components/signin/Signin";
import Signout from "@/components/signout/Signout";
import isAuthenticated from "./utils/isAuthenticated";

const ProtectedRoute = () => {
  const isAuthenticated =
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token");

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

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
              ? `lg:ml-80 lg:w-[calc(100vw-20rem)]`
              : `w-screen`
          } px-6 py-4 lg:px-8 overflow-y-scroll`}
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        loader: async () => redirect("/home"),
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/transactions",
            element: <Transactions />,
          },
        ],
      },
      {
        path: "/signout",
        element: <Signout />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

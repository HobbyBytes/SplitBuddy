import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "@/components/home/Home";
import Transactions from "@/components/transactions/Transactions";
import Header from "@/components/header/Header";
import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Footer from "@/components/footer/Footer";

function Layout() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="bg-white dark:bg-black font-intervariable w-screen">
      <Header
        className="max-w-none"
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <div className="flex flex-row mt-[52px] lg:mt-[72px] h-dvh">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        {/* h-[calc(100vh-52px-92px)] md:h-[calc(100vh-52px-56px)] lg:h-[calc(100vh-72px-56px)]  */}
        <div className="px-6 py-4 lg:px-8 lg:ml-80 w-screen lg:w-[calc(100vw-20rem)] overflow-scroll">
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
        element: <Home />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

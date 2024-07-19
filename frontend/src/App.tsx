import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { useState } from "react";

function Layout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 w-screen">
      <div className="flex flex-col container min-h-screen px-0 mx-auto">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="flex flex-row flex-grow px-0 mt-[52px] lg:mt-[70px]">
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div className="lg:ml-80 px-6 lg:px-8 py-4">
            <Outlet />
          </div>
        </div>
      </div>
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
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

/*
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
*/
export default App;

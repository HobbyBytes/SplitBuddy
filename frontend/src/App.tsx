import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "@/components/home/Home";
import Transactions from "@/components/transactions/Transactions";
import Register from "@/components/register/Register";
import Signin from "@/components/signin/Signin";
import Signout from "@/components/signout/Signout";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

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
        path: "/signout",
        element: <Signout />,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuthenticated =
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token");

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;

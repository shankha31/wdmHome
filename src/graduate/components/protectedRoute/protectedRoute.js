import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const getUserCredentials = JSON.parse(
    localStorage.getItem("userData") ?? "null"
  );
  return getUserCredentials ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;

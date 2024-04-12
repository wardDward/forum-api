import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { auth } = useSelector((state) => state.user);
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;

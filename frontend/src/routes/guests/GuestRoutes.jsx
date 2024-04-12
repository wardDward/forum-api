import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const Guest = () => {
  const { auth } = useSelector((state) => state.user);
  let location = useLocation();

  if (auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default Guest;

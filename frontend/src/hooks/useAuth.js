import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticatedUser } from "../redux/features/userSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(authenticatedUser());
    };
    fetchData();
  }, [dispatch]);

  return {
    user,
  };
};

export default useAuth;

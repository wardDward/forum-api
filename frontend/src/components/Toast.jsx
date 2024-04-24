import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { clearMessage } from "../redux/features/postSlice";
export default function Toast({ message, setMessage, type }) {
  const dispatch = useDispatch();

  const closeToast = () => {
    setMessage("");
  };

  return (
    <div
      className={`fixed top-1 right-2 w-[300px] p-4 z-[9999999] bg-white shadow-lg  flex items-center justify-between ${
        type === "success"
          ? "border-l-[5px] border-l-green-500"
          : "border-l-red-500"
      }`}
    >
      <span className="text-sm">{message}</span>
      <div
        className="p-1 text-gray-600 rounded-full cursor-pointer hover:bg-gray-400 hover:text-white"
        onClick={() => closeToast()}
      >
        <CloseIcon />
      </div>
    </div>
  );
}

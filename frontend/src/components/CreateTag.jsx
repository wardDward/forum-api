import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { handleInputChange } from "../utils/handleInput";
import { createTag } from "../redux/features/tagSlice";
import Toast from "./Toast";

export default function CreateTag({ toggleCreateTags }) {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.tags);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setMessage('')
    }, 3000)
  },[message])

  const handleInputChanges = (e) => {
    handleInputChange(e, formData, setFormData);
  };

  const submitTag = async (e) => {
    e.preventDefault();
    const res = await dispatch(createTag(formData));
    if (res.meta.requestStatus === "fulfilled") {
      setMessage("Tag Created");
    }
  };

  return (
    <>
      <div className="fixed inset-y-0 left-[10%] md:left-[25%] lg:left-[15%] h-full bg-black/10 right-0">
        <div className="flex justify-end p-4">
          <div
            className="p-1 rounded-full cursor-pointer hover:bg-gray-400 hover:text-red-500"
            onClick={() => toggleCreateTags()}
          >
            <CloseIcon sx={{ fontSize: 28 }} />
          </div>
        </div>
        <div className="flex items-center justify-center h-screen">
          <div className="h-[500px] bg-white w-full md:w-[85%] lg:w-1/2 rounded-lg ">
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-5 py-2 ">
                <h1 className="text-lg font-semibold">Create Tag</h1>
                <Tooltip title="Note: If the tag related to your post aldready exists. Use It">
                  <ErrorOutlineOutlinedIcon className="text-red-500 cursor-pointer" />
                </Tooltip>
              </div>
              <hr className="" />
              <div className="p-4">
                <form onSubmit={submitTag} autoComplete="off">
                  <div>
                    <label htmlFor="name" className="text-sm">
                      Tag Name
                    </label>
                    <input
                      onChange={(e) => handleInputChanges(e)}
                      type="text"
                      id="name"
                      name="name"
                      className="w-full p-2 px-2 py-1 mt-1 border border-gray-400 rounded-md outline-none"
                      placeholder="Tag name"
                      value={formData.name}
                    />
                    {errorMessage.name && (
                      <p className="text-sm text-red-500">
                        {errorMessage.name[0]}
                      </p>
                    )}
                  </div>
                  <div className="my-2">
                    <label htmlFor="name" className="text-sm">
                      Tag Description
                    </label>
                    <textarea
                      onChange={(e) => handleInputChanges(e)}
                      name="description"
                      id="description"
                      className="w-full p-2 py-1 border border-gray-400 rounded-md resize-none"
                      cols="30"
                      rows="10"
                      value={formData.description}
                    ></textarea>
                    {errorMessage.description && (
                      <p className="text-sm text-red-500">
                        {errorMessage.description[0]}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="p-2 text-sm text-white bg-black rounded-lg hover:bg-gray-700"
                    >
                      Create Tag
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {message !== "" && (
        <Toast message={message} setMessage={setMessage} type={"success"} />
      )}
    </>
  );
}

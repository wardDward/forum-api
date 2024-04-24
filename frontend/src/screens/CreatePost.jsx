import { useRef, useState } from "react";
import Tiptap from "../components/Tiptap";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, createPost } from "../redux/features/postSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Toast from "../components/Toast";
import { useEffect } from "react";
import TagModals from "../components/modals/TagModals";
import CloseIcon from "@mui/icons-material/Close";
import { removeTag } from "../utils/handleRemove";
import CreateTag from "../components/CreateTag";
import sanitizeHtml from "sanitize-html";
import { io } from "socket.io-client";

export default function CreatePost() {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.posts);
  const [editor, setEditor] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [choseenTags, setChoseenTags] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const [createTagButton, setCreateTagButton] = useState(false);
  const [message, setMessage] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    const removeToast = () => {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    };
    if (message !== "") {
      return removeToast();
    }
  }, [message, dispatch]);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const toggleTags = () => {
    setShowTags(!showTags);
  };

  const toggleCreateTags = () => {
    setCreateTagButton(!createTagButton);
  };

  const socket = io("http://localhost:5000");

  const sanitizeContent = sanitizeHtml(content);
  const submitPost = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      createPost({
        title,
        content: sanitizeContent,
        tags: choseenTags.map((tag) => tag._id),
      })
    );
    if (res.meta.requestStatus === "fulfilled") {
      //send socket from client
      socket.emit(
        "send_notification",
        `${title} your post has been published.`,
        "post",
        socket.id
      );
      setMessage("Post Published!");
      setTitle("");
      setContent("");
      setChoseenTags([]);
      if (editor) {
        editor.commands.clearContent();
      }
    }

    socket.off("send_notification");
  };

  return (
    <>
      <div className="h-screen p-3 md:p-12">
        <form onSubmit={submitPost}>
          <div className="flex items-center justify-between my-4">
            <h1 className="mb-4 text-lg font-bold tracking-wide md:text-3xl">
              Invision your thoughts
            </h1>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center">
                <button
                  type="button"
                  role="button"
                  className="mr-0 md:mr-2 border border-gray-400 max-w-[120px] py-[0.9px] rounded-lg hover:bg-gray-200 flex items-center justify-center text-gray-700 px-1"
                  onClick={toggleTags}
                >
                  <LocalOfferIcon className="mr-1" sx={{ fontSize: 18 }} />
                  <span className="text-sm">Add Tags</span>
                </button>
                <button
                  type="button"
                  role="button"
                  className="border border-gray-400 max-w-[120px] py-[0.9px] rounded-lg hover:bg-gray-200 flex items-center justify-center text-gray-700 px-1"
                  onClick={toggleCreateTags}
                >
                  <AddCircleOutlineIcon
                    className="mr-1"
                    sx={{ fontSize: 18 }}
                  />
                  <span className="text-sm">Create Tag</span>
                </button>
                {choseenTags.length > 0 && (
                  <button
                    type="button"
                    role="button"
                    className="border border-gray-400 max-w-[120px] py-[0.9px] rounded-lg hover:bg-gray-200 flex items-center justify-center text-gray-700 px-1 ml-1"
                    onClick={toggleCreateTags}
                  >
                    <AddCircleOutlineIcon
                      className="mr-1"
                      sx={{ fontSize: 18 }}
                    />
                    <span className="text-sm">Clear Tags</span>
                  </button>
                )}
              </div>
              <div className="mt-2 text-sm max-w-[250px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {choseenTags.map((tag) => (
                  <div
                    className="flex items-center justify-between border rounded-md"
                    key={tag._id}
                  >
                    <span className="pl-1">{tag.name}</span>
                    <CloseIcon
                      sx={{ fontSize: 15 }}
                      className="cursor-pointer"
                      onClick={() => removeTag(setChoseenTags, tag._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="my-4">
            <input
              ref={titleRef}
              type="text"
              placeholder="Write your post title..."
              className="w-full p-2 text-md md:text-3xl border-black border-b-[1px] outline-none"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {errorMessage.title && (
              <p className="text-sm text-red-500">{errorMessage.title[0]}</p>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <Tiptap
              newContent={content}
              setContent={setContent}
              setEditor={setEditor}
            />
            {errorMessage.content && (
              <p className="text-sm text-red-500">{errorMessage.content[0]}</p>
            )}
            {errorMessage.tags && (
              <p className="text-sm text-red-500">{errorMessage.tags[0]}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-1 text-white bg-black rounded-md hover:bg-gray-700"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
      {createTagButton && <CreateTag toggleCreateTags={toggleCreateTags} />}
      {showTags && (
        <TagModals
          choseenTags={choseenTags}
          setChoseenTags={setChoseenTags}
          toggleTags={toggleTags}
        />
      )}
      {message !== "" && (
        <Toast message={message} setMessage={setMessage} type={"success"} />
      )}
    </>
  );
}

import Tiptap from "../components/Tiptap";
import { createPost } from "../redux/features/postSlice";
import { useDispatch } from "react-redux";

export default function CreatePost() {
  const dispatch = useDispatch();

  const store = (e) => {
    e.preventDefault();
    dispatch(
      createPost({
        user_id: 1,
        title: "test",
        description: "test",
        tags: "tags",
      })
    );
  };
  return (
    <div className="flex flex-col justify-center h-screen bg-red-50">
      <div className="my-4 bg-red-100 flex-2">dasdasd</div>
      <div className="flex-1 bg-red-200">
        <Tiptap/>
      </div>
      <form onSubmit={store} method="post">
        <button type="submit">yes</button>
      </form>
    </div>
  );
}

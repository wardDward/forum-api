import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

export default function PostCard({ post }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow p-3 w-[350px] sm:w-[500px] md:w-[550px] lg:w-[900px] my-2 max-h-[300px] overflow-hidden">
      {/* <div>
        <img
          className="rounded-t-lg"
          src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div> */}
      <div className="">
        <div>
          <Link
            to={{ pathname: `/posts/${post._id}` }}
            className="mb-1 text-2xl font-bold tracking-tight text-gray-900"
          >
            {post.title}
          </Link>
        </div>
        <p
          className="font-normal text-gray-700 truncate dark:text-gray-400 line-clamp-3 prose max-w-none mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></p>
      </div>
      <form className="flex items-center mt-4">
        <button type="submit" className="mr-2 hover:text-gray-500">
          <FavoriteBorderIcon sx={{ fontSize: 20 }} />
        </button>
        <button className="mr-2 hover:text-gray-500">
          <InsertCommentOutlinedIcon sx={{ fontSize: 20 }} />
        </button>
      </form>
    </div>
  );
}

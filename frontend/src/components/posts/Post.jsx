import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../redux/features/postSlice";

export default function Post() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, posts } = useSelector((state) => state.posts);

  // State to hold formatted date and tags
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTags, setFormattedTags] = useState([]);

  useEffect(() => {
    dispatch(getPost(_id));
  }, [_id, dispatch]);

  useEffect(() => {
    if (posts && posts.createdAt) {
      const date = new Date(posts.createdAt);
      const formatted = date.toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
      });
      setFormattedDate(formatted);
    }

    if (posts && posts.tags) {
      const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

      const tags = posts.tags.map((tag) => (
        <Link
          to={{ pathname: `/tags/${tag._id}` }}
          className="p-1 mr-2 text-sm font-bold rounded-md text-medium hover:bg-gray-200"
          key={tag._id}
          style={{ color: getRandomColor() }}
        >
          {tag.name}
        </Link>
      ));
      setFormattedTags(tags);
    }
  }, [posts]);

  return (
    <div className="h-screen p-4 md:p-20">
      <div className="flex flex-col">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex items-center gap-4">
              {formattedDate && (
                <span className="flex items-center mt-1 font-semibold text-gray-400">
                  {formattedDate}
                </span>
              )}
              <div className="h-[18px] border border-gray-400" />
              <div className="flex flex-wrap items-center mt-1">
                {formattedTags}
              </div>
            </div>
            <div className="my-5">
              <h1 className="text-3xl font-bold tracking-wide">
                {posts.title}
              </h1>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: posts.content }}
              className="prose max-w-none"
            />
          </>
        )}
      </div>
    </div>
  );
}

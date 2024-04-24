import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpecificTag } from "../redux/features/tagSlice";
import PostCard from "../components/posts/PostCard";

export default function SpecificTag() {
  const { _id } = useParams();
  const { tags, posts, postCount } = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTag = () => {
      dispatch(getSpecificTag(_id));
    };
    fetchTag();
  }, [_id, dispatch]);
  
  console.log(postCount);
  return (
    <>
      <div className="flex flex-col h-screen pt-20">
        <div className="px-10 ">
          <h1 className="text-2xl">{tags.name}</h1>
          <p className="mt-1 text-sm text-gray-800">{tags.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-1 mt-[20px]">
            <p>{postCount} questions</p>
            <div className="p-1 border border-gray-400 rounded-md">
              <button
                role="button"
                type="button"
                className="px-1 py-2 mr-2 text-sm rounded-md hover:bg-gray-200"
              >
                Newest
              </button>
              <button
                role="button"
                type="button"
                className="px-1 py-2 mr-2 text-sm rounded-md hover:bg-gray-200"
              >
                Trending
              </button>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div
          className="flex flex-col h-[100%] items-center p-4"
          id="posts-container"
        >
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p>No Post</p>
          )}
        </div>
      </div>
    </>
  );
}

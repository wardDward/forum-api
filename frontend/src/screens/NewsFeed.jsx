import PostCard from "../components/posts/PostCard";
import SearchBar from "../components/navigations/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../redux/features/postSlice";
import { useEffect } from "react";

export default function NewsFeed() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  useEffect(() => {
    const fetchPosts = () => {
      dispatch(getAllPost());
    };
    fetchPosts();
  }, [dispatch]);

  return (
    <>
      <SearchBar />
      <div className="mt-[110px] h-screen p-[10px] md:p-[20px] flex flex-col items-center ">
        <div className="flex flex-col justitfy-center w-full lg:w-[80%] z-[11]">
          <div className="mt-[20px] flex justify-center flex-wrap gap-3">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <p>No Post</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

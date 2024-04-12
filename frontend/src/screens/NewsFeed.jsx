import PostCard from "../components/posts/PostCard";
import SearchBar from "../components/navigations/SearchBar";

export default function NewsFeed() {
  return (
    <>
      <SearchBar />
      <div className="mt-[110px] h-screen p-[10px] md:p-[20px] flex flex-col items-center ">
        <div className="flex flex-col justitfy-center w-full lg:w-[80%] z-[11]">
          <div className="mt-[20px] flex justify-center flex-wrap gap-3">
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>
    </>
  );
}

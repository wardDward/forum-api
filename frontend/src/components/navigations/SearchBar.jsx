export default function SearchBar() {
  return (
    <div className="fixed left-[10%] right-[0%] sm:left-[10%] sm:right-[0%] md:left-[35%] pt-[20px] md:right-[15%] lg:left-[32%] lg:right-[17%] bg-white z-[12] px-3">
      <h1 className="font-medium">Latest Blogs</h1>
      <form action="" className="mt-2" autoComplete="off">
        <div className="flex justify-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search blogs, topics and more"
            className="py-[6px] w-full border-y-[1px] border-l-[1px] border-y-gray-300 border-l-gray-300 border-r-none rounded-y-lg rounded-l-lg px-2 outline-none placeholder:text-sm"
          />
          <select
            name="types"
            id="types"
            className="py-[7.5px] w-[40%] md:w-[20%] border-y-[1px] border-r-[1px] border-y-gray-300 border-r-gray-300 border-l-none rounded-y-lg rounded-r-lg px-2 outline-none text-gray-500 text-sm lg:text-md"
          >
            <option value="All Post">All Post</option>
            <option value="Tags">Tags</option>
            <option value="Profile">Profile</option>
          </select>
        </div>
      </form>
    </div>
  );
}

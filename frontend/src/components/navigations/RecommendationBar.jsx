import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
export default function RecommendationBar() {
  return (
    <div className="fixed top-0 bottom-0 right-0 py-[40px] hidden lg:flex flex-col w-[25%] xl:w-[15%]">
      <div className="flex flex-col min-h-[535px]">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-800 font-semibold tracking-wide">For You</h1>
          <a href="#" className="text-blue-500 hover:underline pr-2 text-sm">
            View More
          </a>
        </div>
        <a
          href="#"
          className="py-2 px-2 w-full flex items-center bg-white shadow-lg border-gray-300 my-1 rounded-lg "
        >
          <img
            src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-[40px] w-[50px] object-cover rounded-md"
          />
          <div className="ml-3">
            <p className="font-bold text-sm max-w-full ">
              Lorem ipsum dolor sit amet.
            </p>
            <p className="text-sm text-gray-500">Today</p>
          </div>
        </a>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between h-full">
          <h1 className="text-gray-800 font-semibold tracking-wide">
            Trending Now
          </h1>
          <a href="#" className="text-blue-500 hover:underline pr-2 text-sm">
            View More
          </a>
        </div>
        <a
          href="#"
          className="w-full bg-white shadow-md min-h-[280px] border-2 mt-4"
        >
          <img
            src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-[60%] w-full object-cover"
          />
          <div className="flex justify-center flex-col items-center">
            <p className="mt-2 font-semibold">Lorem ipsum dolor sit amet.</p>
            <p className="text-sm text-gray-600 text-center truncate-custom overflow-hidden max-w-[250px] max-h-full line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ad
              alias neque necessitatibus harum!
            </p>
          </div>
          <div className="px-4 mt-2">
            <p className="flex items-center">
              <RemoveRedEyeOutlinedIcon className="text-gray-800" />
              <p className="ml-1 text-sm text-gray-600">123123</p>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

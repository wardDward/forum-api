import { Link } from "react-router-dom";

export default function CategoryDropDown() {
  return (
    <div className="py-2">
      <h1 className="px-3 font-medium">Categories For You</h1>
      <div className="mt-2 ">
        <a
          href="#"
          className="block my-2 py-[5px] px-10 rounded-md hover:bg-gray-200"
        >
          Express.js
        </a>
        <a
          href="#"
          className="block my-2 py-[5px] px-10 rounded-md hover:bg-gray-200"
        >
          React.js
        </a>
        <a
          href="#"
          className="block my-2 py-[5px] px-10 rounded-md hover:bg-gray-200"
        >
          Laravel
        </a>
        <Link
          to="/tags"
          className="block my-2 py-[5px] px-10 rounded-md hover:bg-gray-200 text-sm text-blue-500"
        >
          See More ...
        </Link>
      </div>
    </div>
  );
}

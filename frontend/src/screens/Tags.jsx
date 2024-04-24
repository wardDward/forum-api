import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../redux/features/tagSlice";
import { Link } from "react-router-dom";
import _ from "lodash";
import CreateTag from "../components/CreateTag";
export default function Tags() {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.tags);
  const [search, setSearch] = useState("");
  const [createTag, setCreateTag] = useState(false);

  useEffect(() => {
    const debounceTags = _.debounce(function () {
      dispatch(fetchTags(search));
    }, 1000);
    debounceTags();
  }, [search, dispatch]);

  const toggleCreateTag = () => {
    setCreateTag(!createTag);
  };

  return (
    <>
      <div className="h-screen flex flex-col py-[50px] px-[40px]">
        <div className="">
          <h1 className="text-2xl font-medium tracking-wide">Tags</h1>
          <p className="max-w-[500px] my-4 text-[15px]">
            A tag is a keyword or label that categorizes your question with
            other, similar questions. Using the right tags makes it easier for
            others to find and answer your question.
          </p>
          <a
            role="button"
            onClick={() => toggleCreateTag()}
            className="text-xs text-blue-500 underline"
          >
            Check Tags Creator
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-1 mt-8">
          <form action="" autoComplete="off">
            <div className="relative flex items-center">
              <SearchIcon className="text-gray-500 absolute left-[6px]" />
              <input
                type="text"
                name="search"
                id="search"
                className="py-2 border rounded-md border-gray-300/90 pl-9 placeholder:text-sm"
                placeholder="Filter by tag name"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </form>
          <div className="flex items-center px-1 py-1 border rounded-lg border-gray-300/90">
            <button
              type="button"
              role="button"
              className="px-3 py-2 text-sm text-gray-500 bg-gray-200 rounded-md"
            >
              Popular
            </button>
            <button
              type="button"
              role="button"
              className="px-3 py-2 text-sm text-gray-500"
            >
              Name
            </button>
            <button
              type="button"
              role="button"
              className="px-3 py-2 text-sm text-gray-500"
            >
              New
            </button>
          </div>
        </div>
        <div className="w-full h-full border-t-[1px] mt-2 border-gray-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 pt-[5px]	">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <Link
                to={`/tags/${tag._id}`}
                className="bg-white w-full max-h-[200px] min-h-[230px] border-[1px] border-gray-300 p-2 rounded-md flex flex-col justify-between"
                key={tag._id}
              >
                <div>
                  <h1 className="mt-2 font-medium">{tag.name}</h1>
                  <p className="px-1 mt-3 overflow-hidden text-sm text-gray-500 text-ellipsis line-clamp-4">
                    {tag.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-[50px] flex-wrap">
                  <span className="text-xs text-gray-500">
                    1555515 question
                  </span>
                  <div className="flex items-center justify-between w-full">
                    <a href="#" className="text-xs text-gray-500">
                      12312 asked today
                    </a>
                    <a href="#" className="text-xs text-gray-500">
                      1555515 this week
                    </a>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No Tags Found</p>
          )}
        </div>
      </div>
      {createTag && <CreateTag toggleCreateTags={toggleCreateTag} />}
    </>
  );
}

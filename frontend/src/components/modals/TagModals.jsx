import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTags } from "../../redux/features/tagSlice";
import _ from "lodash";

export default function TagModals({ choseenTags, setChoseenTags, toggleTags }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { tags } = useSelector((state) => state.tags);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const debounceTags = _.debounce(function () {
      dispatch(fetchTags(search));
    }, 1000);
    debounceTags();
    setMessage(""); // Clear message when fetching starts
  }, [search, dispatch]);

  const chooseTags = (tag) => {
    const checkTagId = choseenTags.some((item) => item._id === tag._id);
    if (checkTagId) {
      setMessage(`Tag already choosen. ${tag.name}`);
      return;
    }
    setChoseenTags((prevTags) => [...prevTags, tag]);
  };

  return (
    <>
      <div className="fixed inset-y-0 left-[10%] md:left-[25%] lg:left-[15%] flex items-center justify-center h-full bg-black/10 right-0">
        <div className="w-3/4 mx-auto bg-white rounded-md lg:w-1/2">
          <div
            className="flex items-center justify-between px-6"
            onClick={() => toggleTags()}
          >
            <h1 className="py-4 text-lg font-bold ">Tags</h1>
            <div className="p-2 rounded-full cursor-pointer hover:bg-gray-400">
              <CloseIcon />
            </div>
          </div>
          <hr className="border border-gray-300" />
          <form action="" method="get" className="p-3">
            <div className="flex flex-col">
              <div className="relative flex items-center w-full">
                <SearchIcon
                  className="absolute text-gray-600 left-2"
                  sx={{ fontSize: 23 }}
                />
                <input
                  type="text"
                  placeholder="Search related tag..."
                  className="w-full py-2 pl-8 border border-gray-300 rounded-lg outline-none"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <p className="text-sm text-red-500">{message}</p>
              <div className="flex flex-wrap gap-2 my-2">
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <button
                      title={tag.description}
                      type="button"
                      role="button"
                      key={tag._id}
                      className="px-2 py-1 border rounded-lg hover:bg-gray-200"
                      onClick={() => chooseTags(tag)}
                    >
                      {tag.name}
                    </button>
                  ))
                ) : (
                  <p>No tags found</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

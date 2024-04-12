import { NavLink } from "react-router-dom";
import { useState } from "react";
import Nexio from "../../assets/nexio.png";
import TagsDropDown from "./TagsDropDown";

// icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CloseIcon from "@mui/icons-material/Close";

export default function Sidebar({ toggleNotification, activeNotif, data }) {
  const [showCat, setShowCat] = useState(false);
  const [toggle, setToggle] = useState(false);

  const toggleNotif = () => {
    toggleNotification();
  };

  const toggleCategories = () => {
    setShowCat(!showCat);
  };

  const toggleSidebar = (display) => {
    setToggle(display);
  };

  return (
    <>
      <div className="p-3 fixed top-0 bottom-0 bg-white border border-gray-300 md:hidden z-[12] w-[10%] flex justify-center">
        <MenuOpenIcon
          onClick={() => toggleSidebar("block")}
          sx={{ fontSize: "35px" }}
          className="p-1 rounded-full cursor-pointer hover:bg-gray-300"
        />
      </div>
      <div
        className={
          toggle === "block"
            ? "w-full md:w-[25%] lg:w-[15%] block md:flex flex-col fixed top-0 bottom-0 border-r-none md:border-r-[1px] bg-white z-[99]"
            : "w-full md:w-[25%] lg:w-[15%] hidden md:flex flex-col fixed top-0 bottom-0 border-r-none md:border-r-[1px] bg-white z-[99]"
        }
      >
        <div className="flex justify-between px-5 md:px-0">
          <a href="#" className="flex items-center w-[100px] p-[20px] ">
            <img src={Nexio} alt="nexio_logo" className="h-[50px] w-[50px]" />
            <p className="ml-2 text-lg font-semibold">Nexio</p>
          </a>
          <div className="flex items-center justify-between md:hidden">
            <CloseIcon
              sx={{ fontSize: "30px" }}
              className="p-1 rounded-full cursor-pointer hover:bg-gray-300"
              onClick={() => toggleSidebar("hidden")}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between px-[20px] md:px-0">
          <div className="flex flex-col mt-12">
            <NavLink
              to="/"
              className="flex items-center px-4 py-2 my-2 rounded-lg hover:bg-gray-300"
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <HomeIcon sx={{ fontSize: "30px" }} />
                  ) : (
                    <HomeOutlinedIcon sx={{ fontSize: "30px" }} />
                  )}
                  <span className="ml-2 font-[500]">Home</span>
                </>
              )}
            </NavLink>
            <a
              onClick={(e) => toggleCategories(e)}
              role="link"
              href="#"
              className="flex items-center justify-between px-4 py-2 my-2 rounded-lg hover:bg-gray-300"
            >
              <div>
                <CategoryOutlinedIcon sx={{ fontSize: "30px" }} />
                <span className="ml-2 font-[500]">Tags</span>
              </div>
              <KeyboardArrowDownOutlinedIcon
                sx={{
                  fontSize: "20px",
                }}
                className={showCat ? "rotate-180" : ""}
              />
            </a>
            {showCat ? <TagsDropDown /> : ""}
            <a
              role="button"
              href="#"
              className="flex items-center px-4 py-2 my-2 rounded-lg hover:bg-gray-300"
              onClick={(e) => toggleNotif(e)}
            >
              {activeNotif ? (
                <NotificationsIcon
                  sx={{ fontSize: "30px" }}
                  className="transform rotate-[15deg]"
                />
              ) : (
                <NotificationsOutlinedIcon
                  sx={{ fontSize: "30px" }}
                  className="transform rotate-[15deg]"
                />
              )}
              <span className="ml-2 font-[500]">Notifications</span>
            </a>
            <NavLink
              role="button"
              to={"/create_post"}
              className="flex items-center px-4 py-2 my-2 rounded-lg hover:bg-gray-300"
            >
              <AddBoxOutlinedIcon sx={{ fontSize: "30px" }} />
              <span className="ml-2 font-[500]">Create Post</span>
            </NavLink>
            <NavLink
              href="#"
              className="flex items-center px-4 py-2 my-2 rounded-lg hover:bg-gray-300"
            >
              <img
                src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="p_pic"
                className="w-[30px] h-[30px] rounded-full border-[1px] border-gray-400"
              />
              <span className="ml-2 font-[500]">profile</span>
            </NavLink>
          </div>
        </div>
        <div className="flex items-end flex-1  px-[20px] md:px-0">
          <button
            role="button"
            className="flex items-center w-full px-4 py-4 hover:bg-gray-300 rounded-t-xl"
          >
            <MenuOutlined sx={{ fontSize: "25px" }} />
            <span className="ml-2 font-[500]">Menu</span>
          </button>
        </div>
      </div>
    </>
  );
}

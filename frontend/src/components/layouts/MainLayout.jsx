import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../navigations/Sidebar";
import NotificationBar from "../navigations/NotificationBar";
import useAuth from "../../hooks/useAuth";

export default function MainLayout() {
  const { user } = useAuth();
  console.log(user);
  const [toggleNotif, setToggleNotif] = useState(false);

  const toggleNotification = () => {
    return setToggleNotif(!toggleNotif);
  };

  return (
    <main className="flex">
      <Sidebar
        data={user}
        toggleNotification={toggleNotification}
        activeNotif={toggleNotif}
      />
      {toggleNotif && <NotificationBar />}
      <div className="flex-2 ml-[10%] md:ml-[25%] lg:ml-[15%]  flex flex-col">
        <Outlet />
      </div>
    </main>
  );
}

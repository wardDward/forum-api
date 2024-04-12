import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProtectedUrl from "./users/ProtectedUrl";
import GuestUrl from "./guests/GuestUrl";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {GuestUrl}
      {/* protected routes  */}
      {ProtectedUrl}
    </Route>
  )
);

export default router;

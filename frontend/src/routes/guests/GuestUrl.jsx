import GuestRoutes from "./GuestRoutes";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
// import Post from "../../components/posts/Post";

const Login = lazy(() => import("../../screens/auth/Login"));

const GuestUrl = (
  <Route element={<GuestRoutes />}>
    <Route
      path="/login"
      element={
        <Suspense fallback={<LoadingScreen />}>
          <Login />
        </Suspense>
      }
    />
    {/* <Route
      path="/posts/:id"
      element={
        <Suspense>
          <Post />
        </Suspense>
      }
    /> */}
  </Route>
);

export default GuestUrl;

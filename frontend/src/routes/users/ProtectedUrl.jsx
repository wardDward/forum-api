// src/routes/protected.js
import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import LoadingScreen from "../../components/LoadingScreen";
import CreatePost from "../../screens/CreatePost";

const MainLayout = lazy(() => import("../../components/layouts/MainLayout"));
const NewsFeed = lazy(() => import("../../screens/NewsFeed"));
const Tags = lazy(() => import("../../screens/Tags"));

const protectedRoutes = (
  <Route element={<ProtectedRoutes />}>
    <Route
      element={
        <Suspense fallback={<LoadingScreen />}>
          <MainLayout />
        </Suspense>
      }
    >
      <Route
        path="/"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <NewsFeed />
          </Suspense>
        }
      />
      <Route
        path="/tags"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <Tags />
          </Suspense>
        }
      />
      <Route
        path="/create_post"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <CreatePost />
          </Suspense>
        }
      />
    </Route>
  </Route>
);

export default protectedRoutes;

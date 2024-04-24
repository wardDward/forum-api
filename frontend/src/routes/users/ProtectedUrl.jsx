// src/routes/protected.js
import { Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import LoadingScreen from "../../components/LoadingScreen";

const MainLayout = lazy(() => import("../../components/layouts/MainLayout"));
const NewsFeed = lazy(() => import("../../screens/NewsFeed"));
const Tags = lazy(() => import("../../screens/Tags"));
const Post = lazy(() => import("../../components/posts/Post"));
const SpecificTag = lazy(() => import("../../screens/SpecificTag"));
const CreatePost = lazy(() => import("../../screens/CreatePost"));

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
      <Route
        path="/posts/:_id"
        element={
          <Suspense>
            <Post />
          </Suspense>
        }
      />
      <Route
        path="/tags/:_id"
        element={
          <Suspense>
            <SpecificTag />{" "}
          </Suspense>
        }
      />
    </Route>
  </Route>
);

export default protectedRoutes;

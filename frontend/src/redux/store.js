import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";
import postSlice from "./features/postSlice.js";
import tagSlice from "./features/tagSlice.js";
import notificationSlice from "./features/notificationSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postSlice,
    tags: tagSlice,
    notifications: notificationSlice
  },
});

export default store

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, thunkApi) => {
    try {
      await axios.post("/api/posts", data);
    } catch (error) {
      console.log(error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    post: {},
    isLoading: false,
  },
  reducers: {},
});

export default postSlice.reducer;

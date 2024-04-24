import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, thunkApi) => {
    try {
      await axios.post("/api/posts", data);
      data.title = "";
      data.content = "<h1>Markdown your thoughts...</h1>";
      data.tags = [];
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const getAllPost = createAsyncThunk("posts/getAllPost", async () => {
  try {
    const res = await axios.get("/api/posts");
    return res.data.posts;
  } catch (error) {
    console.log(error);
  }
});

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (_id, thunkApi) => {
    try {
      const response = await axios.get(`/api/posts/${_id}`);
      return response.data.post;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    errorMessage: {},
  },
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isLoading = false;
        state.errorMessage = {};
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getAllPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        (state.isLoading = true), (state.posts = action.payload);
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      });
  },
});

export const { clearMessage } = postSlice.actions;
export default postSlice.reducer;

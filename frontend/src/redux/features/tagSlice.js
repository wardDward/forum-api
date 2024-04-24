import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTags = createAsyncThunk("tags/fetchTags", async (search) => {
  try {
    const url = search ? `/api/tags?q=${search}` : "/api/tags";
    const response = await axios.get(url);
    return response.data.tags;
  } catch (error) {
    console.log(error);
  }
});

export const getSpecificTag = createAsyncThunk(
  "tags/getSpecificTag",
  async (_id, thunkApi) => {
    try {
      const response = await axios.get(`/api/tags/${_id}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const createTag = createAsyncThunk(
  "tags/createTag",
  async (data, thunkApi) => {
    try {
      await axios.post("/api/tags", data);
      data.name = "";
      data.description = "";
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

const tagSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    posts: [],
    postCount: 0,
    isLoading: false,
    errorMessage: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tags = action.payload;
      })
      .addCase(createTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTag.fulfilled, (state) => {
        state.isLoading = false;
        state.errorMessage = {};
      })
      .addCase(createTag.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getSpecificTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecificTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tags = action.payload.tag;
        state.posts = action.payload.posts;
        state.postCount = action.payload.postCount;
      })
      .addCase(getSpecificTag.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default tagSlice.reducer;

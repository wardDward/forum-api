import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkApi) => {
    try {
      await axios.post("/api/users/login", credentials);
      await thunkApi.dispatch(authenticatedUser());
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const authenticatedUser = createAsyncThunk(
  "user/authenticatedUser",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/api/users/authenticated");
      console.log(response.data.user);
      return response.data;
    } catch (error) {
      console.log(error);
      alert("Server Errror");
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    persistUser: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    auth: localStorage.getItem("auth") ? localStorage.getItem("auth") : null,
    isLoading: false,
    errorMessage: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(authenticatedUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticatedUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        
        const persistUser = { ...action.payload.user };
        delete persistUser._id;

        localStorage.setItem("auth", (state.auth = action.payload.authFlag));
        localStorage.setItem(
          "user",
          JSON.stringify((state.persistUser = persistUser))
        );
      })
      .addCase(authenticatedUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        localStorage.removeItem("user");
        localStorage.removeItem("auth");
      });
  },
});

export default userSlice.reducer;

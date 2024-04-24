import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotif = createAsyncThunk(
  "notifications/fetchNotif",
  async () => {
    try {
      const response = await axios.get("/api/notifications");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    notificationsToday: [],
    notificationsOneWeekAgo: [],
    notificationsOneMonthAgo: [],
    isLoading: false,
    errorMessage: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotif.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotif.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationsToday = action.payload.notificationsToday;
        state.notificationsOneWeekAgo = action.payload.notificationsOneWeekAgo;
        state.notificationsOneMonthAgo =
          action.payload.notificationsOneMonthAgo;
      });
  },
});

export default notificationSlice.reducer;

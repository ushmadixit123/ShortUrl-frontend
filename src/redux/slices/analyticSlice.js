import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.js";

/* ===============================
   FETCH ANALYTICS
================================= */

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/url/analytics"); // adjust route if needed
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch analytics"
      );
    }
  }
);

/* ===============================
   SLICE
================================= */

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    clickTrend: {
      daily: [],
      weekly: [],
    },
    topLinks: [],
    mostClickedLink: null,
    recentActivity: [],
    totalClicks: 0,

    loading: false,
    error: null,
  },

  reducers: {
    clearAnalytics: (state) => {
      state.clickTrend = { daily: [], weekly: [] };
      state.topLinks = [];
      state.mostClickedLink = null;
      state.recentActivity = [];
      state.totalClicks = 0;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;

        state.clickTrend = action.payload.clickTrend;
        state.topLinks = action.payload.topLinks;
        state.mostClickedLink = action.payload.mostClickedLink;
        state.recentActivity = action.payload.recentActivity;
        state.totalClicks = action.payload.totalClicks;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
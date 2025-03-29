import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

const initialState = {
  isLoading: false,
  reviews: [],
  error: null
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.shop.review.add,
        formdata,
        {
          withCredentials: true
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to add review" });
    }
  }
);

export const getReviews = createAsyncThunk("/order/getReviews", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      API_ENDPOINTS.shop.review.get(id),
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: "Failed to fetch reviews" });
  }
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.reviews = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Reviews
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
        state.error = null;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
        state.error = action.payload?.message || "Failed to fetch reviews";
      })
      // Add Review
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.push(action.payload.data);
        state.error = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to add review";
      });
  },
});

export const { clearError, resetState } = reviewSlice.actions;
export default reviewSlice.reducer;

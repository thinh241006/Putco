import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../../config/api";

const initialState = {
  searchResults: [],
  isLoading: false,
};

export const getSearchResults = createAsyncThunk(
  "shop/search",
  async (keyword) => {
    const response = await axios.get(
      API_ENDPOINTS.shop.search(keyword)
    );
    return response.data;
  }
);

const shopSearchSlice = createSlice({
  name: "shopSearchSlice",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = shopSearchSlice.actions;

export default shopSearchSlice.reducer;

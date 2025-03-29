import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  error: null
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    try {
      console.log("Fetching filtered products with params:", { filterParams, sortParams });
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const result = await axios.get(
        `${API_ENDPOINTS.shop.products.base}?${query}`,
        {
          withCredentials: true
        }
      );

      console.log("Products fetched:", result.data);
      return result?.data;
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      throw error;
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    try {
      console.log("Fetching product details for ID:", id);
      const result = await axios.get(
        API_ENDPOINTS.shop.products.details(id),
        {
          withCredentials: true
        }
      );

      console.log("Product details fetched:", result.data);
      return result?.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.error = null;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
        state.error = action.error.message;
      });
  },
});

export const { setProductDetails, clearError } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

const initialState = {
  isLoading: false,
  productList: [],
  error: null
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    try {
      const result = await axios.post(
        API_ENDPOINTS.admin.products.add,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      console.error("Add product error:", error);
      throw error;
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    try {
      console.log("Fetching products from:", API_ENDPOINTS.admin.products.getAll);
      const result = await axios.get(
        API_ENDPOINTS.admin.products.getAll,
        {
          withCredentials: true
        }
      );
      console.log("Products fetched:", result.data);
      return result?.data;
    } catch (error) {
      console.error("Fetch products error:", error);
      throw error;
    }
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    try {
      const result = await axios.put(
        API_ENDPOINTS.admin.products.edit(id),
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      console.error("Edit product error:", error);
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    try {
      const result = await axios.delete(
        API_ENDPOINTS.admin.products.delete(id)
      );
      return result?.data;
    } catch (error) {
      console.error("Delete product error:", error);
      throw error;
    }
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        state.error = action.error.message;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList.push(action.payload.data);
        state.error = null;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearError } = AdminProductsSlice.actions;
export default AdminProductsSlice.reducer;

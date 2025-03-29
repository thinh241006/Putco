import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../../config/api";

const initialState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "admin/fetchOrders",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINTS.admin.orders.get}`
    );

    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "admin/fetchOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${API_ENDPOINTS.admin.orders.details(id)}`
    );

    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrder",
  async ({ id, orderData }) => {
    const response = await axios.put(
      `${API_ENDPOINTS.admin.orders.update(id)}`,
      orderData
    );

    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      console.log("resetOrderDetails");
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orders = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.currentOrder = null;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../../config/api";

const initialState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
};

export const createNewOrder = createAsyncThunk(
  "shop/createOrder",
  async (orderData) => {
    const response = await axios.post(
      API_ENDPOINTS.shop.order.create,
      orderData
    );
    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "shop/capturePayment",
  async (paymentData) => {
    const response = await axios.post(
      API_ENDPOINTS.shop.order.capture,
      paymentData
    );
    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "shop/getAllOrders",
  async (userId) => {
    const response = await axios.get(
      API_ENDPOINTS.shop.order.list(userId)
    );
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "shop/getOrderDetails",
  async (orderId) => {
    const response = await axios.get(
      API_ENDPOINTS.shop.order.details(orderId)
    );
    return response.data;
  }
);

const shopOrderSlice = createSlice({
  name: "shopOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.data;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.data;
      })
      .addCase(capturePayment.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orders = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.currentOrder = null;
      });
  },
});

export const { resetOrderDetails } = shopOrderSlice.actions;

export default shopOrderSlice.reducer;

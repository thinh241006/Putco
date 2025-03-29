import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../../config/api";

const initialState = {
  addresses: [],
  currentAddress: null,
  isLoading: false,
};

export const addNewAddress = createAsyncThunk(
  "shop/addAddress",
  async (addressData) => {
    const response = await axios.post(
      API_ENDPOINTS.shop.address.add,
      addressData
    );
    return response.data;
  }
);

export const editaAddress = createAsyncThunk(
  "shop/editAddress",
  async ({ userId, addressId, addressData }) => {
    const response = await axios.put(
      API_ENDPOINTS.shop.address.update(userId, addressId),
      addressData
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "shop/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      API_ENDPOINTS.shop.address.delete(userId, addressId)
    );
    return { addressId };
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "shop/fetchAddresses",
  async (userId) => {
    const response = await axios.get(
      API_ENDPOINTS.shop.address.get(userId)
    );
    return response.data;
  }
);

const shopAddressSlice = createSlice({
  name: "shopAddressSlice",
  initialState,
  reducers: {
    resetAddressDetails: (state) => {
      state.currentAddress = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = [...state.addresses, action.payload.data];
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editaAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editaAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = state.addresses.map(address => 
          address._id === action.payload.data._id ? action.payload.data : address
        );
      })
      .addCase(editaAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = state.addresses.filter(
          address => address._id !== action.payload.addressId
        );
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addresses = [];
      });
  },
});

export const { resetAddressDetails } = shopAddressSlice.actions;

export default shopAddressSlice.reducer;

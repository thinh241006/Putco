import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "@/config/api";

const initialState = {
  features: [],
  isLoading: false,
};

export const getFeatureImages = createAsyncThunk(
  "common/fetchFeatures",
  async () => {
    const response = await axios.get(
      `${API_ENDPOINTS.common.feature.get}`
    );

    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "common/addFeature",
  async (featureData) => {
    const response = await axios.post(
      `${API_ENDPOINTS.common.feature.add}`,
      featureData
    );

    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.features = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.features = [];
      })
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.features = [...state.features, action.payload.data];
      })
      .addCase(addFeatureImage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default commonSlice.reducer;

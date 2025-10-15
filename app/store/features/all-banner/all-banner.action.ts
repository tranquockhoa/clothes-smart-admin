import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBannerApi } from "~/apis/manage-banner";
import { IResponseError } from "~/interface";

export const getAllBannerApiRequest = createAsyncThunk(
  "allBanner/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllBannerApi();
      return response;
    } catch (error) {
      return rejectWithValue(error as IResponseError);
    }
  },
);

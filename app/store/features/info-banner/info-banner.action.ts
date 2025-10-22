import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBannerByIdApi } from "~/apis/manage-banner";
import { IResponseError } from "~/interface";

export const getBannerByIdApiRequest = createAsyncThunk(
  "bannerById/get",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getBannerByIdApi(id);
      return response;
    } catch (error) {
      return rejectWithValue(error as IResponseError);
    }
  },
);

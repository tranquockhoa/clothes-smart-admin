import { createSlice } from "@reduxjs/toolkit";
import { IBannerResponse } from "~/interface/manage-banner";
import { getAllBannerApiRequest } from "./all-banner.action";

interface AllBannerState {
  allBanner: IBannerResponse | null;
  loading: boolean;
  error: string;
}

const initialState: AllBannerState = {
  allBanner: null,
  loading: false,
  error: "",
};

export const allBannerSlice = createSlice({
  name: "allBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBannerApiRequest.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllBannerApiRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.allBanner = action.payload;
      })
      .addCase(getAllBannerApiRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const allBannerAction = allBannerSlice.actions;

export default allBannerSlice.reducer;

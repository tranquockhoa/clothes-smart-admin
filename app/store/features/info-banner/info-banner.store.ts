import { createSlice } from "@reduxjs/toolkit";
import { IBannerGetByIdResponse } from "~/interface/manage-banner";
import { getBannerByIdApiRequest } from "./info-banner.action";

interface InfoBannerState {
  infoBanner: IBannerGetByIdResponse | null;
  loading: boolean;
  error: string;
}

const initialState: InfoBannerState = {
  infoBanner: null,
  loading: false,
  error: "",
};

export const infoBannerSlice = createSlice({
  name: "allBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBannerByIdApiRequest.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getBannerByIdApiRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.infoBanner = action.payload;
      })
      .addCase(getBannerByIdApiRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const infoBannerAction = infoBannerSlice.actions;

export default infoBannerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getAdminUsersProfileRequest } from "./profile.action";
import type { IUser } from "~/interface/user/user";

interface ProfileState {
  profile: IUser | null;
  loading: boolean;
  error: string;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUsersProfileRequest.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAdminUsersProfileRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.profile = action.payload;
      })
      .addCase(getAdminUsersProfileRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const profileAction = profileSlice.actions;

export default profileSlice.reducer;

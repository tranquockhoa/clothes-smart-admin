import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "~/interface/user/user";
import { getUserProfileApiRequest } from "./user-profile.action";

interface UserProfileState {
  userProfile: IUser | null;
  loading: boolean;
  error: string;
}

const initialState: UserProfileState = {
  userProfile: null,
  loading: false,
  error: "",
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileApiRequest.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUserProfileApiRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.userProfile = action.payload;
      })
      .addCase(getUserProfileApiRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const userProfileAction = userProfileSlice.actions;

export default userProfileSlice.reducer;

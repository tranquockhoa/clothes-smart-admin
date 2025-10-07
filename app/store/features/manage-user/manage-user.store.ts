import { createSlice } from "@reduxjs/toolkit";
import { getAllUserRequest } from "./manage-user.action";
import {} from "~/interface/user/user";
import { IUserResults } from "~/interface/manage-user/manage-user";

interface AllUserState {
  allUser: IUserResults | null;
  loading: boolean;
  error: string;
}

const initialState: AllUserState = {
  allUser: null,
  loading: false,
  error: "",
};

export const allUserSlice = createSlice({
  name: "allUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserRequest.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllUserRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.allUser = action.payload;
      })
      .addCase(getAllUserRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const allUserAction = allUserSlice.actions;

export default allUserSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminUsersProfile } from "~/apis/profile";
import { IResponseError } from "~/interface";

export const getAdminUsersProfileRequest = createAsyncThunk(
  "admin/users/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAdminUsersProfile();
      return response;
    } catch (error) {
      return rejectWithValue(error as IResponseError);
    }
  },
);

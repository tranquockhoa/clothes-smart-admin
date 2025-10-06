import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAdminUsersProfile } from "~/apis/profile";

interface IApiError {
  status: boolean;
  message: string;
  timestamp: string;
  code: number;
}

export const getAdminUsersProfileRequest = createAsyncThunk(
  "admin/users/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAdminUsersProfile();
      return response;
    } catch (error) {
      return rejectWithValue(error as IApiError);
    }
  },
);

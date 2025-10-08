import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfileApi } from "~/apis/manage-user";
import { IError } from "~/interface/common/common";

export const getUserProfileApiRequest = createAsyncThunk(
  "userProfile/get",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getUserProfileApi(id);
      return response;
    } catch (error) {
      return rejectWithValue(error as IError);
    }
  },
);

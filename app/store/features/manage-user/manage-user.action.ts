import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUserApi } from "~/apis/manage-user";
import { IResponseError } from "~/interface";

export const getAllUserRequest = createAsyncThunk(
  "allUser/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUserApi();
      return response;
    } catch (error) {
      return rejectWithValue(error as IResponseError);
    }
  },
);

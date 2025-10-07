import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUserApi } from "~/apis/manage-user";
import { IResponseError } from "~/interface";
import { IPageAble } from "~/interface/common/common";

export const getAllUserRequest = createAsyncThunk(
  "allUser/get",
  async (params: IPageAble, { rejectWithValue }) => {
    try {
      const response = await getAllUserApi(params);
      return response;
    } catch (error) {
      return rejectWithValue(error as IResponseError);
    }
  },
);

import { AxiosResponse } from "axios";
import authorizedRequest from "~/config/axios";
import { ADMIN_USER } from "./config.endpoint";
import { IAllUserApiResponse } from "~/interface/manage-user/manage-user";
import { IPageAble } from "~/interface/common/common";

export const getAllUserApi = async (params: IPageAble) => {
  const response: AxiosResponse<IAllUserApiResponse> =
    await authorizedRequest.get<IAllUserApiResponse>(ADMIN_USER, { params });
  return response.data?.data;
};

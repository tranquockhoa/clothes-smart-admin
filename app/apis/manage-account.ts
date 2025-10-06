import { AxiosResponse } from "axios";
import authorizedRequest from "~/config/axios";
import { ADMIN_USER } from "./config.endpoint";
import { IAllUserApiResponse } from "~/interface/manage-user/manage-user";

export const getAllUserApi = async () => {
  const response: AxiosResponse<IAllUserApiResponse> =
    await authorizedRequest.get<IAllUserApiResponse>(ADMIN_USER);
  return response.data;
};

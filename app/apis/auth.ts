import { AxiosResponse } from "axios";
import authorizedRequest from "~/config/axios";
import { LoginResponse, LoginParams } from "~/interface/auth";
import { ADMIN_LOGIN } from "./config.endpoint";

export const loginApi = async (param: LoginParams) => {
  const response: AxiosResponse<LoginResponse> =
    await authorizedRequest.post<LoginResponse>(ADMIN_LOGIN, param);
  return response.data;
};

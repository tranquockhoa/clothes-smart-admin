import { AxiosResponse } from "axios";
import authorizedRequest from "~/config/axios";
import { ILoginRespond, LoginParams } from "~/interface/auth";
import { ADMIN_LOGIN } from "./config.endpoint";

export const loginApi = async (param: LoginParams) => {
  const response: AxiosResponse<ILoginRespond> =
    await authorizedRequest.post<ILoginRespond>(ADMIN_LOGIN, param);
  return response.data?.data;
};

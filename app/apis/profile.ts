import { AxiosResponse } from "axios";
import authorizedRequest from "~/config/axios";
import type { IUser } from "~/interface/user/user";
import { ADMIN_USER } from "./config.endpoint";

export const getProfile = async () => {
  const response: AxiosResponse<IUser> =
    await authorizedRequest.get<IUser>(ADMIN_USER);
  return response;
};

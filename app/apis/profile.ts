import { AxiosResponse } from "axios";
import authorizedRequest from "~/config/axios";
import type { IUserDataRespond, IUserRespond } from "~/interface/user/user";
import { ADMIN_USER_PROFILE } from "./config.endpoint";
import { IFormUpdateProfile } from "~/interface/profile/profile";

export const getAdminUsersProfile = async () => {
  const response: AxiosResponse<IUserDataRespond> =
    await authorizedRequest.get<IUserDataRespond>(ADMIN_USER_PROFILE);
  return response.data.data;
};

export const updateAdminProfile = async (params: IFormUpdateProfile) => {
  const response: AxiosResponse<IUserRespond> =
    await authorizedRequest.patch<IUserRespond>(ADMIN_USER_PROFILE, params);
  return response.data.data;
};

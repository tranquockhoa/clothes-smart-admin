import { AxiosResponse } from "axios";
import authorizedRequest from "~/config/axios";
import {
  IBannerData,
  IBannerDeleteResponse,
  IBannerGetByIdResponse,
  IBannerReorderResponse,
  IBannerResponse,
} from "~/interface/manage-banner";
import { ADMIN_BANNERS, ADMIN_BANNERS_REORDER } from "./config.endpoint";

export const getAllBannerApi = async () => {
  const response: AxiosResponse<IBannerResponse> =
    await authorizedRequest.get(ADMIN_BANNERS);
  return response.data;
};

export const reorderBannerApi = async (ids: string[]) => {
  const response: AxiosResponse<IBannerReorderResponse> =
    await authorizedRequest.post(ADMIN_BANNERS_REORDER, { ids });
  return response.data;
};

export const deleteBannerApi = async (id: string) => {
  const response: AxiosResponse<IBannerDeleteResponse> =
    await authorizedRequest.delete(`${ADMIN_BANNERS}/${id}`);
  return response.data;
};

export const getBannerByIdApi = async (id: string) => {
  const response: AxiosResponse<IBannerGetByIdResponse> =
    await authorizedRequest.get(`${ADMIN_BANNERS}/${id}`);
  return response.data;
};

export const createBannerApi = async (param: IBannerData) => {
  const response: AxiosResponse<IBannerGetByIdResponse> =
    await authorizedRequest.post(ADMIN_BANNERS, param);
  return response.data;
};
// export const updateBannerById = async (id: string, params: IBannerData) => {
//   const response: AxiosResponse
// };

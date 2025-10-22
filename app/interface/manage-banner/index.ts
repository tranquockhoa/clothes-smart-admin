import { STATUS } from "~/enum/common";

export interface IBannerData {
  _id?: string;
  title: string;
  description: string;
  imageId: string;
  linkUrl: string;
  status: STATUS;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: 0;
}

export interface IBannerResponse {
  status: boolean;
  code: string;
  data: IBannerData[];
  message: string;
  timestamp: string;
}

export interface IBannerReorderResponse {
  status: boolean;
  code: number;
  data: boolean;
  message: string;
  timestamp: string;
}

export interface IBannerDeleteResponse {
  status: boolean;
  code: number;
  data: boolean;
  message: string;
  timestamp: string;
}

export interface IFormUpdateBanner {
  title: string;
  description: string;
  imageId: string;
  linkUrl: string;
  status: STATUS;
  sortOrder: number;
}

export interface IBannerGetByIdResponse {
  status: boolean;
  code: string;
  data: IBannerData;
  message: string;
  timestamp: string;
}

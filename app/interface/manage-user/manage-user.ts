import { IUser } from "../user/user";

export interface IAllUserApiResponse {
  status: boolean;
  code: number;
  data: IUserResults;
  message: string;
  timestamp: string;
}

export interface IUserResults {
  results: IUser[];
  totalItems: number;
  totalPages: number;
  current: number;
  pageSize: number;
}

interface Idata {
  _id: string;
}

export interface IManageUserDelteResponse {
  status: string;
  code: number;
  data: Idata;
  message: string;
  timestamp: string;
}

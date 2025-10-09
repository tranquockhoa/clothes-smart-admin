/* eslint-disable no-unused-vars */
export enum UserRole {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
}
export interface INewUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  dob: string;
  gender: string;
  role: string;
  status: string;
  accountType: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string[];
  dob: string;
  gender: string;
  password: string;
  role: UserRole;
  status: string;
  accountType?: string;
  createdAt?: string;
  updateAt?: string;
}

export interface IUserDataRespond {
  status: boolean;
  code: number;
  data: IUser;
  message: string;
  timestamp: string;
}

export interface IUserRespond {
  data: IUser;
  accessToken: string;
  refreshToken: string;
  crsToken: string;
}

import { IUser } from "./user/user";

export interface LoginParams {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ILoginDataRespond {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ILoginRespond {
  data: ILoginDataRespond;
  code: number;
  status: boolean;
  message: string;
  timestamp: string;
}

import { IUser } from "./user/user";

export interface LoginParams {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

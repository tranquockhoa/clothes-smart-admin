import dayjs from "dayjs";

export interface IProfileFormValues {
  name?: string;
  phone?: string;
  address?: string;
  dob?: dayjs.Dayjs;
  gender?: string;
}

export interface IFormUpdateProfile {
  name?: string;
  phone?: string;
  address?: string;
  dob?: string;
  gender?: string;
  accountType?: string;
}

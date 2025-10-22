import { UploadFile } from "antd";

export interface IFileData {
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  path: string;
  description: string;
  isActive: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IFileUploadResponse {
  status: boolean;
  code: number;
  data: IFileData;
  message: string;
  timestamp: string;
}

export interface IFileUploadBody {
  file: UploadFile | string;
}

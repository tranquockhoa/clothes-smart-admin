export interface IResponseError {
  status: boolean;
  message: string[];
  timestamp: string;
  code: number;
}

export interface IError {
  data: IResponseError;
}
export interface IPageAble {
  current?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: string;
  search?: string;
}

// export interface IFile {
//   uid: string;
//   name: string;
//   status: FILE_STATUS;
//   response: IFileUploadResponse;
//   linkProps: '{"download": "image"}';
//   xhr: "XMLHttpRequest{ ... }";
// }

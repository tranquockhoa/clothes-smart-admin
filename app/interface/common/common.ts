export interface IResponseError {
  status: boolean;
  message: string;
  timestamp: string;
  code: number;
}
export interface IPageAble {
  current?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: string;
  search?: string;
}

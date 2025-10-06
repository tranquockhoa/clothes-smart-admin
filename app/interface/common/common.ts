export interface ResponseError {
  status: boolean;
  message: string;
  timestamp: string;
  code: number;
}
export interface IPageAbleResponse {
  current?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: string;
  search?: string;
}

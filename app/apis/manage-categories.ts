import { axiosInstance } from "./config";
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryListResponse,
} from "~/interface/manage-categories/manage-categories";

const CATEGORIES_ENDPOINTS = {
  LIST: "/categories",
  CREATE: "/categories",
  UPDATE: (id: string) => `/categories/${id}`,
  DELETE: (id: string) => `/categories/${id}`,
  DETAIL: (id: string) => `/categories/${id}`,
};

export const manageCategoriesApi = {
  // Lấy danh sách categories
  getList: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<CategoryListResponse> => {
    const response = await axiosInstance.get(CATEGORIES_ENDPOINTS.LIST, {
      params,
    });
    return response.data;
  },

  // Tạo category mới
  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await axiosInstance.post(
      CATEGORIES_ENDPOINTS.CREATE,
      data,
    );
    return response.data;
  },

  // Cập nhật category
  update: async (data: UpdateCategoryRequest): Promise<Category> => {
    const response = await axiosInstance.put(
      CATEGORIES_ENDPOINTS.UPDATE(data.id),
      data,
    );
    return response.data;
  },

  // Xóa category
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(CATEGORIES_ENDPOINTS.DELETE(id));
  },

  // Lấy chi tiết category
  getDetail: async (id: string): Promise<Category> => {
    const response = await axiosInstance.get(CATEGORIES_ENDPOINTS.DETAIL(id));
    return response.data;
  },
};

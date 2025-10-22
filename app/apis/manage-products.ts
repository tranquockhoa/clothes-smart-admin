import { axiosInstance } from "./config";
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ProductListResponse,
} from "~/interface/manage-products/manage-products";

const PRODUCTS_ENDPOINTS = {
  LIST: "/products",
  CREATE: "/products",
  UPDATE: (id: string) => `/products/${id}`,
  DELETE: (id: string) => `/products/${id}`,
  DETAIL: (id: string) => `/products/${id}`,
};

export const manageProductsApi = {
  // Lấy danh sách products
  getList: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ProductListResponse> => {
    const response = await axiosInstance.get(PRODUCTS_ENDPOINTS.LIST, {
      params,
    });
    return response.data;
  },

  // Tạo product mới
  create: async (data: CreateProductRequest): Promise<Product> => {
    const response = await axiosInstance.post(PRODUCTS_ENDPOINTS.CREATE, data);
    return response.data;
  },

  // Cập nhật product
  update: async (data: UpdateProductRequest): Promise<Product> => {
    const response = await axiosInstance.put(
      PRODUCTS_ENDPOINTS.UPDATE(data._id),
      data,
    );
    return response.data;
  },

  // Xóa product
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(PRODUCTS_ENDPOINTS.DELETE(id));
  },

  // Lấy chi tiết product
  getDetail: async (id: string): Promise<Product> => {
    const response = await axiosInstance.get(PRODUCTS_ENDPOINTS.DETAIL(id));
    return response.data;
  },
};

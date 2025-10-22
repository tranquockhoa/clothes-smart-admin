import { STATUS_PRODUCT } from "~/enum/common";

export interface Category {
  _id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  _id: string;
  name: string;
  category: Category;
  price: number;
  variants: string[];
  images: string[];
  thumbnail: string;
  description: string;
  material: string;
  technology: string;
  rating: string;
  status: STATUS_PRODUCT;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductListResponse {
  status: boolean;
  code: number;
  data: {
    products: Product[];
    total: number;
    page: number;
    limit: number;
  };
  message: string;
  timestamp: string;
}

export interface CreateProductRequest {
  name: string;
  category: string;
  price: number;
  variants?: string[];
  images?: string[];
  thumbnail?: string;
  description?: string;
  material?: string;
  technology?: string;
}

export interface UpdateProductRequest {
  _id: string;
  name?: string;
  category?: string;
  price?: number;
  variants?: string[];
  images?: string[];
  thumbnail?: string;
  description?: string;
  material?: string;
  technology?: string;
  status?: STATUS_PRODUCT;
}

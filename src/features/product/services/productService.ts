// src/services/productService.ts

import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";
import { Product } from "@/types/product";

interface ProductsResponse {
  data: Product[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface FetchProductsParams {
  category_id?: string;
  min_price?: string;
  max_price?: string;
  search?: string;
  page?: number;
  per_page?: number;
}

export const fetchProducts = async (params: FetchProductsParams = {}): Promise<ProductsResponse> => {
  const response = await axiosInstance.get<ApiResponse<ProductsResponse>>("/products", { params });
  return response.data.payload;
}

export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await axiosInstance.get<ApiResponse<Product>>(`/products/${id}`);
  return response.data.payload;
}





export const createProduct = async (data: FormData): Promise<Product> => {
  const response = await axiosInstance.post<ApiResponse<Product>>("/products", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.payload;
}

export const updateProduct = async (id: number, data: FormData): Promise<Product> => {
  // Append the _method field to the FormData
  data.append('_method', 'PUT');

  const response = await axiosInstance.post<ApiResponse<Product>>(`/products/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.payload;
}
export const deleteProduct = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
}

export const uploadProductImage = async (productId: number, imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('picture', imageFile);

  const response = await axiosInstance.post<ApiResponse<{ image_url: string }>>(
    `/products/${productId}/upload-image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.payload.image_url;
}
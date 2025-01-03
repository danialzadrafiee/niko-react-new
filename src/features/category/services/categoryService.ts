// src/features/category/services/categoryService.ts

import { ApiResponse } from "@/types/api"
import axiosInstance from "@/utils/axiosInstance"
import { Category } from "@/types/category"

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get<ApiResponse<Category[]>>("/categories")
  return response.data.payload
}

export const fetchCategory = async (id: number): Promise<Category> => {
  const response = await axiosInstance.get<ApiResponse<Category>>(`/categories/${id}`)
  return response.data.payload
}

export const createCategory = async (data: FormData): Promise<Category> => {
  const response = await axiosInstance.post<ApiResponse<Category>>("/categories", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data.payload
}

export const updateCategory = async (id: number, data: FormData): Promise<Category> => {
  data.append("_method", "PUT")
  const response = await axiosInstance.post<ApiResponse<Category>>(`/categories/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data.payload
}

export const deleteCategory = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/categories/${id}`)
}

import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";
import { Purchase } from "@/types/purchase";

interface PurchaseResponse {
  data: Purchase[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface CreatePurchaseData {
  product_id: number;
  quantity: number;
}

export const createPurchase = async (data: CreatePurchaseData): Promise<Purchase> => {
  const response = await axiosInstance.post<ApiResponse<Purchase>>("/purchases", data);
  return response.data.payload;
}

export const fetchPurchaseHistory = async (page: number = 1, perPage: number = 10): Promise<PurchaseResponse> => {
  const response = await axiosInstance.get<ApiResponse<PurchaseResponse>>("/purchases/history", {
    params: { page, per_page: perPage }
  });
  return response.data.payload;
}

export const fetchPurchaseStatistics = async (): Promise<any> => {
  const response = await axiosInstance.get<ApiResponse<any>>("/purchases/statistics");
  return response.data.payload;
}
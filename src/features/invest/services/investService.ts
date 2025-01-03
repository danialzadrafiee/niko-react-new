import { ApiResponse } from "@/types/api"
import axiosInstance from "@/utils/axiosInstance"
import { Invest, CreateInvestData } from "@/types/invest"

export const createInvest = async (data: CreateInvestData): Promise<Invest> => {
  const response = await axiosInstance.post<ApiResponse<Invest>>("/invests", data)
  return response.data.payload
}

export const fetchInvest = async (id: number): Promise<Invest> => {
  const response = await axiosInstance.get<ApiResponse<Invest>>(`/invests/${id}`)
  return response.data.payload
}

import { ApiResponse } from "@/types/api";
import axiosInstance from "@/utils/axiosInstance";
import { HomePageData } from "@/types/home";

export const fetchHomePageData = async (): Promise<HomePageData> => {
  const response = await axiosInstance.get<ApiResponse<HomePageData>>("/home");
  return response.data.payload;
};
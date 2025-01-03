import { ApiResponse } from '@/types/api';
import axiosInstance from '@/utils/axiosInstance';

export const sendVerificationCode = async (phone: string): Promise<string> => {
  const response = await axiosInstance.post<ApiResponse<{ code: string }>>('/send-verification-code', { phone });
  return response.data.payload.code;
};

export const verifyCode = async (phone: string, code: string): Promise<boolean> => {
  const response = await axiosInstance.post<ApiResponse<{ isValid: boolean }>>('/verify-code', { phone, code });
  return response.data.payload.isValid;
};
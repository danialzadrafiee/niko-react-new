// src/services/authService.ts

import { AuthResult } from '@/types/auth';
import { ApiResponse } from '@/types/api';
import axiosInstance from '@/utils/axiosInstance';
import { User } from '@/types/user';

export const checkPhone = async (phone: string): Promise<boolean> => {
  const response = await axiosInstance.post<ApiResponse<{ exists: boolean }>>('/check-phone', { phone });
  return response.data.payload.exists;
};

export const signup = async (phone: string, code: string, password: string): Promise<AuthResult> => {
  const response = await axiosInstance.post<ApiResponse<AuthResult>>('/signup', { phone, code, password });
  return response.data.payload;
};

export const login = async (phone: string, password: string): Promise<AuthResult> => {
  const response = await axiosInstance.post<ApiResponse<AuthResult>>('/login', { phone, password });
  return response.data.payload;
};

export const fetchUser = async (): Promise<User> => {
  const response = await axiosInstance.get<ApiResponse<User>>('/user');
  return response.data.payload;
};

export const forgetPassword = async (phone: string): Promise<{ code: string }> => {
  const response = await axiosInstance.post<ApiResponse<{ code: string }>>('/forget-password', { phone });
  return response.data.payload;
};

export const resetPassword = async (phone: string, code: string, newPassword: string): Promise<void> => {
  await axiosInstance.post<ApiResponse<void>>('/reset-password', { phone, code, new_password: newPassword });
};
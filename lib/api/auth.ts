import { apiClient } from './client';
import { ApiResponse, User, LoginPayload, RegisterAgencyPayload, RegisterTrekkerPayload } from '@/types';

export async function login(payload: LoginPayload): Promise<ApiResponse<{ token: string; user: User }>> {
  return apiClient.post('/auth/login', payload);
}

export async function registerAgency(
  payload: RegisterAgencyPayload
): Promise<ApiResponse<{ token: string; user: User }>> {
  return apiClient.post('/auth/register/agency', payload);
}

export async function registerTrekker(
  payload: RegisterTrekkerPayload
): Promise<ApiResponse<{ token: string; user: User }>> {
  return apiClient.post('/auth/register/trekker', payload);
}

export async function verifyOTP(email: string, otp: string): Promise<ApiResponse<{ token: string }>> {
  return apiClient.post('/auth/verify-otp', { email, otp });
}

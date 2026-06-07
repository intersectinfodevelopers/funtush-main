import { apiClient } from './client';
import { TrekPackage, ApiResponse, PaginatedResponse } from '@/types';

export async function getPackages(
  params?: Record<string, any>
): Promise<PaginatedResponse<TrekPackage>> {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/packages?${query}`);
}

export async function getPackageBySlug(slug: string): Promise<ApiResponse<TrekPackage>> {
  return apiClient.get(`/packages/${slug}`);
}

export async function searchPackages(query: string): Promise<TrekPackage[]> {
  return apiClient.get(`/packages/search?q=${query}`);
}

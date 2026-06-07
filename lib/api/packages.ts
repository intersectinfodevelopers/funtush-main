import { apiClient } from './client';
import { TrekPackage, ApiResponse, PaginatedResponse } from '@/types';

export async function getPackages(
  params?: Record<string, string | number | boolean>
): Promise<PaginatedResponse<TrekPackage>> {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });
  }

  const query = queryParams.toString();
  return apiClient.get(`/packages?${query}`);
}

export async function getPackageBySlug(slug: string): Promise<ApiResponse<TrekPackage>> {
  return apiClient.get(`/packages/${slug}`);
}

export async function searchPackages(query: string): Promise<TrekPackage[]> {
  return apiClient.get(`/packages/search?q=${query}`);
}

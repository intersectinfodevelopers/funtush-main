import { apiClient } from './client';
import { Agency, ApiResponse, PaginatedResponse } from '@/types';

export async function getAgencies(
  params?: Record<string, string | number | boolean>
): Promise<PaginatedResponse<Agency>> {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });
  }

  const query = queryParams.toString();
  return apiClient.get(`/agencies?${query}`);
}

export async function getAgencyBySlug(slug: string): Promise<ApiResponse<Agency>> {
  return apiClient.get(`/agencies/${slug}`);
}

export async function searchAgencies(query: string): Promise<Agency[]> {
  return apiClient.get(`/agencies/search?q=${query}`);
}

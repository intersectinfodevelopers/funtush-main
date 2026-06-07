import { apiClient } from './client';
import { Destination, ApiResponse, PaginatedResponse } from '@/types';

export async function getDestinations(
  params?: Record<string, string | number | boolean>
): Promise<PaginatedResponse<Destination>> {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });
  }

  const query = queryParams.toString();
  return apiClient.get(`/destinations?${query}`);
}

export async function getDestinationBySlug(slug: string): Promise<ApiResponse<Destination>> {
  return apiClient.get(`/destinations/${slug}`);
}

import { apiClient } from './client';
import { Destination, ApiResponse, PaginatedResponse } from '@/types';

export async function getDestinations(
  params?: Record<string, any>
): Promise<PaginatedResponse<Destination>> {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/destinations?${query}`);
}

export async function getDestinationBySlug(slug: string): Promise<ApiResponse<Destination>> {
  return apiClient.get(`/destinations/${slug}`);
}

import { apiClient } from './client';
import { Review, ApiResponse } from '@/types';

export async function getReviews(
  packageId: string
): Promise<Review[]> {
  return apiClient.get(`/reviews?package_id=${packageId}`);
}

export async function submitReview(
  data: Omit<Review, 'id' | 'created_at'>
): Promise<ApiResponse<Review>> {
  return apiClient.post('/reviews', data);
}

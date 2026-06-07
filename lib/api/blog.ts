import { apiClient } from './client';
import { BlogPost, ApiResponse, PaginatedResponse } from '@/types';

export async function getBlogPosts(
  params?: Record<string, string | number | boolean>
): Promise<PaginatedResponse<BlogPost>> {
  const query = new URLSearchParams(params).toString();
  return apiClient.get(`/blog?${query}`);
}

export async function getBlogPostBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
  return apiClient.get(`/blog/${slug}`);
}

export async function getRelatedPosts(slug: string, limit: number = 3): Promise<BlogPost[]> {
  return apiClient.get(`/blog/${slug}/related?limit=${limit}`);
}

import { apiClient } from './client';
import { BlogPost, ApiResponse, PaginatedResponse } from '@/types';

export async function getBlogPosts(
  params?: Record<string, string | number | boolean>
): Promise<PaginatedResponse<BlogPost>> {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      queryParams.append(key, String(value));
    });
  }

  const query = queryParams.toString();
  return apiClient.get(`/blog?${query}`);
}

export async function getBlogPostBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
  return apiClient.get(`/blog/${slug}`);
}

export async function getRelatedPosts(slug: string, limit: number = 3): Promise<BlogPost[]> {
  return apiClient.get(`/blog/${slug}/related?limit=${limit}`);
}

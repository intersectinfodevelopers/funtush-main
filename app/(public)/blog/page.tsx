import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { BlogGrid } from '@/components/blog/BlogGrid';
import blogPosts from '@/data/blog.json';
import { BlogPost } from '@/types';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, guides and stories from the mountains.',
};

export default function BlogPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Funtush Blog"
        subtitle="Tips, guides, and stories from the mountains"
      />

      <BlogGrid posts={blogPosts as BlogPost[]} />
    </PageContainer>
  );
}

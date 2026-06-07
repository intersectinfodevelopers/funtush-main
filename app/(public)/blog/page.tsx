import { PageHeader } from '@/components/shared/PageHeader';
import { BlogGrid } from '@/components/blog/BlogGrid';
import blogPosts from '@/data/blog.json';

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <PageHeader
        title="Funtush Blog"
        subtitle="Tips, guides, and stories from the mountains"
      />

      <BlogGrid posts={blogPosts as any} />
    </div>
  );
}

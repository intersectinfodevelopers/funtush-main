import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import blogPosts from '@/data/blog.json';
import { BlogPost } from '@/types/blog';
import { PageHeader } from '@/components/shared/PageHeader';
import { ROUTES } from '@/lib/constants/routes';
import { formatDate, formatReadTime } from '@/lib/utils/format';

type Props = {
  params: {
    slug: string;
  };
};

function getBlogPost(slug: string) {
  return (blogPosts as BlogPost[]).find((post) => post.slug === slug);
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);

  if (!post) {
    return notFound();
  }

  const paragraphs = post.body.split('\n').filter((paragraph) => paragraph.trim().length > 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <PageHeader title={post.title} subtitle={post.excerpt} />

      <div className="rounded-3xl border border-gray-200 overflow-hidden">
        <div className="relative h-80 w-full">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-6 p-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>{post.category}</span>
            <span>•</span>
            <span>{formatDate(post.published_at)}</span>
            <span>•</span>
            <span>{formatReadTime(post.read_time_minutes)}</span>
          </div>

          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-8">
              {paragraph}
            </p>
          ))}

          <div className="border-t border-gray-200 pt-4 text-sm text-gray-600">
            <p>Written by {post.author}</p>
          </div>

          <Link href={ROUTES.BLOG} className="text-blue-600 hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}

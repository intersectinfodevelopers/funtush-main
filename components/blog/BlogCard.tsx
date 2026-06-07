import { BlogPost } from '@/types';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import Image from 'next/image';
import { formatDate, formatReadTime } from '@/lib/utils/format';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={ROUTES.BLOG_POST(post.slug)} className="block">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 uppercase">
              {post.category}
            </span>
            <span className="text-xs text-gray-600">
              {formatDate(post.published_at)}
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-600">{post.author}</span>
            <span className="text-xs text-gray-600">
              {formatReadTime(post.read_time_minutes)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

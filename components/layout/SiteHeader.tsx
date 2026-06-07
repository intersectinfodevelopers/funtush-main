import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={ROUTES.HOME} className="text-2xl font-bold text-blue-600">
          Funtush
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href={ROUTES.EXPLORE} className="text-gray-600 hover:text-gray-900">
            Explore
          </Link>
          <Link href={ROUTES.AGENCIES} className="text-gray-600 hover:text-gray-900">
            Agencies
          </Link>
          <Link href={ROUTES.PRICING} className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link href={ROUTES.BLOG} className="text-gray-600 hover:text-gray-900">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={ROUTES.LOGIN}
            className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-medium"
          >
            Login
          </Link>
          <Link
            href={ROUTES.REGISTER}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

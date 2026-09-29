import Image from 'next/image';
import Link from 'next/link';
import { TrekPackage } from '@/types';
import { ROUTES } from '@/lib/constants/routes';
import { formatPrice, formatDuration } from '@/lib/utils/format';

const DIFFICULTY_STYLE: Record<string, string> = {
  Easy: 'bg-green-100 text-green-800',
  Moderate: 'bg-blue-100 text-blue-800',
  Strenuous: 'bg-orange-100 text-orange-800',
  Extreme: 'bg-red-100 text-red-800',
};

const TIER_LABEL: Record<string, string> = { small: 'Small', medium: 'Medium', large: 'Large' };

export function PackageCard({ pkg }: { pkg: TrekPackage }) {
  const paidTier = pkg.agency_tier && pkg.agency_tier !== 'free' ? pkg.agency_tier : null;

  return (
    <Link
      href={ROUTES.PACKAGE(pkg.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-emerald-100">
        {pkg.image_url ? (
          <Image
            src={pkg.image_url}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-blue-300" aria-hidden>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
              <path d="M3 19l6-10 4 6 2-3 6 7H3z" />
              <circle cx="17" cy="6" r="1.5" />
            </svg>
          </div>
        )}

        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
            DIFFICULTY_STYLE[pkg.difficulty] ?? 'bg-gray-100 text-gray-800'
          }`}
        >
          {pkg.difficulty}
        </span>

        {pkg.sponsored && (
          <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-950 shadow-sm">
            Sponsored
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-gray-900">{pkg.title}</h3>

        {pkg.agency_name && (
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span className="truncate">by {pkg.agency_name}</span>
            {paidTier && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                {TIER_LABEL[paidTier]} partner
              </span>
            )}
          </p>
        )}

        <p className="mt-3 text-sm">
          {pkg.agency_rating ? (
            <span className="text-gray-700">
              <span className="text-orange-400">★</span> {pkg.agency_rating.toFixed(1)}
              <span className="text-gray-400"> · agency rating</span>
            </span>
          ) : (
            <span className="text-gray-400">No reviews yet</span>
          )}
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">From</p>
            <p className="text-lg font-bold text-blue-600">{formatPrice(pkg.price_npr, 'NPR')}</p>
          </div>
          <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700">
            {formatDuration(pkg.duration_days)}
          </span>
        </div>
      </div>
    </Link>
  );
}

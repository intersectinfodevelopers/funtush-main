import { TrekPackage } from '@/types';
import { PackageCard } from './PackageCard';

interface PackageGridProps {
  packages: TrekPackage[];
  loading?: boolean;
  /** Overrides the default empty-state copy. */
  emptyMessage?: string;
}

const GRID = 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3';

export function PackageGrid({ packages, loading, emptyMessage }: PackageGridProps) {
  if (loading) {
    return (
      <div className={GRID}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
        <h3 className="text-lg font-semibold text-gray-900">No treks to show yet</h3>
        <p className="mx-auto mt-2 max-w-md text-gray-600">
          {emptyMessage ?? 'Nothing matches right now. Try clearing your filters, or check back soon as agencies publish new treks.'}
        </p>
      </div>
    );
  }

  return (
    <div className={GRID}>
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}

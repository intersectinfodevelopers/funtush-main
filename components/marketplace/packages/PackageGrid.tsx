import { TrekPackage } from '@/types';
import { PackageCard } from './PackageCard';

interface PackageGridProps {
  packages: TrekPackage[];
  loading?: boolean;
}

export function PackageGrid({ packages, loading }: PackageGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No packages found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}

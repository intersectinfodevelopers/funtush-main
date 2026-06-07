import { PageHeader } from '@/components/shared/PageHeader';
import { PackageGrid } from '@/components/marketplace/packages/PackageGrid';
import { PriceRangeFilter } from '@/components/marketplace/filters/PriceRangeFilter';
import { DestinationFilter } from '@/components/marketplace/filters/DestinationFilter';
import packages from '@/data/packages.json';

export default function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <PageHeader
        title="Explore Treks"
        subtitle="Discover amazing trekking experiences across Nepal"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-4">
          <DestinationFilter />
          <PriceRangeFilter />
        </aside>

        {/* Packages Grid */}
        <div className="lg:col-span-3">
          <PackageGrid packages={packages as any} />
        </div>
      </div>
    </div>
  );
}

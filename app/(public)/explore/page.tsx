import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { PackageGrid } from '@/components/marketplace/packages/PackageGrid';
import { ExploreFilters } from '@/components/marketplace/filters/ExploreFilters';
import { getPackages } from '@/lib/api/marketplace';

export const metadata: Metadata = {
  title: 'Explore Treks',
  description: 'Browse trekking packages from verified agencies across Nepal.',
};

const ALLOWED = ['q', 'difficulty', 'price_max', 'duration_max'] as const;

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const params: Record<string, string | number> = { limit: 50 };
  for (const key of ALLOWED) {
    const v = sp[key];
    if (typeof v === 'string' && v.trim()) params[key] = v.trim();
  }
  const filtered = Object.keys(params).length > 1;

  const { data: packages, total } = await getPackages(params).catch(() => ({ data: [], total: 0 }));

  return (
    <PageContainer>
      <PageHeader title="Explore Treks" subtitle="Discover trekking experiences from verified agencies across Nepal" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <ExploreFilters />
          </div>
        </aside>

        <div className="lg:col-span-3">
          {packages.length > 0 && (
            <p className="mb-5 text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{total}</span> trek{total === 1 ? '' : 's'}
            </p>
          )}
          <PackageGrid
            packages={packages}
            emptyMessage={
              filtered ? 'No treks match these filters. Try widening them or clearing the search.' : undefined
            }
          />
        </div>
      </div>
    </PageContainer>
  );
}

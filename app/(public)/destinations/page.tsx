import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { DestinationGrid } from '@/components/marketplace/destinations/DestinationGrid';
import { getDestinations } from '@/lib/api/marketplace';

export const metadata: Metadata = {
  title: 'Trekking Destinations',
  description: 'Explore trekking regions across Nepal.',
};

export default async function DestinationsPage() {
  const destinations = await getDestinations().catch(() => []);

  return (
    <PageContainer>
      <PageHeader title="Trekking Destinations" subtitle="Explore mountain regions across Nepal" />

      {destinations.length > 0 ? (
        <DestinationGrid destinations={destinations} />
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900">No destinations yet</h3>
          <p className="mx-auto mt-2 max-w-md text-gray-600">
            Destinations appear here once agencies add them to their treks. Check back soon.
          </p>
        </div>
      )}
    </PageContainer>
  );
}

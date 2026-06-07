import { PageHeader } from '@/components/shared/PageHeader';
import { DestinationGrid } from '@/components/marketplace/destinations/DestinationGrid';
import destinations from '@/data/destinations.json';
import { Destination } from '@/types';

export default function DestinationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <PageHeader
        title="Trekking Destinations"
        subtitle="Explore amazing mountain regions across Nepal"
      />

      <DestinationGrid destinations={destinations as Destination[]} />
    </div>
  );
}

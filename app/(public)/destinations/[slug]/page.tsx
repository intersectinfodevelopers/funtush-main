import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import destinations from '@/data/destinations.json';
import packages from '@/data/packages.json';
import { Destination } from '@/types/destination';
import { TrekPackage } from '@/types/package';
import { PageHeader } from '@/components/shared/PageHeader';
import { ROUTES } from '@/lib/constants/routes';
import { PackageCard } from '@/components/marketplace/packages/PackageCard';

type Props = {
  params: {
    slug: string;
  };
};

function getDestination(slug: string) {
  return (destinations as Destination[]).find((destination) => destination.slug === slug);
}

export default function DestinationPage({ params }: Props) {
  const destination = getDestination(params.slug);

  if (!destination) {
    return notFound();
  }

  const relatedPackages = (packages as TrekPackage[]).filter(
    (pkg) => pkg.destination_slug === destination.slug
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <PageHeader title={destination.name} subtitle={destination.description} />

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="relative h-72 overflow-hidden rounded-3xl">
            <Image
              src={destination.image_url}
              alt={destination.name}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="rounded-3xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-3">About {destination.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-600">
              <div>
                <p className="text-sm font-semibold text-gray-900">Region</p>
                <p>{destination.region}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Altitude</p>
                <p>{destination.altitude} meters</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Best season</p>
                <p>{destination.best_season}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-3">Recommended treks</h2>
            {relatedPackages.length > 0 ? (
              <div className="space-y-4">
                {relatedPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No packages available for this destination yet.</p>
            )}
          </div>
        </div>

        <aside className="space-y-4 rounded-3xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold">Quick links</h3>
          <Link href={ROUTES.DESTINATIONS} className="text-blue-600 hover:underline">
            Back to destinations
          </Link>
          <Link href={ROUTES.EXPLORE} className="text-blue-600 hover:underline">
            Browse all packages
          </Link>
        </aside>
      </div>
    </div>
  );
}

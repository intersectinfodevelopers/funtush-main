import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import packages from '@/data/packages.json';
import agencies from '@/data/agencies.json';
import { TrekPackage } from '@/types/package';
import { Agency } from '@/types/agency';
import { PageHeader } from '@/components/shared/PageHeader';
import { RatingStars } from '@/components/shared/RatingStars';
import { ROUTES } from '@/lib/constants/routes';
import { formatPrice } from '@/lib/utils/format';

type Props = {
  params: {
    slug: string;
  };
};

function getPackage(slug: string) {
  return (packages as TrekPackage[]).find((pkg) => pkg.slug === slug);
}

function getAgency(id: string) {
  return (agencies as Agency[]).find((agency) => agency.id === id);
}

export default function PackagePage({ params }: Props) {
  const trekPackage = getPackage(params.slug);

  if (!trekPackage) {
    return notFound();
  }

  const agency = getAgency(trekPackage.agency_id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <PageHeader title={trekPackage.title} subtitle={trekPackage.description} />

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="relative h-72 overflow-hidden rounded-3xl">
            <Image
              src={trekPackage.image_url}
              alt={trekPackage.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-3">Package details</h2>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Destination:</strong> {trekPackage.destination}
                </li>
                <li>
                  <strong>Duration:</strong> {trekPackage.duration_days} days
                </li>
                <li>
                  <strong>Difficulty:</strong> {trekPackage.difficulty}
                </li>
                <li>
                  <strong>Best seasons:</strong> {trekPackage.best_seasons.join(', ')}
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-3">Price</h2>
              <p className="text-3xl font-bold text-blue-600">
                {formatPrice(trekPackage.price_usd)}
              </p>
              <p className="text-sm text-gray-600 mt-2">{trekPackage.review_count} reviews</p>
              <RatingStars rating={trekPackage.rating} />
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold">Itinerary</h2>
            {trekPackage.itinerary.length > 0 ? (
              <div className="space-y-4">
                {trekPackage.itinerary.map((day) => (
                  <div key={day.day} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-gray-500">Day {day.day}</p>
                    <h3 className="font-semibold">{day.title}</h3>
                    <p className="text-gray-600">{day.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Itinerary details will be available soon.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-3">Included</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {trekPackage.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-3">Not included</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {trekPackage.not_included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="space-y-4 rounded-3xl border border-gray-200 p-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Agency</h3>
            {agency ? (
              <>
                <Link href={ROUTES.AGENCY(agency.slug)} className="text-blue-600 hover:underline">
                  {agency.name}
                </Link>
                <p className="text-gray-600 mt-2">{agency.address}</p>
              </>
            ) : (
              <p className="text-gray-600">Agency information unavailable.</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Highlights</h3>
            <p className="text-gray-600">Maximum altitude of {trekPackage.max_altitude} meters.</p>
          </div>
          <Link href={ROUTES.EXPLORE} className="inline-block text-blue-600 hover:underline">
            Back to explore
          </Link>
        </aside>
      </div>
    </div>
  );
}

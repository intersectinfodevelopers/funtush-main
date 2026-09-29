import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getPackageBySlug } from '@/lib/api/marketplace';
import { getVisitorId } from '@/lib/visitor';
import { PageHeader } from '@/components/shared/PageHeader';
import { RatingStars } from '@/components/shared/RatingStars';
import { ROUTES } from '@/lib/constants/routes';
import { formatPrice } from '@/lib/utils/format';
import { PageContainer } from '@/components/shared/PageContainer';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PackagePage({ params }: Props) {
  const { slug } = await params;
  const visitorId = await getVisitorId();
  const trekPackage = await getPackageBySlug(slug, visitorId);

  if (!trekPackage) {
    return notFound();
  }

  return (
    <PageContainer className="max-w-6xl">
      <PageHeader title={trekPackage.title} subtitle={trekPackage.description} />

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="relative h-72 overflow-hidden rounded-3xl bg-gray-100">
            {trekPackage.image_url && (
              <Image
                src={trekPackage.image_url}
                alt={trekPackage.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-3">Package details</h2>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>Destination:</strong> {trekPackage.destination || 'Not specified'}
                </li>
                <li>
                  <strong>Duration:</strong> {trekPackage.duration_days} days
                </li>
                <li>
                  <strong>Difficulty:</strong> {trekPackage.difficulty}
                </li>
                {trekPackage.best_seasons.length > 0 && (
                  <li>
                    <strong>Best seasons:</strong> {trekPackage.best_seasons.join(', ')}
                  </li>
                )}
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-3">Price</h2>
              <p className="text-3xl font-bold text-blue-600">
                {formatPrice(trekPackage.price_npr, 'NPR')}
                <span className="text-base font-normal text-gray-500"> / person</span>
              </p>
              {trekPackage.review_count > 0 && (
                <>
                  <p className="text-sm text-gray-600 mt-2">{trekPackage.review_count} reviews</p>
                  <RatingStars rating={trekPackage.rating} />
                </>
              )}
            </div>
          </div>

          {trekPackage.itinerary.length > 0 && (
            <div className="rounded-3xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold">Itinerary</h2>
              <div className="space-y-4">
                {trekPackage.itinerary.map((day) => (
                  <div key={day.day} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-gray-500">Day {day.day}</p>
                    <h3 className="font-semibold">{day.title}</h3>
                    <p className="text-gray-600">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {trekPackage.departureDates && trekPackage.departureDates.length > 0 && (
            <div className="rounded-3xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-3">Upcoming departures</h2>
              <ul className="space-y-2 text-gray-600">
                {trekPackage.departureDates.map((d) => (
                  <li key={d.id} className="flex items-center justify-between">
                    <span>{new Date(d.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-sm">{d.slotsAvailable} slot{d.slotsAvailable === 1 ? '' : 's'} left</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {trekPackage.addOns && trekPackage.addOns.length > 0 && (
            <div className="rounded-3xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-3">Optional add-ons</h2>
              <ul className="space-y-2 text-gray-600">
                {trekPackage.addOns.map((a) => (
                  <li key={a.id} className="flex items-center justify-between">
                    <span>{a.name}</span>
                    <span className="text-sm">{formatPrice(a.price, 'NPR')}{a.perPerson ? ' / person' : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="space-y-4 rounded-3xl border border-gray-200 p-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Agency</h3>
            {trekPackage.agency_slug && trekPackage.agency_name ? (
              <>
                <Link href={ROUTES.AGENCY(trekPackage.agency_slug)} className="text-blue-600 hover:underline">
                  {trekPackage.agency_name}
                </Link>
                {trekPackage.agency_address && <p className="text-gray-600 mt-2">{trekPackage.agency_address}</p>}
              </>
            ) : (
              <p className="text-gray-600">Agency information unavailable.</p>
            )}
          </div>
          {trekPackage.max_altitude > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Highlights</h3>
              <p className="text-gray-600">Maximum altitude of {trekPackage.max_altitude} meters.</p>
            </div>
          )}
          <Link href={ROUTES.EXPLORE} className="inline-block text-blue-600 hover:underline">
            Back to explore
          </Link>
        </aside>
      </div>
    </PageContainer>
  );
}

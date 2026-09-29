import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getAgencyBySlug } from '@/lib/api/marketplace';
import { PageHeader } from '@/components/shared/PageHeader';
import { RatingStars } from '@/components/shared/RatingStars';
import { ROUTES } from '@/lib/constants/routes';
import { PageContainer } from '@/components/shared/PageContainer';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function AgencyPage({ params }: Props) {
  const { slug } = await params;
  const agency = await getAgencyBySlug(slug);

  if (!agency) {
    return notFound();
  }

  return (
    <PageContainer className="max-w-6xl">
      <PageHeader title={agency.name} subtitle={agency.bio} />

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="relative h-72 overflow-hidden rounded-3xl bg-gray-100">
            {agency.cover_image && (
              <Image
                src={agency.cover_image}
                alt={agency.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-3">Agency details</h2>
              <p className="text-gray-600">{agency.bio || 'No description provided yet.'}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-3">Ratings</h2>
              <RatingStars rating={agency.rating} />
              <p className="text-sm text-gray-600 mt-2">
                {agency.review_count > 0 ? `${agency.review_count} reviews · ` : 'No reviews yet · '}
                {agency.verified ? 'Verified' : 'Unverified'}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold">More information</h2>
            <ul className="space-y-2 text-gray-600">
              {agency.address && (
                <li>
                  <strong>Location:</strong> {agency.address}
                </li>
              )}
              {agency.email && (
                <li>
                  <strong>Email:</strong> {agency.email}
                </li>
              )}
              {agency.phone && (
                <li>
                  <strong>Phone:</strong> {agency.phone}
                </li>
              )}
            </ul>
            {agency.website && (
              <p>
                <Link
                  href={agency.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit agency website
                </Link>
              </p>
            )}
          </div>
        </div>

        <aside className="space-y-4 rounded-3xl border border-gray-200 p-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            {agency.phone && <p className="text-gray-600">{agency.phone}</p>}
            {agency.email && <p className="text-gray-600">{agency.email}</p>}
            {!agency.phone && !agency.email && <p className="text-gray-600">Not published.</p>}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Certifications</h3>
            <ul className="space-y-2 text-gray-600">
              <li>{agency.kyc_verified ? 'KYC verified' : 'KYC pending'}</li>
              <li>{agency.safety_certified ? 'Safety certified' : 'Safety review pending'}</li>
            </ul>
          </div>
          <Link href={ROUTES.AGENCIES} className="inline-block text-blue-600 hover:underline">
            Back to agencies
          </Link>
        </aside>
      </div>
    </PageContainer>
  );
}

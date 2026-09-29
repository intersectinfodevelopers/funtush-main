import type { Metadata } from 'next';
import Link from 'next/link';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { AgencyGrid } from '@/components/marketplace/agencies/AgencyGrid';
import { getAgencies } from '@/lib/api/marketplace';
import { ROUTES } from '@/lib/constants/routes';

export const metadata: Metadata = {
  title: 'Trek Agencies',
  description: 'Verified trekking agencies across Nepal.',
};

export default async function AgenciesPage() {
  const agencies = await getAgencies().catch(() => []);

  return (
    <PageContainer>
      <PageHeader title="Verified Trek Agencies" subtitle="Connect with trusted agencies across Nepal" />

      {agencies.length > 0 ? (
        <AgencyGrid agencies={agencies} />
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900">No agencies listed yet</h3>
          <p className="mx-auto mt-2 max-w-md text-gray-600">
            Verified agencies appear here as they join and activate a plan. Run a trekking agency?
          </p>
          <Link
            href={ROUTES.REGISTER_AGENCY}
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            List your agency
          </Link>
        </div>
      )}
    </PageContainer>
  );
}

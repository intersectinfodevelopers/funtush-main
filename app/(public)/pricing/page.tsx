import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { PricingTiers } from '@/components/pricing/PricingTiers';
import { getSubscriptionTiers } from '@/lib/api/marketplace';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Plans for trekking agencies — choose the tier that fits your business.',
};

export default async function PricingPage() {
  const tiers = await getSubscriptionTiers().catch(() => []);

  return (
    <PageContainer>
      <PageHeader title="Simple, Transparent Pricing" subtitle="Choose the plan that fits your agency. Higher tiers get more visibility in the marketplace." />

      {tiers.length > 0 ? (
        <PricingTiers tiers={tiers} />
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Pricing is temporarily unavailable</h3>
          <p className="mt-2 text-gray-600">Please check back in a moment.</p>
        </div>
      )}
    </PageContainer>
  );
}

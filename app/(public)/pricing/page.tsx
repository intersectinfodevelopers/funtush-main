import { PageHeader } from '@/components/shared/PageHeader';

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <PageHeader
        title="Simple, Transparent Pricing"
        subtitle="Choose the perfect plan for your agency"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold">Free</h3>
          <div className="text-3xl font-bold">$0</div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ Up to 5 listings</li>
            <li>✓ Basic analytics</li>
            <li>✗ Verified badge</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

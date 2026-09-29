import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Funtush — a marketplace for trekking agencies in Nepal.',
};

export default function AboutPage() {
  return (
    <PageContainer narrow>
      <PageHeader
        title="About Funtush"
        subtitle="Making trekking adventures accessible to everyone"
      />

      <div className="prose max-w-none space-y-6">
        <p className="text-lg text-gray-700">
          Funtush is a marketplace connecting trekkers with authentic, verified trekking agencies across Nepal.
        </p>
        <p className="text-gray-700">
          Our mission is to make it easy for adventure seekers to book the perfect trek while supporting local agencies.
        </p>
      </div>
    </PageContainer>
  );
}

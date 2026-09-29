import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of Funtush.',
};

export default function TermsPage() {
  return (
    <PageContainer narrow>
      <PageHeader title="Terms of Service" />
      <div className="prose max-w-none space-y-6">
        <p>
          These Terms of Service govern your use of Funtush and its services.
        </p>
        {/* Add more terms content */}
      </div>
    </PageContainer>
  );
}

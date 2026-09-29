import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Funtush collects, uses and protects your information.',
};

export default function PrivacyPage() {
  return (
    <PageContainer narrow>
      <PageHeader title="Privacy Policy" />
      <div className="prose max-w-none space-y-6">
        <p>
          This Privacy Policy explains how Funtush collects, uses, and protects your information.
        </p>
        {/* Add more privacy policy content */}
      </div>
    </PageContainer>
  );
}

import type { Metadata } from 'next';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Funtush team.',
};

const whatsappDigits = siteConfig.social.whatsapp.replace(/\D/g, '');

const channels = [
  { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
  { label: 'WhatsApp', value: siteConfig.social.whatsapp, href: `https://wa.me/${whatsappDigits}` },
];

export default function ContactPage() {
  return (
    <PageContainer narrow>
      <PageHeader title="Contact Us" subtitle="Questions about trekking or listing your agency? Reach us directly." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{c.label}</p>
            <p className="mt-2 break-words font-semibold text-gray-900">{c.value}</p>
          </a>
        ))}
      </div>
    </PageContainer>
  );
}

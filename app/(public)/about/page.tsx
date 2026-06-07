import { PageHeader } from '@/components/shared/PageHeader';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
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
    </div>
  );
}

import { PageHeader } from '@/components/shared/PageHeader';
import { AgencyGrid } from '@/components/marketplace/agencies/AgencyGrid';
import agencies from '@/data/agencies.json';
import { Agency } from '@/types';

export default function AgenciesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <PageHeader
        title="Verified Trek Agencies"
        subtitle="Connect with trusted agencies across Nepal"
      />

      <AgencyGrid agencies={agencies as Agency[]} />
    </div>
  );
}

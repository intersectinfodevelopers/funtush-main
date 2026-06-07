import { Agency } from '@/types';
import { AgencyCard } from './AgencyCard';

interface AgencyGridProps {
  agencies: Agency[];
  loading?: boolean;
}

export function AgencyGrid({ agencies, loading }: AgencyGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agencies.map((agency) => (
        <AgencyCard key={agency.id} agency={agency} />
      ))}
    </div>
  );
}

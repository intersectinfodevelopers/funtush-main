import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Agency } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { RatingStars } from '@/components/shared/RatingStars';
import { TierBadge } from './TierBadge';

export function AgencyCard({ agency }: { agency: Agency }) {
  return (
    <Link href={ROUTES.AGENCY(agency.slug)}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-40 w-full">
          <Image
            src={agency.cover_image}
            alt={agency.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{agency.name}</h3>
              <TierBadge tier={agency.tier} />
            </div>
            {agency.verified && (
              <Badge variant="success">Verified</Badge>
            )}
          </div>

          <div className="flex justify-between items-center">
            <RatingStars rating={agency.rating} />
            <span className="text-sm text-gray-600">
              {agency.review_count} reviews
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrekPackage } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { formatPrice } from '@/lib/utils/format';
import { RatingStars } from '@/components/shared/RatingStars';

export function PackageCard({ pkg }: { pkg: TrekPackage }) {
  return (
    <Link href={ROUTES.PACKAGE(pkg.slug)}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={pkg.image_url}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <Badge className="absolute top-3 left-3">{pkg.difficulty}</Badge>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {pkg.title}
          </h3>

          <div className="flex justify-between items-center">
            <RatingStars rating={pkg.rating} />
            <span className="text-sm text-gray-600">
              {pkg.review_count} reviews
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-blue-600">
              {formatPrice(pkg.price_usd)}
            </span>
            <span className="text-sm text-gray-600">
              {pkg.duration_days} days
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

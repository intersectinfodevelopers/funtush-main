import Image from 'next/image';
import { Destination } from '@/types';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={ROUTES.DESTINATION(destination.slug)}>
      <div className="relative h-48 rounded-lg overflow-hidden group cursor-pointer">
        <Image
          src={destination.image_url}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white text-xl font-semibold">
            {destination.name}
          </h3>
          <p className="text-gray-300 text-sm">
            {destination.package_count} treks
          </p>
        </div>
      </div>
    </Link>
  );
}

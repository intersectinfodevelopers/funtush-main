import { Card, CardContent } from '@/components/ui/Card';
import { Rating } from '@/components/shared/RatingStars';

interface ReviewCardProps {
  name: string;
  country: string;
  rating: number;
  text: string;
  verified?: boolean;
}

export function ReviewCard({
  name,
  country,
  rating,
  text,
  verified,
}: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{country}</p>
          </div>
          {verified && (
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
              Verified
            </span>
          )}
        </div>
        <Rating rating={rating} />
        <p className="text-gray-700">{text}</p>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader } from '@/components/ui/Card';

interface TierCardProps {
  name: string;
  price: number;
  currency: 'USD' | 'NPR';
  features: string[];
  highlighted?: boolean;
  onSelect?: () => void;
}

export function TierSelectCard({
  name,
  price,
  currency,
  features,
  highlighted,
  onSelect,
}: TierCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all ${
        highlighted ? 'ring-2 ring-blue-600 shadow-lg' : ''
      }`}
      onClick={onSelect}
    >
      <CardHeader>
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold text-gray-900">
          {currency === 'USD' ? '$' : 'Rs'}{price}
          <span className="text-sm text-gray-600 font-normal">/month</span>
        </div>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-gray-700"
            >
              <span className="text-green-600">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

import { TIERS } from '@/lib/constants/tiers';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function PricingCardsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {Object.values(TIERS).map((tier) => (
        <Card
          key={tier.id}
          className="flex flex-col"
        >
          <CardHeader>
            <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{tier.description}</p>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                ${tier.price_monthly_usd}
              </div>
              <p className="text-sm text-gray-600">/month</p>
            </div>

            <ul className="space-y-2">
              {tier.features.slice(0, 3).map((feature, idx) => (
                <li
                  key={idx}
                  className={`text-sm ${
                    feature.included
                      ? 'text-green-600'
                      : 'text-gray-400 line-through'
                  }`}
                >
                  {feature.included ? '✓' : '✗'} {feature.name}
                </li>
              ))}
            </ul>

            <Button className="w-full mt-4">Get Started</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

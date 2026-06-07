'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export function PriceRangeFilter() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Price Range</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="number" placeholder="Min price (USD)" />
        <Input type="number" placeholder="Max price (USD)" />
      </CardContent>
    </Card>
  );
}

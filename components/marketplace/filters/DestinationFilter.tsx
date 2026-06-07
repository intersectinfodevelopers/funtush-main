'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export function DestinationFilter() {
  const [selected, setSelected] = useState<string[]>([]);

  const destinations = [
    'Everest Region',
    'Annapurna Region',
    'Langtang Region',
    'Mustang Region',
  ];

  const handleToggle = (dest: string) => {
    setSelected((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Destinations</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {destinations.map((dest) => (
          <label key={dest} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(dest)}
              onChange={() => handleToggle(dest)}
              className="w-4 h-4"
            />
            <span className="text-gray-700">{dest}</span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}

'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export function DifficultyFilter() {
  const difficulties = ['Easy', 'Moderate', 'Strenuous', 'Extreme'];

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Difficulty</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {difficulties.map((diff) => (
          <label key={diff} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="difficulty"
              value={diff}
              className="w-4 h-4"
            />
            <span className="text-gray-700">{diff}</span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';

interface BillingToggleProps {
  onToggle?: (period: 'monthly' | 'annual') => void;
}

export function BillingToggle({ onToggle }: BillingToggleProps) {
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');

  const handleToggle = (newPeriod: 'monthly' | 'annual') => {
    setPeriod(newPeriod);
    onToggle?.(newPeriod);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleToggle('monthly')}
        className={`px-4 py-2 rounded font-medium transition-colors ${
          period === 'monthly'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => handleToggle('annual')}
        className={`px-4 py-2 rounded font-medium transition-colors ${
          period === 'annual'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        Annual
      </button>
      {period === 'annual' && (
        <span className="text-green-600 font-semibold">Save 20%</span>
      )}
    </div>
  );
}

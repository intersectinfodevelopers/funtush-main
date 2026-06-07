'use client';

import { useState, useCallback } from 'react';

export function useBillingToggle(
  initialPeriod: 'monthly' | 'annual' = 'monthly'
) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>(
    initialPeriod
  );

  const toggleBilling = useCallback(() => {
    setBillingPeriod((prev) => (prev === 'monthly' ? 'annual' : 'monthly'));
  }, []);

  const discount = billingPeriod === 'annual' ? 0.2 : 0; // 20% discount on annual

  return {
    billingPeriod,
    toggleBilling,
    discount,
    discountLabel: billingPeriod === 'annual' ? 'Save 20%' : null,
  };
}

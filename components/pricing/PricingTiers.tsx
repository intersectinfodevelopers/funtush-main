'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import type { SubscriptionTierInfo } from '@/lib/api/marketplace';

function usd(value: number) {
  return `$${Number.isInteger(value) ? value : value.toFixed(2)}`;
}

function annualSavingsPct(monthly: number, annual: number | null) {
  if (annual === null || monthly <= 0) return 0;
  const pct = Math.round((1 - annual / (monthly * 12)) * 100);
  return pct > 0 ? pct : 0;
}

function features(t: SubscriptionTierInfo): Array<{ label: string; included: boolean }> {
  const list: Array<{ label: string; included: boolean }> = [];
  list.push({ label: `${t.maxStaff} staff account${t.maxStaff === 1 ? '' : 's'}`, included: true });
  list.push({ label: `${t.maxGuides} guide${t.maxGuides === 1 ? '' : 's'}`, included: true });
  list.push({
    label: t.maxBookingsPerMonth === null ? 'Unlimited bookings' : `${t.maxBookingsPerMonth} bookings / month`,
    included: true,
  });
  list.push({ label: 'Priority placement in marketplace search', included: t.marketplaceWeight > 0 });
  list.push({ label: 'Paid ad campaigns', included: t.adsEnabled });
  list.push({ label: 'Analytics', included: t.analyticsEnabled });
  list.push({ label: 'Blog', included: t.blogEnabled });
  list.push({ label: 'Custom domain', included: t.customDomainEnabled });
  list.push({ label: 'Full white-label site', included: t.whiteLabelComplete });
  list.push({ label: 'API access', included: t.apiAccessEnabled });
  list.push({ label: 'Priority support', included: t.prioritySupportEnabled });
  return list;
}

export function PricingTiers({ tiers }: { tiers: SubscriptionTierInfo[] }) {
  const anyAnnual = tiers.some((t) => t.annualPrice !== null);
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const annual = period === 'annual';

  return (
    <div>
      {anyAnnual && (
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-xl bg-gray-100 p-1" role="group" aria-label="Billing period">
            {(['monthly', 'annual'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                aria-pressed={period === p}
                className={`rounded-lg px-6 py-2 text-sm font-semibold capitalize transition-colors ${
                  period === p ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {p === 'annual' ? 'Yearly' : 'Monthly'}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {tiers.map((t) => {
          const monthly = Number(t.monthlyPrice);
          const annualPrice = t.annualPrice === null ? null : Number(t.annualPrice);
          const showAnnual = annual && annualPrice !== null;
          const savings = annualSavingsPct(monthly, annualPrice);
          const isFree = monthly === 0;

          return (
            <div key={t.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
              <h3 className="text-xl font-bold capitalize text-gray-900">{t.name.toLowerCase()}</h3>

              <div className="mt-5">
                <p className="text-4xl font-extrabold tracking-tight text-gray-900">
                  {isFree ? '$0' : usd(showAnnual ? (annualPrice as number) : monthly)}
                  {!isFree && (
                    <span className="text-base font-medium text-gray-500">{showAnnual ? ' /year' : ' /month'}</span>
                  )}
                </p>
                <p className="mt-2 min-h-10 text-sm text-gray-500">
                  {annual && !isFree && annualPrice === null && 'Yearly price not available — billed monthly'}
                  {showAnnual && savings > 0 && (
                    <span className="font-semibold text-green-600">Save {savings}% vs monthly</span>
                  )}
                  {t.trialDays > 0 && !annual && `${t.trialDays}-day free trial`}
                </p>
              </div>

              <Link
                href={ROUTES.REGISTER_AGENCY}
                className="mt-6 block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {isFree ? 'Get started' : t.trialDays > 0 ? 'Start free trial' : 'Get started'}
              </Link>

              <ul className="mt-6 flex-1 space-y-3 border-t border-gray-100 pt-6">
                {features(t).map((f) => (
                  <li
                    key={f.label}
                    className={`flex items-start gap-3 text-sm ${f.included ? 'text-gray-700' : 'text-gray-400 line-through'}`}
                  >
                    <span className={f.included ? 'text-green-600' : 'text-gray-300'} aria-hidden>
                      {f.included ? '✓' : '✗'}
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

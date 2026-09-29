'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const DIFFICULTIES = [
  { value: 'EASY', label: 'Easy' },
  { value: 'MODERATE', label: 'Moderate' },
  { value: 'CHALLENGING', label: 'Strenuous' },
  { value: 'DIFFICULT', label: 'Extreme' },
];

const DURATIONS = [
  { value: '5', label: 'Up to 5 days' },
  { value: '10', label: 'Up to 10 days' },
  { value: '15', label: 'Up to 15 days' },
];

const fieldCls =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100';
const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500';

/**
 * Filters live in the URL (`/explore?q=…&difficulty=…`) so results are
 * shareable and the server page fetches the real, filtered search results.
 */
export function ExploreFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const [priceMax, setPriceMax] = useState(params.get('price_max') ?? '');
  // Collapsed by default on mobile so the full 4-field form doesn't push
  // every result below the fold; always shown on desktop (lg:) regardless.
  const [open, setOpen] = useState(false);

  const activeCount = ['q', 'difficulty', 'price_max', 'duration_max'].filter((k) => params.get(k)).length;
  const hasFilters = activeCount > 0;

  function apply(next: Record<string, string>) {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    router.push(`/explore${sp.toString() ? `?${sp}` : ''}`);
    setOpen(false);
  }

  return (
    <form
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        apply({ q: q.trim(), price_max: priceMax });
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left lg:hidden"
        aria-expanded={open}
        aria-controls="explore-filter-fields"
      >
        <span className="text-sm font-semibold text-gray-900">
          Filters{activeCount > 0 && <span className="ml-1.5 text-blue-600">({activeCount})</span>}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div id="explore-filter-fields" className={`space-y-5 ${open ? 'mt-5 block' : 'hidden'} lg:mt-0 lg:block`}>
      <div>
        <label htmlFor="q" className={labelCls}>
          Search
        </label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Everest, Langtang…" className={fieldCls} />
      </div>

      <div>
        <label htmlFor="difficulty" className={labelCls}>
          Difficulty
        </label>
        <select
          id="difficulty"
          value={params.get('difficulty') ?? ''}
          onChange={(e) => apply({ difficulty: e.target.value })}
          className={fieldCls}
        >
          <option value="">Any level</option>
          {DIFFICULTIES.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="duration" className={labelCls}>
          Duration
        </label>
        <select
          id="duration"
          value={params.get('duration_max') ?? ''}
          onChange={(e) => apply({ duration_max: e.target.value })}
          className={fieldCls}
        >
          <option value="">Any length</option>
          {DURATIONS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="price_max" className={labelCls}>
          Max price (Rs)
        </label>
        <input
          id="price_max"
          type="number"
          min={0}
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          placeholder="e.g. 50000"
          className={fieldCls}
        />
      </div>

      <div className="flex gap-3">
        <button type="submit" className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
          Apply
        </button>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQ('');
              setPriceMax('');
              router.push('/explore');
              setOpen(false);
            }}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </div>
      </div>
    </form>
  );
}

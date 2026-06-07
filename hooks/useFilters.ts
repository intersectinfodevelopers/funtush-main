'use client';

import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterOptions } from '@/lib/utils/search';

export function useFilters() {
  const searchParams = useSearchParams();

  const filters = useMemo<FilterOptions>(() => {
    const newFilters: FilterOptions = {};

    if (searchParams.has('destinations')) {
      newFilters.destinations = searchParams.get('destinations')?.split(',');
    }

    if (searchParams.has('difficulty')) {
      newFilters.difficulty = searchParams.get('difficulty') || undefined;
    }

    if (searchParams.has('minPrice')) {
      newFilters.minPrice = Number(searchParams.get('minPrice'));
    }

    if (searchParams.has('maxPrice')) {
      newFilters.maxPrice = Number(searchParams.get('maxPrice'));
    }

    if (searchParams.has('minRating')) {
      newFilters.minRating = Number(searchParams.get('minRating'));
    }

    return newFilters;
  }, [searchParams]);

  const updateFilter = useCallback(
    (_key: keyof FilterOptions, _value: FilterOptions[keyof FilterOptions]) => {
      // Derived from search params for now; update logic belongs in the consumer.
      void _key;
      void _value;
      return;
    },
    []
  );

  const clearFilters = useCallback(() => {
    // Clear logic belongs in the consumer.
    return;
  }, []);

  return {
    filters,
    updateFilter,
    clearFilters,
  };
}

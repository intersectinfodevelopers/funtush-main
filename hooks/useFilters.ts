'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterOptions } from '@/lib/utils/search';

export function useFilters() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => {
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

    setFilters(newFilters);
  }, [searchParams]);

  const updateFilter = useCallback(
    (key: keyof FilterOptions, value: any) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    filters,
    updateFilter,
    clearFilters,
  };
}

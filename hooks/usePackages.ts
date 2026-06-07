'use client';

import { useState, useCallback } from 'react';
import { TrekPackage } from '@/types';
import { filterPackages, sortPackages, FilterOptions, SortOption } from '@/lib/utils/search';

export function usePackages(initialPackages: TrekPackage[]) {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSort] = useState<SortOption>({ field: 'recommended', order: 'desc' });

  const filteredPackages = filterPackages(initialPackages, filters);
  const sortedPackages = sortPackages(filteredPackages, sort);

  const updateFilters = useCallback((newFilters: FilterOptions) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    packages: sortedPackages,
    filters,
    sort,
    updateFilters,
    resetFilters,
    setSort,
  };
}

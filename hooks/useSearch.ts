'use client';

import { useState, useCallback } from 'react';

export function useSearch(initialQuery: string = '') {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    setQuery: handleSearch,
    clearSearch,
    isLoading,
    setIsLoading,
  };
}

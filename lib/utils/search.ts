import { TrekPackage } from '@/types';

export interface FilterOptions {
  destinations?: string[];
  difficulty?: string;
  minDuration?: number;
  maxDuration?: number;
  minPrice?: number;
  maxPrice?: number;
  seasons?: string[];
  minRating?: number;
}

export interface SortOption {
  field: 'recommended' | 'price' | 'rating' | 'newest';
  order: 'asc' | 'desc';
}

export function filterPackages(
  packages: TrekPackage[],
  filters: FilterOptions
): TrekPackage[] {
  return packages.filter((pkg) => {
    if (filters.destinations?.length && !filters.destinations.includes(pkg.destination_slug)) {
      return false;
    }

    if (filters.difficulty && pkg.difficulty !== filters.difficulty) {
      return false;
    }

    if (filters.minDuration && pkg.duration_days < filters.minDuration) {
      return false;
    }

    if (filters.maxDuration && pkg.duration_days > filters.maxDuration) {
      return false;
    }

    if (filters.minPrice && pkg.price_usd < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice && pkg.price_usd > filters.maxPrice) {
      return false;
    }

    if (filters.minRating && pkg.rating < filters.minRating) {
      return false;
    }

    if (filters.seasons?.length) {
      const hasMatchingSeason = pkg.best_seasons.some((s) =>
        filters.seasons?.includes(s)
      );
      if (!hasMatchingSeason) {
        return false;
      }
    }

    return true;
  });
}

export function sortPackages(
  packages: TrekPackage[],
  sort: SortOption
): TrekPackage[] {
  const sorted = [...packages];

  sorted.sort((a, b) => {
    switch (sort.field) {
      case 'price':
        return sort.order === 'asc'
          ? a.price_usd - b.price_usd
          : b.price_usd - a.price_usd;
      case 'rating':
        return sort.order === 'asc'
          ? a.rating - b.rating
          : b.rating - a.rating;
      case 'newest':
        return sort.order === 'asc' ? 0 : 0; // Would need createdAt field
      default:
        return 0;
    }
  });

  return sorted;
}

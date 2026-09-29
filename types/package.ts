export type Difficulty = 'Easy' | 'Moderate' | 'Strenuous' | 'Extreme';
export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export interface TrekPackage {
  id: string;
  agency_id: string;
  title: string;
  slug: string;
  description: string;
  destination: string;
  destination_slug: string;
  duration_days: number;
  difficulty: Difficulty;
  best_seasons: Season[];
  /** Real prices on this platform are NPR-denominated; there is no USD price. */
  price_usd: number;
  price_npr: number;
  max_altitude: number;
  rating: number;
  review_count: number;
  image_url: string;
  gallery: string[];
  itinerary: ItineraryDay[];
  /** No "included/not included" field exists on a real package — empty unless mock data supplies it. */
  included: string[];
  not_included: string[];
  addOns?: { id: string; name: string; price: number; perPerson: boolean }[];
  departureDates?: { id: string; startDate: string; slotsAvailable: number }[];
  agency_name?: string;
  agency_slug?: string;
  agency_address?: string;
  /** Paid tier of the agency behind this package — drives placement/labels. */
  agency_tier?: 'free' | 'small' | 'medium' | 'large';
  /** True when this listing is boosted by the agency's tier or an approved ad campaign. */
  sponsored?: boolean;
  /** The AGENCY's average rating (packages don't carry their own rating in search results). */
  agency_rating?: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude: number;
  walking_hours?: number;
}

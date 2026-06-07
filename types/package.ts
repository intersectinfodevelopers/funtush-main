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
  price_usd: number;
  price_npr: number;
  max_altitude: number;
  rating: number;
  review_count: number;
  image_url: string;
  gallery: string[];
  itinerary: ItineraryDay[];
  included: string[];
  not_included: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude: number;
  walking_hours: number;
}

export interface Review {
  id: string;
  package_id: string;
  agency_id: string;
  trekker_name: string;
  country: string;
  rating: number;
  text: string;
  created_at: string;
  verified: boolean;
}

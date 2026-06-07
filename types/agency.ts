export type VerificationStatus = 'unverified' | 'kyc_pending' | 'kyc_verified' | 'safety_certified';
export type TierType = 'free' | 'small' | 'medium' | 'large';

export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  cover_image: string;
  bio: string;
  tier: TierType;
  rating: number;
  review_count: number;
  verified: boolean;
  kyc_verified: boolean;
  safety_certified: boolean;
  phone: string;
  whatsapp: string;
  email: string;
  website?: string;
  address: string;
  established_year: number;
}

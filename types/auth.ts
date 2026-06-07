import { TierType } from './agency';

export interface LoginPayload {
  email: string;
  password: string;
  role: 'trekker' | 'agency';
}

export interface RegisterAgencyPayload {
  company_name: string;
  email: string;
  password: string;
  tier: TierType;
  billing_period: 'monthly' | 'annual';
}

export interface RegisterTrekkerPayload {
  name: string;
  email: string;
  password: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  role: 'trekker' | 'agency';
  agency_id?: string;
  created_at: string;
}

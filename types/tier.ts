import { TierType } from './agency';

export interface TierDefinition {
  id: TierType;
  name: string;
  price_monthly_usd: number;
  price_annual_usd: number;
  price_monthly_npr: number;
  price_annual_npr: number;
  description: string;
  color: string;
  features: TierFeature[];
}

export interface TierFeature {
  name: string;
  included: boolean;
}

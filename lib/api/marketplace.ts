import { apiClient } from './client';
import type { TrekPackage, Difficulty, Season } from '@/types/package';
import type { Agency, TierType } from '@/types/agency';
import type { Destination } from '@/types/destination';

/**
 * Real backend (apps/api) → this app's existing mock shapes. Every existing
 * component (PackageCard, PackageGrid, the detail pages) keeps working
 * unchanged; only the data source moves from `data/*.json` to these adapters.
 */

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

const DIFFICULTY_MAP: Record<string, Difficulty> = {
  EASY: 'Easy',
  MODERATE: 'Moderate',
  CHALLENGING: 'Strenuous',
  DIFFICULT: 'Extreme',
};

const SEASON_WORDS: Season[] = ['Spring', 'Summer', 'Autumn', 'Winter'];
function toSeasons(raw: (string | null)[] | string | null | undefined): Season[] {
  const text = (Array.isArray(raw) ? raw.join(' ') : raw ?? '').toLowerCase();
  return SEASON_WORDS.filter((s) => text.includes(s.toLowerCase()));
}

const TIER_MAP: Record<string, TierType> = { FREE: 'free', SMALL: 'small', MEDIUM: 'medium', LARGE: 'large' };

/* ── Packages ─────────────────────────────────────────────────────────────── */

interface RealPackageDocument {
  id: string;
  agencyId: string;
  agencyName?: string;
  agencySlug?: string;
  tier?: string;
  sponsored?: boolean;
  agencyRating?: number;
  title: string;
  slug: string;
  description: string;
  destination: string[];
  season: string[];
  difficulty: string;
  price: number;
  duration: number;
  altitude: number;
  photos: string[];
}

interface RealCuratedPackage {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  durationDays: number;
  pricePerPerson: number;
  difficulty: string;
  photos: string[];
  destinations: string[];
  agency: { id: string; name: string; slug: string; tier: string; sponsored: boolean };
}

function fromSearchDoc(p: RealPackageDocument): TrekPackage {
  return {
    id: p.id,
    agency_id: p.agencyId,
    title: p.title,
    slug: p.slug,
    description: p.description,
    destination: p.destination[0] ?? '',
    destination_slug: p.destination[0] ? slugify(p.destination[0]) : '',
    duration_days: p.duration,
    difficulty: DIFFICULTY_MAP[p.difficulty] ?? 'Moderate',
    best_seasons: toSeasons(p.season),
    price_usd: p.price,
    price_npr: p.price,
    max_altitude: p.altitude,
    rating: 0,
    review_count: 0,
    image_url: p.photos[0] ?? '',
    gallery: p.photos,
    itinerary: [],
    included: [],
    not_included: [],
    agency_name: p.agencyName,
    agency_slug: p.agencySlug,
    agency_tier: p.tier ? TIER_MAP[p.tier] : undefined,
    sponsored: p.sponsored ?? false,
    agency_rating: p.agencyRating && p.agencyRating > 0 ? p.agencyRating : undefined,
  };
}

function fromCurated(p: RealCuratedPackage): TrekPackage {
  return {
    id: p.id,
    agency_id: p.agency.id,
    title: p.title,
    slug: p.slug,
    description: p.description ?? '',
    destination: p.destinations[0] ?? '',
    destination_slug: p.destinations[0] ? slugify(p.destinations[0]) : '',
    duration_days: p.durationDays,
    difficulty: DIFFICULTY_MAP[p.difficulty] ?? 'Moderate',
    best_seasons: [],
    price_usd: p.pricePerPerson,
    price_npr: p.pricePerPerson,
    max_altitude: 0,
    rating: 0,
    review_count: 0,
    image_url: p.photos[0] ?? '',
    gallery: p.photos,
    itinerary: [],
    included: [],
    not_included: [],
    agency_name: p.agency.name,
    agency_slug: p.agency.slug,
    agency_tier: TIER_MAP[p.agency.tier],
    sponsored: p.agency.sponsored,
  };
}

export async function getPackages(params?: Record<string, string | number>): Promise<{ data: TrekPackage[]; total: number }> {
  const qs = new URLSearchParams();
  if (params) for (const [k, v] of Object.entries(params)) qs.set(k, String(v));
  const res = await apiClient.get<{ success: boolean; data: RealPackageDocument[]; meta: { total: number } }>(
    `/marketplace/packages?${qs.toString()}`
  );
  return { data: res.data.map(fromSearchDoc), total: res.meta.total };
}

export interface FeaturedSections {
  sponsored: TrekPackage[];
  topRated: TrekPackage[];
  mostBookedThisMonth: TrekPackage[];
}

export async function getFeatured(): Promise<FeaturedSections> {
  const res = await apiClient.get<{ success: boolean; data: { sponsored: RealCuratedPackage[]; topRated: RealCuratedPackage[]; mostBookedThisMonth: RealCuratedPackage[] } }>('/marketplace/featured');
  return {
    sponsored: res.data.sponsored.map(fromCurated),
    topRated: res.data.topRated.map(fromCurated),
    mostBookedThisMonth: res.data.mostBookedThisMonth.map(fromCurated),
  };
}

export interface Recommendation extends TrekPackage {
  reason: string;
}

export async function getRecommendations(visitorId?: string): Promise<{ personalized: boolean; data: Recommendation[] }> {
  const headers = visitorId ? { 'x-visitor-id': visitorId } : undefined;
  const res = await apiClient.get<{ success: boolean; personalized: boolean; data: (RealCuratedPackage & { reason: string })[] }>(
    '/marketplace/recommendations',
    headers
  );
  return { personalized: res.personalized, data: res.data.map((p) => ({ ...fromCurated(p), reason: p.reason })) };
}

interface RealPackageDetail {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  durationDays: number;
  pricePerPerson: number;
  difficulty: string;
  photos: string[];
  destination: string | null;
  destinations: { name: string; altitudeM: number | null; bestSeason: string | null }[];
  itinerary: { dayNumber: number; description: string | null; location: string | null; altitudeM: number | null }[];
  departureDates: { id: string; startDate: string; slotsAvailable: number }[];
  addOns: { id: string; name: string; price: number; perPerson: boolean }[];
  agency: { id: string; name: string; slug: string; tier: string; logo: string | null; address: string | null; sponsored: boolean; rating: { average: number | null; count: number } };
}

export async function getPackageBySlug(slug: string, visitorId?: string): Promise<TrekPackage | null> {
  const headers = visitorId ? { 'x-visitor-id': visitorId } : undefined;
  try {
    const res = await apiClient.get<{ success: boolean; data: RealPackageDetail }>(`/marketplace/packages/${slug}`, headers);
    const p = res.data;
    const altitudes = p.destinations.map((d) => d.altitudeM ?? 0);
    return {
      id: p.id,
      agency_id: p.agency.id,
      title: p.title,
      slug: p.slug,
      description: p.description ?? '',
      destination: p.destination ?? p.destinations[0]?.name ?? '',
      destination_slug: slugify(p.destination ?? p.destinations[0]?.name ?? ''),
      duration_days: p.durationDays,
      difficulty: DIFFICULTY_MAP[p.difficulty] ?? 'Moderate',
      best_seasons: toSeasons(p.destinations.map((d) => d.bestSeason)),
      price_usd: p.pricePerPerson,
      price_npr: p.pricePerPerson,
      max_altitude: altitudes.length ? Math.max(...altitudes) : 0,
      rating: p.agency.rating.average ?? 0,
      review_count: p.agency.rating.count,
      image_url: p.photos[0] ?? '',
      gallery: p.photos,
      itinerary: p.itinerary.map((day) => ({
        day: day.dayNumber,
        title: day.location ? `Day ${day.dayNumber}: ${day.location}` : `Day ${day.dayNumber}`,
        description: day.description ?? '',
        altitude: day.altitudeM ?? 0,
      })),
      included: [],
      not_included: [],
      addOns: p.addOns,
      departureDates: p.departureDates,
      agency_name: p.agency.name,
      agency_slug: p.agency.slug,
      agency_address: p.agency.address ?? undefined,
    };
  } catch {
    return null;
  }
}

/* ── Agencies ─────────────────────────────────────────────────────────────── */

interface RealAgencyProfile {
  id: string;
  name: string;
  slug: string;
  tier: string;
  memberSince: string;
  badges: string[];
  profile: { logo: string | null; description: string | null; address: string | null; phone: unknown; email: unknown; regions: unknown } | null;
  rating: { average: number | null; count: number };
}

export async function getAgencyBySlug(slug: string): Promise<Agency | null> {
  try {
    const res = await apiClient.get<{ success: boolean; data: RealAgencyProfile }>(`/marketplace/agencies/${slug}`);
    const a = res.data;
    const p = a.profile;
    const firstOf = (v: unknown): string => (Array.isArray(v) ? String(v[0] ?? '') : typeof v === 'string' ? v : '');
    return {
      id: a.id,
      name: a.name,
      slug: a.slug,
      logo_url: p?.logo ?? '',
      cover_image: p?.logo ?? '',
      bio: p?.description ?? '',
      tier: TIER_MAP[a.tier] ?? 'free',
      rating: a.rating.average ?? 0,
      review_count: a.rating.count,
      verified: a.badges.includes('Verified'),
      kyc_verified: a.badges.includes('Verified'),
      safety_certified: a.badges.includes('Top Rated'),
      phone: firstOf(p?.phone),
      whatsapp: '',
      email: firstOf(p?.email),
      address: p?.address ?? '',
      established_year: new Date(a.memberSince).getFullYear(),
    };
  } catch {
    return null;
  }
}

interface RealRankedAgency {
  id: string;
  name: string;
  slug: string;
  tier: string;
  logo: string | null;
  description: string | null;
  rating: { average: number | null; count: number };
  badges: string[];
}

export async function getAgencies(): Promise<Agency[]> {
  const res = await apiClient.get<{ success: boolean; trekkedWith: RealRankedAgency[]; recommended: RealRankedAgency[] }>(
    '/marketplace/agencies'
  );
  const all = [...res.trekkedWith, ...res.recommended];
  return all.map((a) => ({
    id: a.id,
    name: a.name,
    slug: a.slug,
    logo_url: a.logo ?? '',
    cover_image: a.logo ?? '',
    bio: a.description ?? '',
    tier: TIER_MAP[a.tier] ?? 'free',
    rating: a.rating.average ?? 0,
    review_count: a.rating.count,
    verified: a.badges.includes('Verified'),
    kyc_verified: a.badges.includes('Verified'),
    safety_certified: a.badges.includes('Top Rated'),
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
  }));
}

/* ── Destinations ─────────────────────────────────────────────────────────── */

interface RealDestinationListItem {
  slug: string;
  name: string;
  region: string | null;
  altitudeM: number | null;
  bestSeason: string | null;
  packageCount: number;
  agencyCount: number;
}

export async function getDestinations(): Promise<Destination[]> {
  const res = await apiClient.get<{ success: boolean; data: RealDestinationListItem[] }>('/marketplace/destinations?limit=100');
  return res.data.map((d, i) => ({
    id: `${i}`,
    name: d.name,
    slug: d.slug,
    region: d.region ?? '',
    altitude: d.altitudeM ?? 0,
    best_season: d.bestSeason ?? '',
    description: '',
    image_url: '',
    package_count: d.packageCount,
  }));
}

interface RealDestinationDetail {
  slug: string;
  name: string;
  region: string | null;
  altitudeM: number | null;
  bestSeason: string | null;
  packageCount: number;
  agencies: { id: string; name: string; slug: string; tier: string; packages: { id: string; title: string; slug: string; durationDays: number; pricePerPerson: number; difficulty: string }[] }[];
}

export async function getDestinationBySlug(slug: string): Promise<{ destination: Destination; packages: TrekPackage[] } | null> {
  try {
    const res = await apiClient.get<{ success: boolean; data: RealDestinationDetail }>(`/marketplace/destinations/${slug}`);
    const d = res.data;
    const destination: Destination = {
      id: d.slug,
      name: d.name,
      slug: d.slug,
      region: d.region ?? '',
      altitude: d.altitudeM ?? 0,
      best_season: d.bestSeason ?? '',
      description: '',
      image_url: '',
      package_count: d.packageCount,
    };
    const packages: TrekPackage[] = d.agencies.flatMap((a) =>
      a.packages.map((pkg) => ({
        id: pkg.id,
        agency_id: a.id,
        title: pkg.title,
        slug: pkg.slug,
        description: '',
        destination: d.name,
        destination_slug: d.slug,
        duration_days: pkg.durationDays,
        difficulty: DIFFICULTY_MAP[pkg.difficulty] ?? 'Moderate',
        best_seasons: [],
        price_usd: pkg.pricePerPerson,
        price_npr: pkg.pricePerPerson,
        max_altitude: d.altitudeM ?? 0,
        rating: 0,
        review_count: 0,
        image_url: '',
        gallery: [],
        itinerary: [],
        included: [],
        not_included: [],
      }))
    );
    return { destination, packages };
  } catch {
    return null;
  }
}

/* ── Homepage stats (real counts, never fixed marketing numbers) ───────────── */

export interface MarketplaceStats {
  totalAgencies: number;
  totalPackages: number;
  totalTrekkers: number;
  totalReviews: number;
  averageRating: number | null;
  recentReviews: Array<{
    id: string;
    rating: number;
    title: string | null;
    text: string;
    trekkerName: string;
    agencyName: string;
    agencySlug: string;
    createdAt: string;
  }>;
}

export async function getMarketplaceStats(): Promise<MarketplaceStats> {
  const res = await apiClient.get<{ success: boolean; data: MarketplaceStats }>('/marketplace/stats');
  return res.data;
}

/* ── Subscription tiers (public pricing page) ─────────────────────────────── */

/** Exactly what GET /subscription-tiers returns — the tiers a Super Admin configured. */
export interface SubscriptionTierInfo {
  id: string;
  name: string;
  monthlyPrice: string;
  annualPrice: string | null;
  maxStaff: number;
  maxGuides: number;
  maxPackages: number;
  trialDays: number;
  marketplaceWeight: number;
  adsEnabled: boolean;
  customDomainEnabled: boolean;
  whiteLabelComplete: boolean;
  apiAccessEnabled: boolean;
  maxBookingsPerMonth: number | null;
  blogEnabled: boolean;
  analyticsEnabled: boolean;
  prioritySupportEnabled: boolean;
}

export async function getSubscriptionTiers(): Promise<SubscriptionTierInfo[]> {
  const res = await apiClient.get<{ status: string; data: { tiers: SubscriptionTierInfo[] } }>('/subscription-tiers');
  return [...res.data.tiers].sort((a, b) => Number(a.monthlyPrice) - Number(b.monthlyPrice));
}

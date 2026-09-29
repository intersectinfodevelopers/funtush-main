import { redirect } from 'next/navigation';
import { siteConfig } from '@/config/site';

// Login (trekker and agency both) lives on the app dashboard, not the
// marketing/marketplace site — that's where the real session, "remember me"
// and role handling already exist. This page only forwards there.
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') qs.set(key, value);
  }
  const query = qs.toString();
  redirect(`${siteConfig.appUrl}/login${query ? `?${query}` : ''}`);
}

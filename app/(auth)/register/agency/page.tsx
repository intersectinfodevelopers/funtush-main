import { redirect } from 'next/navigation';
import { siteConfig } from '@/config/site';

export default function RegisterAgencyPage() {
  redirect(`${siteConfig.appUrl}/register/agency`);
}

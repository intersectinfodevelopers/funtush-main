import { redirect } from 'next/navigation';
import { siteConfig } from '@/config/site';

export default function RegisterTrekkerPage() {
  redirect(`${siteConfig.appUrl}/register/trekker`);
}

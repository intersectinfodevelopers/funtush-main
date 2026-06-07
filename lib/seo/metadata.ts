import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export function generateMetadata(
  title: string,
  description: string,
  pathname: string,
  ogImage?: string
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${pathname}`,
      siteName: siteConfig.name,
      images: ogImage ? [ogImage] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export function generatePackageMetadata(
  title: string,
  description: string,
  slug: string,
  image: string
): Metadata {
  return generateMetadata(
    `${title} Trek | Funtush`,
    description,
    `/packages/${slug}`,
    image
  );
}

export function generateAgencyMetadata(
  name: string,
  description: string,
  slug: string,
  logo: string
): Metadata {
  return generateMetadata(
    `${name} - Trek Agency | Funtush`,
    description,
    `/agencies/${slug}`,
    logo
  );
}

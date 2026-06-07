import { Agency, TrekPackage } from '@/types';
import { siteConfig } from '@/config/site';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'Customer Service',
    },
    sameAs: [
      siteConfig.social.twitter,
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ],
  };
}

export function productJsonLd(pkg: TrekPackage, agency: Agency) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pkg.title,
    description: pkg.description,
    image: pkg.image_url,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      price: pkg.price_usd,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: pkg.rating,
      reviewCount: pkg.review_count,
    },
    brand: {
      '@type': 'Brand',
      name: agency.name,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

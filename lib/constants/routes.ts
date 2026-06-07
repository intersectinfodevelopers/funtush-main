export const ROUTES = {
  // Public pages
  HOME: '/',
  EXPLORE: '/explore',
  AGENCIES: '/agencies',
  DESTINATIONS: '/destinations',
  PRICING: '/pricing',
  ABOUT: '/about',
  CONTACT: '/contact',
  SAFETY: '/safety',
  BLOG: '/blog',
  PRIVACY: '/privacy',
  TERMS: '/terms',

  // Auth pages
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_AGENCY: '/register/agency',
  REGISTER_TREKKER: '/register/trekker',
  VERIFY: '/verify',

  // Dynamic routes (builders)
  PACKAGE: (slug: string) => `/packages/${slug}`,
  AGENCY: (slug: string) => `/agencies/${slug}`,
  DESTINATION: (slug: string) => `/destinations/${slug}`,
  BLOG_POST: (slug: string) => `/blog/${slug}`,

  // External - app.funtush.com
  APP_HOME: 'https://app.funtush.com',
  APP_DASHBOARD: 'https://app.funtush.com/dashboard',
  APP_PACKAGES: 'https://app.funtush.com/packages',
  APP_AGENCIES: 'https://app.funtush.com/agencies',
};

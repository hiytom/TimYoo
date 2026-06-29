import { siteData } from '../data/siteData';

export type JsonLd = Record<string, unknown>;

const SITE_URL = 'https://www.timyooapparel.com';
const BRAND_NAME = 'TIMYOO Apparel';
const BRAND_SHORT_NAME = 'TIMYOO';

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

export function buildWebsiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    name: BRAND_NAME,
    alternateName: BRAND_SHORT_NAME,
    url: absoluteUrl('/'),
    publisher: {
      '@id': `${absoluteUrl('/')}#organization`,
    },
  };
}

export function buildOrganizationJsonLd(): JsonLd {
  const { footer } = siteData;

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${absoluteUrl('/')}#organization`,
    name: BRAND_NAME,
    alternateName: BRAND_SHORT_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/assets/logo.svg'),
    image: absoluteUrl('/assets/hero-factory-background.jpg'),
    description:
      'Cambodia apparel manufacturer and Southeast Asia garment factory partner for chef wear, aprons, casualwear, and repeat garment production.',
    email: footer.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'No. 191, National Road 6 (AH11), Kompong Preah Village, Tang Krang Commune, Batheay District',
      addressRegion: 'Kampong Cham Province',
      addressCountry: 'KH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: footer.contact.coordinates.latitude,
      longitude: footer.contact.coordinates.longitude,
    },
    hasMap: footer.contact.mapUrl,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: footer.contact.email,
        availableLanguage: ['en', 'zh'],
      },
    ],
    knowsAbout: [
      'Cambodia apparel manufacturer',
      'Cambodia garment factory',
      'Southeast Asia apparel manufacturer',
      'Southeast Asia garment factory',
      'apparel sourcing Cambodia',
      'repeat garment production',
      'chef wear manufacturer',
      'commercial apron manufacturer',
      'casualwear manufacturer',
    ],
  };
}

export function buildBreadcrumbJsonLd(
  pagePath: string,
  pageName: string,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(pagePath)}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: absoluteUrl('/#products'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: pageName,
        item: absoluteUrl(pagePath),
      },
    ],
  };
}

type CollectionPageInput = {
  path: string;
  name: string;
  description: string;
  image: string;
  galleryLabel: string;
  itemCount: number;
  keywords: string[];
};

export function buildCollectionPageJsonLd({
  path,
  name,
  description,
  image,
  galleryLabel,
  itemCount,
  keywords,
}: CollectionPageInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(path)}#collection`,
    url: absoluteUrl(path),
    name,
    description,
    image: absoluteUrl(image),
    isPartOf: {
      '@id': `${absoluteUrl('/')}#website`,
    },
    publisher: {
      '@id': `${absoluteUrl('/')}#organization`,
    },
    breadcrumb: {
      '@id': `${absoluteUrl(path)}#breadcrumb`,
    },
    keywords,
    mainEntity: {
      '@type': 'ItemList',
      name: galleryLabel,
      numberOfItems: itemCount,
    },
  };
}

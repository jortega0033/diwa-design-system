import type { Metadata } from 'next';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://designsystem.diwacopilot.com'
).replace(/\/$/, '');

export const SITE_NAME = 'Diwa Design System';

/** Absolute URL for a per-section OG cover image stored in /public/og-images/. */
export function ogImageUrl(section: string): string {
  return `${SITE_URL}/og-images/${section}.png`;
}

interface BuildMetadataInput {
  /** Human-readable page title — site name is appended automatically. */
  title: string;
  description: string;
  /** Absolute pathname, e.g. '/styles/border' */
  pathname: string;
  /** Key for the section OG cover image, e.g. 'styles', 'components'. Defaults to 'home'. */
  ogSection?: string;
  /** Set true to add noindex/nofollow. */
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  pathname,
  ogSection = 'home',
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${pathname}`;
  const fullTitle = `${title} — ${SITE_NAME}`;
  const image = ogImageUrl(ogSection);

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export type BreadcrumbItem = { name: string; item: string };

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((bc, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: bc.name,
      item: bc.item,
    })),
  };
}

export function buildWebPageJsonLd({
  title,
  description,
  url,
  breadcrumb,
}: {
  title: string;
  description: string;
  url: string;
  breadcrumb?: BreadcrumbItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: SITE_NAME },
    ...(breadcrumb ? { breadcrumb: buildBreadcrumbJsonLd(breadcrumb) } : {}),
  };
}

export function buildTechArticleJsonLd({
  title,
  description,
  url,
  breadcrumb,
}: {
  title: string;
  description: string;
  url: string;
  breadcrumb?: BreadcrumbItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url,
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: SITE_NAME },
    ...(breadcrumb ? { breadcrumb: buildBreadcrumbJsonLd(breadcrumb) } : {}),
  };
}

export function buildFaqPageJsonLd(
  url: string,
  entries: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url,
    mainEntity: entries.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

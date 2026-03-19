import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Badge",
  description: "Compact pill-shaped labels for status, counts, and metadata. Use Badge for small semantic indicators that should stay visually lightweight.",
  pathname: '/components/badge/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/badge/configurator' },
  { label: 'Examples',     href: '/components/badge/examples' },
  { label: 'Usage',        href: '/components/badge/usage' },
  { label: 'Accessibility',href: '/components/badge/accessibility' },
  { label: 'API',          href: '/components/badge/api' },
];

export default function BadgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Badge" description="Compact pill-shaped labels for status, counts, and metadata. Use Badge for small semantic indicators that should stay visually lightweight." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

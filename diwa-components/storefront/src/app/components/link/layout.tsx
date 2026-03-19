import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Link",
  description: "Links navigate users to a new page or section. Use the variant that communicates the visual weight of the navigation action.",
  pathname: '/components/link/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/link/configurator' },
  { label: 'Examples',     href: '/components/link/examples' },
  { label: 'Usage',        href: '/components/link/usage' },
  { label: 'Accessibility',href: '/components/link/accessibility' },
  { label: 'API',          href: '/components/link/api' },
];

export default function LinkLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Link" description="Links navigate users to a new page or section. Use the variant that communicates the visual weight of the navigation action." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

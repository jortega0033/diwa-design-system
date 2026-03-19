import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Input URL",
  description: "A URL input with native browser URL validation. Provides an optimised keyboard on mobile and supports autocomplete for web addresses.",
  pathname: '/components/input-url/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-url/configurator' },
  { label: 'Examples',     href: '/components/input-url/examples' },
  { label: 'Usage',        href: '/components/input-url/usage' },
  { label: 'Accessibility',href: '/components/input-url/accessibility' },
  { label: 'API',          href: '/components/input-url/api' },
];

export default function InputUrlLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Input URL" description="A URL input with native browser URL validation. Provides an optimised keyboard on mobile and supports autocomplete for web addresses." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

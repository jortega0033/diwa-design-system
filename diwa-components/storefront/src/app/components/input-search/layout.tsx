import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Input Search",
  description: "A search input with an optional clear button. The clear button appears automatically when the field has a value and disappears once cleared.",
  pathname: '/components/input-search/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-search/configurator' },
  { label: 'Examples',     href: '/components/input-search/examples' },
  { label: 'Usage',        href: '/components/input-search/usage' },
  { label: 'Accessibility',href: '/components/input-search/accessibility' },
  { label: 'API',          href: '/components/input-search/api' },
];

export default function InputSearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Input Search" description="A search input with an optional clear button. The clear button appears automatically when the field has a value and disappears once cleared." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

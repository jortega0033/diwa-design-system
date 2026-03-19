import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Table",
  description: "Displays structured data in rows and columns with consistent styling and accessible markup.",
  pathname: '/components/table/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/table/configurator' },
  { label: 'Examples',     href: '/components/table/examples' },
  { label: 'Usage',        href: '/components/table/usage' },
  { label: 'Accessibility',href: '/components/table/accessibility' },
  { label: 'API',          href: '/components/table/api' },
];

export default function TableLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Table" description="Displays structured data in rows and columns with consistent styling and accessible markup." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

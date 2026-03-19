import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Input Month",
  description: "A month-and-year picker input (YYYY-MM). Delegates to the native browser month picker. Supports min and max month constraints.",
  pathname: '/components/input-month/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-month/configurator' },
  { label: 'Examples',     href: '/components/input-month/examples' },
  { label: 'Usage',        href: '/components/input-month/usage' },
  { label: 'Accessibility',href: '/components/input-month/accessibility' },
  { label: 'API',          href: '/components/input-month/api' },
];

export default function InputMonthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Input Month" description="A month-and-year picker input (YYYY-MM). Delegates to the native browser month picker. Supports min and max month constraints." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

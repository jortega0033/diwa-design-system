import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Input Time",
  description: "A time picker input (HH:MM). Delegates to the native browser time picker. Supports min, max, and step constraints.",
  pathname: '/components/input-time/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-time/configurator' },
  { label: 'Examples',     href: '/components/input-time/examples' },
  { label: 'Usage',        href: '/components/input-time/usage' },
  { label: 'Accessibility',href: '/components/input-time/accessibility' },
  { label: 'API',          href: '/components/input-time/api' },
];

export default function InputTimeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Input Time" description="A time picker input (HH:MM). Delegates to the native browser time picker. Supports min, max, and step constraints." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Input Tel",
  description: "A telephone number input. Triggers the numeric keypad on mobile devices and supports autocomplete for phone numbers.",
  pathname: '/components/input-tel/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-tel/configurator' },
  { label: 'Examples',     href: '/components/input-tel/examples' },
  { label: 'Usage',        href: '/components/input-tel/usage' },
  { label: 'Accessibility',href: '/components/input-tel/accessibility' },
  { label: 'API',          href: '/components/input-tel/api' },
];

export default function InputTelLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Input Tel" description="A telephone number input. Triggers the numeric keypad on mobile devices and supports autocomplete for phone numbers." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

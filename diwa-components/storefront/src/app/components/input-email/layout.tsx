import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Input Email",
  description: "An email address input. Provides native browser email validation, appropriate mobile keyboard, and autocomplete hints.",
  pathname: '/components/input-email/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-email/configurator' },
  { label: 'Examples',     href: '/components/input-email/examples' },
  { label: 'Usage',        href: '/components/input-email/usage' },
  { label: 'Accessibility',href: '/components/input-email/accessibility' },
  { label: 'API',          href: '/components/input-email/api' },
];

export default function InputEmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Input Email" description="An email address input. Provides native browser email validation, appropriate mobile keyboard, and autocomplete hints." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

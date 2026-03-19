import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Radio Group",
  description: "A group of radio inputs that lets users select exactly one option from a set.",
  pathname: '/components/radio-group/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/radio-group/configurator' },
  { label: 'Examples',     href: '/components/radio-group/examples' },
  { label: 'Usage',        href: '/components/radio-group/usage' },
  { label: 'Accessibility',href: '/components/radio-group/accessibility' },
  { label: 'API',          href: '/components/radio-group/api' },
];

export default function RadioGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Radio Group" description="A group of radio inputs that lets users select exactly one option from a set." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

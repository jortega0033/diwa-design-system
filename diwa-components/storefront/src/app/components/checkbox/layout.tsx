import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Checkbox",
  description: "Checkboxes allow users to select one or more options from a set, or toggle a single binary choice. Supports indeterminate state for partial selection patterns.",
  pathname: '/components/checkbox/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/checkbox/configurator' },
  { label: 'Examples',     href: '/components/checkbox/examples' },
  { label: 'Usage',        href: '/components/checkbox/usage' },
  { label: 'Accessibility',href: '/components/checkbox/accessibility' },
  { label: 'API',          href: '/components/checkbox/api' },
];

export default function CheckboxLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Checkbox" description="Checkboxes allow users to select one or more options from a set, or toggle a single binary choice. Supports indeterminate state for partial selection patterns." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

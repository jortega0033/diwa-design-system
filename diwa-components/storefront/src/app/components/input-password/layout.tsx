import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Input Password",
  description: "A password input with a built-in visibility toggle. Clicking the eye icon switches between masked and plain-text views.",
  pathname: '/components/input-password/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-password/configurator' },
  { label: 'Examples',     href: '/components/input-password/examples' },
  { label: 'Usage',        href: '/components/input-password/usage' },
  { label: 'Accessibility',href: '/components/input-password/accessibility' },
  { label: 'API',          href: '/components/input-password/api' },
];

export default function InputPasswordLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Input Password" description="A password input with a built-in visibility toggle. Clicking the eye icon switches between masked and plain-text views." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

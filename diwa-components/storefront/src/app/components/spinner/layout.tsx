import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Spinner",
  description: "A CSS-only animated loading indicator. Communicates asynchronous activity to both sighted users and screen readers via role=&quot;status&quot; and an accessible label.",
  pathname: '/components/spinner/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/spinner/configurator' },
  { label: 'Examples',     href: '/components/spinner/examples' },
  { label: 'Usage',        href: '/components/spinner/usage' },
  { label: 'Accessibility',href: '/components/spinner/accessibility' },
  { label: 'API',          href: '/components/spinner/api' },
];

export default function SpinnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Spinner" description="A CSS-only animated loading indicator. Communicates asynchronous activity to both sighted users and screen readers via role=&quot;status&quot; and an accessible label." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

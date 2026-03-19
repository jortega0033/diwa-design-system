import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Toast",
  description: "Toast notifications display brief, auto-dismissing messages in the corner of the screen.",
  pathname: '/components/toast/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/toast/configurator' },
  { label: 'Examples',     href: '/components/toast/examples' },
  { label: 'Usage',        href: '/components/toast/usage' },
  { label: 'Accessibility',href: '/components/toast/accessibility' },
  { label: 'API',          href: '/components/toast/api' },
];

export default function ToastLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Toast" description="Toast notifications display brief, auto-dismissing messages in the corner of the screen." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

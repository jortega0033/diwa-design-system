import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: 'Banner',
  description:
    'A floating top-of-viewport notification for global, non-blocking feedback. Supports semantic states, optional action, dismiss behavior, and timed or persistent visibility.',
  pathname: '/components/banner/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/banner/configurator' },
  { label: 'Examples', href: '/components/banner/examples' },
  { label: 'Usage', href: '/components/banner/usage' },
  { label: 'Accessibility', href: '/components/banner/accessibility' },
  { label: 'API', href: '/components/banner/api' },
];

export default function BannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout
      title="Banner"
      description="A floating top-of-viewport notification for global, non-blocking feedback. Supports semantic states, optional action, dismiss behavior, and timed or persistent visibility."
      tabs={TABS}
    >
      {children}
    </ComponentClientLayout>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Link Pure",
  description: "A minimal text+icon navigation link with no background or border. Use for inline navigation actions where a full-weight link would be too visually heavy.",
  pathname: '/components/link-pure/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/link-pure/configurator' },
  { label: 'Examples',     href: '/components/link-pure/examples' },
  { label: 'Usage',        href: '/components/link-pure/usage' },
  { label: 'Accessibility',href: '/components/link-pure/accessibility' },
  { label: 'API',          href: '/components/link-pure/api' },
];

export default function LinkPureLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Link Pure" description="A minimal text+icon navigation link with no background or border. Use for inline navigation actions where a full-weight link would be too visually heavy." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

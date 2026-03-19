import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Button Pure",
  description: "A minimal, transparent button — icon and label only, without background or border. Use it for inline actions, contextual links, and secondary affordances where a full button would be too heavy.",
  pathname: '/components/button-pure/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/button-pure/configurator' },
  { label: 'Examples',     href: '/components/button-pure/examples' },
  { label: 'Usage',        href: '/components/button-pure/usage' },
  { label: 'Accessibility',href: '/components/button-pure/accessibility' },
  { label: 'API',          href: '/components/button-pure/api' },
];

export default function ButtonPureLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Button Pure" description="A minimal, transparent button — icon and label only, without background or border. Use it for inline actions, contextual links, and secondary affordances where a full button would be too heavy." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

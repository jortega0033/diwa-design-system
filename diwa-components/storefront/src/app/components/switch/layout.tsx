import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "Switch",
  description: "A toggle control that lets users turn an option on or off immediately without requiring form submission.",
  pathname: '/components/switch/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/switch/configurator' },
  { label: 'Examples',     href: '/components/switch/examples' },
  { label: 'Usage',        href: '/components/switch/usage' },
  { label: 'Accessibility',href: '/components/switch/accessibility' },
  { label: 'API',          href: '/components/switch/api' },
];

export default function SwitchLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="Switch" description="A toggle control that lets users turn an option on or off immediately without requiring form submission." tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}

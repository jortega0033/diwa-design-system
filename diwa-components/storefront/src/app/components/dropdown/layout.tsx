import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: 'Dropdown',
  description:
    'A layered menu surface for grouped actions and navigation. Uses Floating UI positioning, supports nested submenus, and accepts custom trigger content via slot.',
  pathname: '/components/dropdown/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/dropdown/configurator' },
  { label: 'Examples', href: '/components/dropdown/examples' },
  { label: 'Usage', href: '/components/dropdown/usage' },
  { label: 'Accessibility', href: '/components/dropdown/accessibility' },
  { label: 'API', href: '/components/dropdown/api' },
];

export default function DropdownLayout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout
      title="Dropdown"
      description="A layered menu surface for grouped actions and navigation. Uses Floating UI positioning, supports nested submenus, and accepts custom trigger content via slot."
      tabs={TABS}
    >
      {children}
    </ComponentClientLayout>
  );
}

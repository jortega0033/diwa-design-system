'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/divider/configurator' },
  { label: 'Examples', href: '/components/divider/examples' },
  { label: 'Usage', href: '/components/divider/usage' },
  { label: 'Accessibility', href: '/components/divider/accessibility' },
  { label: 'API', href: '/components/divider/api' },
];

export default function DividerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Divider"
        description="A thin visual rule used to separate content sections or items. Supports horizontal and vertical orientations."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

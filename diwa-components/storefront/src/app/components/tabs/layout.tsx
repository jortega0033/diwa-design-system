'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/tabs/configurator' },
  { label: 'Examples', href: '/components/tabs/examples' },
  { label: 'Usage', href: '/components/tabs/usage' },
  { label: 'Accessibility', href: '/components/tabs/accessibility' },
  { label: 'API', href: '/components/tabs/api' },
];

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Tabs"
        description="A full-featured tabbed interface that combines a tab bar with associated panel content."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/tabs-bar/configurator' },
  { label: 'Examples', href: '/components/tabs-bar/examples' },
  { label: 'Usage', href: '/components/tabs-bar/usage' },
  { label: 'Accessibility', href: '/components/tabs-bar/accessibility' },
  { label: 'API', href: '/components/tabs-bar/api' },
];

export default function TabsBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Tabs Bar"
        description="A navigation bar that organises content into labelled tabs, allowing users to switch between related views."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

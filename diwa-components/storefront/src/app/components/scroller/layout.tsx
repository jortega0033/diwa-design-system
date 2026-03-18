'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/scroller/configurator' },
  { label: 'Examples', href: '/components/scroller/examples' },
  { label: 'Usage', href: '/components/scroller/usage' },
  { label: 'Accessibility', href: '/components/scroller/accessibility' },
  { label: 'API', href: '/components/scroller/api' },
];

export default function ScrollerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Scroller"
        description="A horizontal scroll container with gradient fade indicators. Ideal for tab bars, tag lists, and other content that may overflow its container."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

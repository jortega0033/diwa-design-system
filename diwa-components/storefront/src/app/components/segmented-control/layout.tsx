'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/segmented-control/configurator' },
  { label: 'Examples', href: '/components/segmented-control/examples' },
  { label: 'Usage', href: '/components/segmented-control/usage' },
  { label: 'Accessibility', href: '/components/segmented-control/accessibility' },
  { label: 'API', href: '/components/segmented-control/api' },
];

export default function SegmentedControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Segmented Control"
        description="A compact button group that lets users switch between a set of mutually exclusive views or modes."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/popover/configurator' },
  { label: 'Examples', href: '/components/popover/examples' },
  { label: 'Usage', href: '/components/popover/usage' },
  { label: 'Accessibility', href: '/components/popover/accessibility' },
  { label: 'API', href: '/components/popover/api' },
];

export default function PopoverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Popover"
        description="A lightweight contextual panel that reveals additional information when a trigger is activated. Closes on Escape or clicking outside."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-time/configurator' },
  { label: 'Examples', href: '/components/input-time/examples' },
  { label: 'Usage', href: '/components/input-time/usage' },
  { label: 'Accessibility', href: '/components/input-time/accessibility' },
  { label: 'API', href: '/components/input-time/api' },
];

export default function InputTimeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Input Time"
        description="A time picker input (HH:MM). Delegates to the native browser time picker. Supports min, max, and step constraints."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

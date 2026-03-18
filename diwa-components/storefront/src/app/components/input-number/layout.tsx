'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-number/configurator' },
  { label: 'Examples', href: '/components/input-number/examples' },
  { label: 'Usage', href: '/components/input-number/usage' },
  { label: 'Accessibility', href: '/components/input-number/accessibility' },
  { label: 'API', href: '/components/input-number/api' },
];

export default function InputNumberLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Input Number"
        description="A numeric input with native browser number validation. Native spinners are hidden by default. Supports min, max, and step constraints."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

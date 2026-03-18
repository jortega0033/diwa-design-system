'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-date/configurator' },
  { label: 'Examples', href: '/components/input-date/examples' },
  { label: 'Usage', href: '/components/input-date/usage' },
  { label: 'Accessibility', href: '/components/input-date/accessibility' },
  { label: 'API', href: '/components/input-date/api' },
];

export default function InputDateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Input Date"
        description="A date picker input (YYYY-MM-DD). Delegates to the native browser date picker. Supports min and max date constraints."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-url/configurator' },
  { label: 'Examples', href: '/components/input-url/examples' },
  { label: 'Usage', href: '/components/input-url/usage' },
  { label: 'Accessibility', href: '/components/input-url/accessibility' },
  { label: 'API', href: '/components/input-url/api' },
];

export default function InputUrlLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Input URL"
        description="A URL input with native browser URL validation. Provides an optimised keyboard on mobile and supports autocomplete for web addresses."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

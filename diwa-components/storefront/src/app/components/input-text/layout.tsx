'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/input-text/configurator' },
  { label: 'Examples', href: '/components/input-text/examples' },
  { label: 'Usage', href: '/components/input-text/usage' },
  { label: 'Accessibility', href: '/components/input-text/accessibility' },
  { label: 'API', href: '/components/input-text/api' },
];

export default function InputTextLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Input Text"
        description="A single-line text input for freeform string values. Supports label, description, validation states, dense mode (compact), and character limits."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

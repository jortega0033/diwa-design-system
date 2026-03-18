'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/radio-group/configurator' },
  { label: 'Examples', href: '/components/radio-group/examples' },
  { label: 'Usage', href: '/components/radio-group/usage' },
  { label: 'Accessibility', href: '/components/radio-group/accessibility' },
  { label: 'API', href: '/components/radio-group/api' },
];

export default function RadioGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Radio Group"
        description="A group of radio inputs that lets users select exactly one option from a set."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

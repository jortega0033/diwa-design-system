'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/switch/configurator' },
  { label: 'Examples', href: '/components/switch/examples' },
  { label: 'Usage', href: '/components/switch/usage' },
  { label: 'Accessibility', href: '/components/switch/accessibility' },
  { label: 'API', href: '/components/switch/api' },
];

export default function SwitchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Switch"
        description="A toggle control that lets users turn an option on or off immediately without requiring form submission."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/icon/configurator' },
  { label: 'Examples', href: '/components/icon/examples' },
  { label: 'Usage', href: '/components/icon/usage' },
  { label: 'Accessibility', href: '/components/icon/accessibility' },
  { label: 'API', href: '/components/icon/api' },
];

export default function IconLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Icon"
        description="Icons are a fundamental visual element that aid quick recognition and navigation. Diwa uses the Lucide icon set — a consistent, open-source library built on a 24×24 grid with 2px strokes."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/modal/configurator' },
  { label: 'Examples', href: '/components/modal/examples' },
  { label: 'Usage', href: '/components/modal/usage' },
  { label: 'Accessibility', href: '/components/modal/accessibility' },
  { label: 'API', href: '/components/modal/api' },
];

export default function ModalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Modal"
        description="An overlay dialog that focuses the user's attention on a single task or piece of information. The page behind is blocked from interaction until the modal is dismissed."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

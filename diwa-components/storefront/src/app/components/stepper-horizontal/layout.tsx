'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/stepper-horizontal/configurator' },
  { label: 'Examples', href: '/components/stepper-horizontal/examples' },
  { label: 'Usage', href: '/components/stepper-horizontal/usage' },
  { label: 'Accessibility', href: '/components/stepper-horizontal/accessibility' },
  { label: 'API', href: '/components/stepper-horizontal/api' },
];

export default function StepperHorizontalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Stepper Horizontal"
        description="Displays progress through a sequential multi-step process with a horizontal step indicator."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

'use client';

import React from 'react';
import { PageHeader, type PageTab } from '@/components/layout/PageHeader';

const TABS: PageTab[] = [
  { label: 'Configurator', href: '/components/pin-code/configurator' },
  { label: 'Examples', href: '/components/pin-code/examples' },
  { label: 'Usage', href: '/components/pin-code/usage' },
  { label: 'Accessibility', href: '/components/pin-code/accessibility' },
  { label: 'API', href: '/components/pin-code/api' },
];

export default function PinCodeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PageHeader
        title="Pin Code"
        description="A segmented code entry field with automatic focus advancement. Used for OTP, verification codes, and PINs."
        tabs={TABS}
      />
      {children}
    </div>
  );
}

import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { PARTIAL_DOCS } from '../_shared/partialsDocs';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/partials/initial-styles'];


export default function PartialsInitialStylesPage() {
  return <DocDetailPage doc={PARTIAL_DOCS['initial-styles']} />;
}

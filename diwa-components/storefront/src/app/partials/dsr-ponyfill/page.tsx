import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { PARTIAL_DOCS } from '../_shared/partialsDocs';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/partials/dsr-ponyfill'];


export default function PartialsDsrPonyfillPage() {
  return <DocDetailPage doc={PARTIAL_DOCS['dsr-ponyfill']} />;
}

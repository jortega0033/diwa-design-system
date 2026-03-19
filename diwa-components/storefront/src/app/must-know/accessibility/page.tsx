import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { MUST_KNOW_DOCS } from '../_shared/mustKnowDocs';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/must-know/accessibility'];


export default function MustKnowAccessibilityPage() {
  return <DocDetailPage doc={MUST_KNOW_DOCS.accessibility} />;
}

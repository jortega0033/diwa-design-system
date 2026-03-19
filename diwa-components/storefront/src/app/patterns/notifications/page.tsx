import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { PATTERN_DOCS } from '../_shared/patternDocs';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/patterns/notifications'];


export default function PatternsNotificationsPage() {
  return <DocDetailPage doc={PATTERN_DOCS.notifications} />;
}

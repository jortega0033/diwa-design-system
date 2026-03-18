import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { PATTERN_DOCS } from '../_shared/patternDocs';

export default function PatternsNotificationsPage() {
  return <DocDetailPage doc={PATTERN_DOCS.notifications} />;
}

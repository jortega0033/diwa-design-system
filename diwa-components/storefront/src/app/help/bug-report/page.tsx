import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { HELP_DOCS } from '../_shared/helpDocs';

export default function HelpBugReportPage() {
  return <DocDetailPage doc={HELP_DOCS['bug-report']} />;
}

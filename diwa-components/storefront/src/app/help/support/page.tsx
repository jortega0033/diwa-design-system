import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { HELP_DOCS } from '../_shared/helpDocs';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/help/support'];


export default function HelpSupportPage() {
  return <DocDetailPage doc={HELP_DOCS.support} />;
}

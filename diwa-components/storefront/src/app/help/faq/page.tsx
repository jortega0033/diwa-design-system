import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { HELP_DOCS } from '../_shared/helpDocs';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/help/faq'];


export default function HelpFaqPage() {
  return <DocDetailPage doc={HELP_DOCS.faq} />;
}

import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { HELP_DOCS } from '../_shared/helpDocs';

export default function HelpFaqPage() {
  return <DocDetailPage doc={HELP_DOCS.faq} />;
}

import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { MUST_KNOW_DOCS } from '../_shared/mustKnowDocs';

export default function MustKnowInitializationPage() {
  return <DocDetailPage doc={MUST_KNOW_DOCS.initialization} />;
}

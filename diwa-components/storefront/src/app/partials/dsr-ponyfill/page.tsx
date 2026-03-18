import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { PARTIAL_DOCS } from '../_shared/partialsDocs';

export default function PartialsDsrPonyfillPage() {
  return <DocDetailPage doc={PARTIAL_DOCS['dsr-ponyfill']} />;
}

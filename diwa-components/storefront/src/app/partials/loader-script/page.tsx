import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { PARTIAL_DOCS } from '../_shared/partialsDocs';

export default function PartialsLoaderScriptPage() {
  return <DocDetailPage doc={PARTIAL_DOCS['loader-script']} />;
}

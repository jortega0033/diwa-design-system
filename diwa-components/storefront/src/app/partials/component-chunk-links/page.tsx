import React from 'react';
import { DocDetailPage } from '@/app/_shared/DocDetailPage';
import { PARTIAL_DOCS } from '../_shared/partialsDocs';

export default function PartialsComponentChunkLinksPage() {
  return <DocDetailPage doc={PARTIAL_DOCS['component-chunk-links']} />;
}

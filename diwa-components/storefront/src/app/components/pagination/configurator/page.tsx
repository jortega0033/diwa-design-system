'use client';

import { Configurator } from '@/components/playground/Configurator';
import { paginationStory, paginationPropDefinitions } from '../pagination.stories';

export default function PaginationConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-pagination"
      story={paginationStory}
      propDefinitions={paginationPropDefinitions}
    />
  );
}

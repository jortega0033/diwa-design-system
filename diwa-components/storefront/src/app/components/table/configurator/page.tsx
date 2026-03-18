'use client';

import { Configurator } from '@/components/playground/Configurator';
import { tableStory, tablePropDefinitions } from '../table.stories';

export default function TableConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-table"
      story={tableStory}
      propDefinitions={tablePropDefinitions}
      previewClassName="w-full"
    />
  );
}

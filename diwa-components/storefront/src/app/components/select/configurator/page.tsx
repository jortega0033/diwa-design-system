'use client';

import { Configurator } from '@/components/playground/Configurator';
import { selectStory, selectPropDefinitions } from '../select.stories';

export default function SelectConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-select"
      story={selectStory}
      propDefinitions={selectPropDefinitions}
    />
  );
}

'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputSearchStory, inputSearchPropDefinitions } from '../input-search.stories';

export default function InputSearchConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-input-search"
      story={inputSearchStory}
      propDefinitions={inputSearchPropDefinitions}
    />
  );
}

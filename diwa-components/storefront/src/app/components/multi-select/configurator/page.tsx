'use client';

import { Configurator } from '@/components/playground/Configurator';
import { multiSelectStory, multiSelectPropDefinitions } from '../multi-select.stories';

export default function MultiSelectConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-multi-select"
      story={multiSelectStory}
      propDefinitions={multiSelectPropDefinitions}
    />
  );
}

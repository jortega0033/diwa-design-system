'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputNumberStory, inputNumberPropDefinitions } from '../input-number.stories';

export default function InputNumberConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-input-number"
      story={inputNumberStory}
      propDefinitions={inputNumberPropDefinitions}
    />
  );
}

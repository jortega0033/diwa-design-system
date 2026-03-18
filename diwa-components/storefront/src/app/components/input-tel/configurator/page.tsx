'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputTelStory, inputTelPropDefinitions } from '../input-tel.stories';

export default function InputTelConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-input-tel"
      story={inputTelStory}
      propDefinitions={inputTelPropDefinitions}
    />
  );
}

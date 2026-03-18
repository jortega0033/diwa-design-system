'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputTextStory, inputTextPropDefinitions } from '../input-text.stories';

export default function InputTextConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-input-text"
      story={inputTextStory}
      propDefinitions={inputTextPropDefinitions}
    />
  );
}

'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputUrlStory, inputUrlPropDefinitions } from '../input-url.stories';

export default function InputUrlConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-input-url"
      story={inputUrlStory}
      propDefinitions={inputUrlPropDefinitions}
    />
  );
}

'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputEmailStory, inputEmailPropDefinitions } from '../input-email.stories';

export default function InputEmailConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-input-email"
      story={inputEmailStory}
      propDefinitions={inputEmailPropDefinitions}
    />
  );
}

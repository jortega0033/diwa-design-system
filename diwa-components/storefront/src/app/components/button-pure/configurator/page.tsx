'use client';

import { Configurator } from '@/components/playground/Configurator';
import { buttonPureStory, buttonPurePropDefinitions } from '../button-pure.stories';

export default function ButtonPureConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-button-pure"
      story={buttonPureStory}
      propDefinitions={buttonPurePropDefinitions}
    />
  );
}

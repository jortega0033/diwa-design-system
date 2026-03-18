'use client';

import { Configurator } from '@/components/playground/Configurator';
import { buttonStory, buttonPropDefinitions } from '../button.stories';

export default function ButtonConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-button"
      story={buttonStory}
      propDefinitions={buttonPropDefinitions}
    />
  );
}

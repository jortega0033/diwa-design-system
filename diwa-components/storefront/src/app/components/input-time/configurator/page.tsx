'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputTimeStory, inputTimePropDefinitions } from '../input-time.stories';

export default function InputTimeConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-input-time"
      story={inputTimeStory}
      propDefinitions={inputTimePropDefinitions}
    />
  );
}

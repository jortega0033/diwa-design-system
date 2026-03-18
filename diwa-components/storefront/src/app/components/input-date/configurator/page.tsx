'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputDateStory, inputDatePropDefinitions } from '../input-date.stories';

export default function InputDateConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-input-date"
      story={inputDateStory}
      propDefinitions={inputDatePropDefinitions}
    />
  );
}

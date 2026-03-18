'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputMonthStory, inputMonthPropDefinitions } from '../input-month.stories';

export default function InputMonthConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-input-month"
      story={inputMonthStory}
      propDefinitions={inputMonthPropDefinitions}
    />
  );
}

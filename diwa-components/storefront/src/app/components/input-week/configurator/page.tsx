'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputWeekStory, inputWeekPropDefinitions } from '../input-week.stories';

export default function InputWeekConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-input-week"
      story={inputWeekStory}
      propDefinitions={inputWeekPropDefinitions}
    />
  );
}

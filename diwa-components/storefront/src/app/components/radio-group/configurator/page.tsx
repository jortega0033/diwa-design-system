'use client';

import { Configurator } from '@/components/playground/Configurator';
import { radioGroupStory, radioGroupPropDefinitions } from '../radio-group.stories';

export default function RadioGroupConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-radio-group"
      story={radioGroupStory}
      propDefinitions={radioGroupPropDefinitions}
    />
  );
}

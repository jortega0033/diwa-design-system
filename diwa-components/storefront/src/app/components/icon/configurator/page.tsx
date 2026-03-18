'use client';

import { Configurator } from '@/components/playground/Configurator';
import { iconStory, iconPropDefinitions } from '../icon.stories';

export default function IconConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-icon"
      story={iconStory}
      propDefinitions={iconPropDefinitions}
    />
  );
}

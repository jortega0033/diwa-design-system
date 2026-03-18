'use client';

import { Configurator } from '@/components/playground/Configurator';
import { switchStory, switchPropDefinitions } from '../switch.stories';

export default function SwitchConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-switch"
      story={switchStory}
      propDefinitions={switchPropDefinitions}
    />
  );
}

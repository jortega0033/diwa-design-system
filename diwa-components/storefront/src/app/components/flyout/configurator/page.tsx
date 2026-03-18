'use client';

import { Configurator } from '@/components/playground/Configurator';
import { flyoutStory, flyoutPropDefinitions } from '../flyout.stories';

export default function FlyoutConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-flyout"
      story={flyoutStory}
      propDefinitions={flyoutPropDefinitions}
    />
  );
}

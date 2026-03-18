'use client';

import { Configurator } from '@/components/playground/Configurator';
import { popoverStory, popoverPropDefinitions } from '../popover.stories';

export default function PopoverConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-popover"
      story={popoverStory}
      propDefinitions={popoverPropDefinitions}
    />
  );
}

'use client';

import { Configurator } from '@/components/playground/Configurator';
import { scrollerStory, scrollerPropDefinitions } from '../scroller.stories';

export default function ScrollerConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-scroller"
      story={scrollerStory}
      propDefinitions={scrollerPropDefinitions}
    />
  );
}

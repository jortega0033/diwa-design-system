'use client';

import { Configurator } from '@/components/playground/Configurator';
import { accordionStory, accordionPropDefinitions } from '../accordion.stories';

export default function AccordionConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-accordion"
      story={accordionStory}
      propDefinitions={accordionPropDefinitions}
    />
  );
}

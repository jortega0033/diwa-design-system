'use client';

import { Configurator } from '@/components/playground/Configurator';
import { headingStory, headingPropDefinitions } from '../heading.stories';

export default function HeadingConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-heading"
      story={headingStory}
      propDefinitions={headingPropDefinitions}
    />
  );
}

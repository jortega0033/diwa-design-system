'use client';

import { Configurator } from '@/components/playground/Configurator';
import { tagStory, tagPropDefinitions } from '../tag.stories';

export default function TagConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-tag"
      story={tagStory}
      propDefinitions={tagPropDefinitions}
    />
  );
}

'use client';

import { Configurator } from '@/components/playground/Configurator';
import { linkStory, linkPropDefinitions } from '../link.stories';

export default function LinkConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-link"
      story={linkStory}
      propDefinitions={linkPropDefinitions}
    />
  );
}
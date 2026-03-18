'use client';

import { Configurator } from '@/components/playground/Configurator';
import { linkPureStory, linkPurePropDefinitions } from '../link-pure.stories';

export default function LinkPureConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-link-pure"
      story={linkPureStory}
      propDefinitions={linkPurePropDefinitions}
    />
  );
}

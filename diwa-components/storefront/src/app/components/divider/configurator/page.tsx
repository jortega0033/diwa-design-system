'use client';

import { Configurator } from '@/components/playground/Configurator';
import { dividerStory, dividerPropDefinitions } from '../divider.stories';

export default function DividerConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-divider"
      story={dividerStory}
      propDefinitions={dividerPropDefinitions}
    />
  );
}

'use client';

import { Configurator } from '@/components/playground/Configurator';
import { textListStory, textListPropDefinitions } from '../text-list.stories';

export default function TextListConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-text-list"
      story={textListStory}
      propDefinitions={textListPropDefinitions}
    />
  );
}

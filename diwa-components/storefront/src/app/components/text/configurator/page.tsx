'use client';

import { Configurator } from '@/components/playground/Configurator';
import { textStory, textPropDefinitions } from '../text.stories';

export default function TextConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-text"
      story={textStory}
      propDefinitions={textPropDefinitions}
    />
  );
}

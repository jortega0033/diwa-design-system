'use client';

import { Configurator } from '@/components/playground/Configurator';
import { textareaStory, textareaPropDefinitions } from '../textarea.stories';

export default function TextareaConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-textarea"
      story={textareaStory}
      propDefinitions={textareaPropDefinitions}
      previewClassName="w-full"
    />
  );
}

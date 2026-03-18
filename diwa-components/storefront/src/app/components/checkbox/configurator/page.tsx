'use client';

import { Configurator } from '@/components/playground/Configurator';
import { checkboxStory, checkboxPropDefinitions } from '../checkbox.stories';

export default function CheckboxConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-checkbox"
      story={checkboxStory}
      propDefinitions={checkboxPropDefinitions}
    />
  );
}

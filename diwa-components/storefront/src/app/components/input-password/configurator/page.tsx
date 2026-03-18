'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputPasswordStory, inputPasswordPropDefinitions } from '../input-password.stories';

export default function InputPasswordConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-input-password"
      story={inputPasswordStory}
      propDefinitions={inputPasswordPropDefinitions}
    />
  );
}

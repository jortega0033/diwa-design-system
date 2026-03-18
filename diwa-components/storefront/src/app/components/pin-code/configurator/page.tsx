'use client';

import { Configurator } from '@/components/playground/Configurator';
import { pinCodeStory, pinCodePropDefinitions } from '../pin-code.stories';

export default function PinCodeConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-pin-code"
      story={pinCodeStory}
      propDefinitions={pinCodePropDefinitions}
    />
  );
}

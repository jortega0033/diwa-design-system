'use client';

import { Configurator } from '@/components/playground/Configurator';
import { spinnerStory, spinnerPropDefinitions } from '../spinner.stories';

export default function SpinnerConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-spinner"
      story={spinnerStory}
      propDefinitions={spinnerPropDefinitions}
    />
  );
}

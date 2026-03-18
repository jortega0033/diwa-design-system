'use client';

import { Configurator } from '@/components/playground/Configurator';
import { stepperHorizontalStory, stepperHorizontalPropDefinitions } from '../stepper-horizontal.stories';

export default function StepperHorizontalConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-stepper-horizontal"
      story={stepperHorizontalStory}
      propDefinitions={stepperHorizontalPropDefinitions}
    />
  );
}

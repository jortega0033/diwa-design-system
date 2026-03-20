'use client';

import { Configurator } from '@/components/playground/Configurator';
import { stepperHorizontalStory, stepperHorizontalPropDefinitions } from '../stepper-horizontal.stories';

export default function StepperHorizontalConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-stepper-horizontal"
      story={stepperHorizontalStory}
      propDefinitions={stepperHorizontalPropDefinitions}
      previewClassName="!flex-col !items-stretch !justify-start px-8 py-10 w-full"
    />
  );
}

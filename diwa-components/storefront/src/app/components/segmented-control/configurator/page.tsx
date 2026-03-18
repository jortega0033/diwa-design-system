'use client';

import { Configurator } from '@/components/playground/Configurator';
import { segmentedControlStory, segmentedControlPropDefinitions } from '../segmented-control.stories';

export default function SegmentedControlConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-segmented-control"
      story={segmentedControlStory}
      propDefinitions={segmentedControlPropDefinitions}
    />
  );
}

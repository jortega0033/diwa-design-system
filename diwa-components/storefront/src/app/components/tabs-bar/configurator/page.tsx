'use client';

import { Configurator } from '@/components/playground/Configurator';
import { tabsBarStory, tabsBarPropDefinitions } from '../tabs-bar.stories';

export default function TabsBarConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-tabs-bar"
      story={tabsBarStory}
      propDefinitions={tabsBarPropDefinitions}
      previewClassName="w-full"
    />
  );
}

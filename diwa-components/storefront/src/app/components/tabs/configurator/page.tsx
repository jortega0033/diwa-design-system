'use client';

import { Configurator } from '@/components/playground/Configurator';
import { tabsStory, tabsPropDefinitions } from '../tabs.stories';

export default function TabsConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-tabs"
      story={tabsStory}
      propDefinitions={tabsPropDefinitions}
      previewClassName="w-full"
    />
  );
}

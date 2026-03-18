'use client';

import { Configurator } from '@/components/playground/Configurator';
import { badgeStory, badgePropDefinitions } from '../badge.stories';

export default function BadgeConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-badge"
      story={badgeStory}
      propDefinitions={badgePropDefinitions}
    />
  );
}
'use client';

import { Configurator } from '@/components/playground/Configurator';
import {
  inlineNotificationStory,
  inlineNotificationPropDefinitions,
} from '../inline-notification.stories';

export default function InlineNotificationConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-inline-notification"
      story={inlineNotificationStory}
      propDefinitions={inlineNotificationPropDefinitions}
    />
  );
}

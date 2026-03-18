'use client';

import { Configurator } from '@/components/playground/Configurator';
import { modalStory, modalPropDefinitions } from '../modal.stories';

export default function ModalConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-modal"
      story={modalStory}
      propDefinitions={modalPropDefinitions}
    />
  );
}

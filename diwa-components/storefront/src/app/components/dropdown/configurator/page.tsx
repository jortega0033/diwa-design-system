'use client';

import { Configurator } from '@/components/playground/Configurator';
import { dropdownStory, dropdownPropDefinitions } from '../dropdown.stories';

export default function DropdownConfiguratorPage() {
  return (
    <Configurator
      tagName="diwa-dropdown"
      story={dropdownStory}
      propDefinitions={dropdownPropDefinitions}
    />
  );
}

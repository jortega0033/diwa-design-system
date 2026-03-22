import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

/**
 * Main configurator story for diwa-divider.
 * Purely presentational — no events needed.
 */
export const dividerStory: Story<'diwa-divider'> = {
  state: {
    properties: {
      orientation: 'horizontal',
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-divider' as const,
        properties: attrs,
      },
    ];
  },
};

export const dividerPropDefinitions: PropDefinition[] = [
  {
    name: 'orientation',
    type: 'select',
    options: ['horizontal', 'vertical'],
    defaultValue: 'horizontal',
    description: 'Divider orientation; vertical is useful between inline elements',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
    description: 'Visual theme affecting divider colour and contrast',
  },
];

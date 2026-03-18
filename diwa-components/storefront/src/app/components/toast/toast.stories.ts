import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

/**
 * Toast is imperative — the configurator renders the container and a trigger
 * button. The preview iframe handles the button click via global script setup.
 */
export const toastStory: Story<'diwa-toast'> = {
  state: {
    properties: {
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-toast'>[] => [
    {
      tag: 'diwa-toast' as const,
      properties: {
        theme: properties?.theme as string | undefined,
      },
      children: [],
    },
  ],
};

export const toastPropDefinitions: PropDefinition[] = [
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
  },
];

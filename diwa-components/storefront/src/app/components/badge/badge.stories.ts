import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const badgeStory: Story<'diwa-badge'> = {
  state: {
    properties: {
      variant: 'neutral',
      size: 'md',
      label: '',
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-badge' as const,
      properties: {
        variant: properties?.variant as string | undefined,
        size: properties?.size as string | undefined,
        label: properties?.label as string | undefined,
        theme: properties?.theme as string | undefined,
      },
      children: ['Badge'],
    },
  ],
};

export const badgePropDefinitions: PropDefinition[] = [
  { name: 'variant', type: 'select', options: ['neutral', 'accent', 'success', 'warning', 'danger'], defaultValue: 'neutral' },
  { name: 'size', type: 'select', options: ['sm', 'md'], defaultValue: 'md' },
  { name: 'label', type: 'string', defaultValue: '' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark' },
];
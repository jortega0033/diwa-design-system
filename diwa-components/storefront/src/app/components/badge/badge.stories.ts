import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const badgeStory: Story<'diwa-badge'> = {
  state: {
    properties: {
      variant: 'neutral',
      size: 'md',
      text: 'Badge',
      dot: false,
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-badge' as const,
      properties: {
        variant: properties?.variant as string | undefined,
        size: properties?.size as string | undefined,
        dot: properties?.dot as boolean | undefined,
        theme: properties?.theme as string | undefined,
      },
      children: [(properties?.text as string) || 'Badge'],
    },
  ],
};

export const badgePropDefinitions: PropDefinition[] = [
  { name: 'variant', type: 'select', options: ['neutral', 'accent', 'info', 'success', 'warning', 'danger'], defaultValue: 'neutral', description: 'Semantic visual variant for the badge' },
  { name: 'size', type: 'select', options: ['sm', 'md'], defaultValue: 'md', description: 'Badge size / density' },
  { name: 'text', type: 'string', defaultValue: 'Badge', description: 'Slot content — visible badge text' },
  { name: 'dot', type: 'boolean', defaultValue: false, description: 'Show an animated pulsing dot indicator' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark', description: 'Visual theme for the badge' },
];
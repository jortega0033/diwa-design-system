import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

const TABS = ['Overview', 'Design', 'Implementation', 'Testing', 'Deployment', 'Monitoring', 'Security', 'Documentation'];

export const scrollerStory: Story<'diwa-scroller'> = {
  state: {
    properties: {
      scrollbar: false,
      alignScrollIndicator: 'center',
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-scroller'>[] => [
    {
      tag: 'diwa-scroller' as const,
      properties: {
        scrollbar: properties?.scrollbar as boolean | undefined,
        'align-scroll-indicator': properties?.alignScrollIndicator as string | undefined,
      },
      children: TABS.map((label) => ({
        tag: 'diwa-tag' as const,
        properties: { variant: 'neutral' },
        children: [label],
      })),
    },
  ],
};

export const scrollerPropDefinitions: PropDefinition[] = [
  {
    name: 'scrollbar',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'alignScrollIndicator',
    type: 'select',
    options: ['top', 'center', 'bottom'],
    defaultValue: 'center',
  },
];

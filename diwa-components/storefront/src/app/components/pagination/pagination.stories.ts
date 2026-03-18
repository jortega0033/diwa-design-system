import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

/**
 * Main configurator story for diwa-pagination.
 * Semi-controlled: the onupdate event updates `active-page` in story state.
 */
export const paginationStory: Story<'diwa-pagination'> = {
  state: {
    properties: {
      theme: 'dark',
      'total-items-count': 500,
      'items-per-page': 25,
      'active-page': 1,
      'show-last-page': true,
    },
  },
  generator: ({ properties } = {}) => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-pagination' as const,
        properties: attrs,
        events: {
          onupdate: {
            target: 'diwa-pagination',
            prop: 'active-page',
            eventValueKey: 'page',
          },
        },
      },
    ];
  },
};

export const paginationPropDefinitions: PropDefinition[] = [
  { name: 'total-items-count', type: 'number', defaultValue: 500 },
  { name: 'items-per-page', type: 'number', defaultValue: 25 },
  { name: 'active-page', type: 'number', defaultValue: 1 },
  { name: 'show-last-page', type: 'boolean', defaultValue: true },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark' },
];

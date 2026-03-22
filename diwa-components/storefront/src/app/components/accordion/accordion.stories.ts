import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

/**
 * Main configurator story for diwa-accordion.
 * Controlled component: the `onUpdate` event updates `open` in story state.
 */
export const accordionStory: Story<'diwa-accordion'> = {
  state: {
    properties: {
      theme: 'dark',
      heading: 'Some heading',
      headingTag: 'h2',
      open: false,
      compact: false,
    },
  },
  generator: ({ properties } = {}) => {
    const { ...attrs } = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-accordion' as const,
        properties: attrs,
        events: {
          // React 19 custom-element event mapping: slice(2) without lowercasing
          // so 'onupdate' → addEventListener('update') matching Stencil's dispatch.
          onupdate: {
            target: 'diwa-accordion',
            prop: 'open',
            eventValueKey: 'open',
          },
        },
        children: ['Slotted content goes here. You can place any text or markup inside the accordion panel.'],
      },
    ];
  },
};

export const accordionPropDefinitions: PropDefinition[] = [
  {
    name: 'heading',
    type: 'string',
    defaultValue: 'Some heading',
    description: 'Title text shown in the accordion header',
  },
  {
    name: 'headingTag',
    type: 'select',
    options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    defaultValue: 'h2',
    description: 'Semantic heading tag used for accessibility',
  },
  {
    name: 'open',
    type: 'boolean',
    defaultValue: false,
    description: 'Whether the accordion panel is expanded',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
    description: 'Use reduced spacing for a denser appearance',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
    description: 'Visual theme for the accordion (dark or light)',
  },
];

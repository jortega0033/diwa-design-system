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
  },
  {
    name: 'headingTag',
    type: 'select',
    options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    defaultValue: 'h2',
  },
  {
    name: 'open',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
  },
];

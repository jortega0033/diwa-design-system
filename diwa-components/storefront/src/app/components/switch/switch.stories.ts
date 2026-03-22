import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

export const switchStory: Story<'diwa-switch'> = {
  state: {
    properties: {
      checked: false,
      disabled: false,
      loading: false,
      alignLabel: 'end',
      compact: false,
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-switch'>[] => [
    {
      tag: 'diwa-switch' as const,
      properties: {
        checked: properties?.checked as boolean | undefined,
        disabled: properties?.disabled as boolean | undefined,
        loading: properties?.loading as boolean | undefined,
        'align-label': properties?.alignLabel as string | undefined,
        compact: properties?.compact as boolean | undefined,
      },
      events: {
        // Wire the component's controlled `update` event back to the `checked` state prop
        // so the preview reflects the toggle without manual prop panel interaction.
        onupdate: { target: 'diwa-switch', prop: 'checked', eventValueKey: 'checked' },
      },
      children: ['Enable feature'],
    },
  ],
};

export const switchPropDefinitions: PropDefinition[] = [
  {
    name: 'checked',
    type: 'boolean',
    defaultValue: false,
    description: 'Whether the switch is on (true) or off (false)',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disable interaction and show a muted style',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
    description: 'Show a loading indicator and prevent interaction',
  },
  {
    name: 'alignLabel',
    type: 'select',
    options: ['start', 'end'],
    defaultValue: 'end',
    description: 'Position of the label relative to the control',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
    description: 'Use tighter spacing for compact layouts',
  },
];

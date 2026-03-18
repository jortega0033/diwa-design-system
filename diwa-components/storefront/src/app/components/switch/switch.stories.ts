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
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'alignLabel',
    type: 'select',
    options: ['start', 'end'],
    defaultValue: 'end',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
  },
];

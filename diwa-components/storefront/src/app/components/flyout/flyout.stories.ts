import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Main configurator story for diwa-flyout.
 *
 * The flyout is a controlled component, so the story renders two elements:
 *  1. A trigger button whose `onclick` sets `open` to `true` in shared state.
 *  2. The flyout itself whose `ondismiss` sets `open` to `false`.
 *
 * `open` is intentionally omitted from the propDefinitions so it does not
 * appear as a manual boolean toggle in the configurator controls — it is
 * driven entirely by the button / dismiss interaction.
 */
export const flyoutStory: Story<'diwa-flyout'> = {
  state: {
    properties: {
      open: false,
      position: 'end',
      heading: 'Flyout title',
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}): (string | ElementConfig<HTMLTagOrComponent>)[] => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    const open = attrs.open ?? false;
    const position = attrs.position ?? 'end';
    const heading = attrs.heading ?? 'Flyout title';
    const theme = attrs.theme ?? 'dark';

    return [
      {
        tag: 'diwa-button' as const,
        properties: { theme },
        events: {
          onclick: {
            target: 'diwa-flyout',
            prop: 'open',
            value: true,
          },
        },
        children: ['Open Flyout'],
      },
      {
        tag: 'diwa-flyout' as const,
        properties: { open, position, heading, theme },
        events: {
          ondismiss: {
            target: 'diwa-flyout',
            prop: 'open',
            value: false,
          },
        },
        children: [
          'This is the flyout body content. Add any text, forms, or components here.',
        ],
      },
    ];
  },
};

export const flyoutPropDefinitions: PropDefinition[] = [
  {
    name: 'heading',
    type: 'string',
    defaultValue: 'Flyout title',
    description: 'Title shown at the top of the flyout',
  },
  {
    name: 'position',
    type: 'select',
    options: ['end', 'start'],
    defaultValue: 'end',
    description: 'Attachment side for the flyout relative to the trigger',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
    description: 'Visual theme for flyout surface and controls',
  },
];

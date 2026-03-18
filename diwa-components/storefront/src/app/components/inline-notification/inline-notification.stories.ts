import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

/**
 * Main configurator story for diwa-inline-notification.
 *
 * The inline-notification is a static display component — no trigger button is
 * required. The story renders a single notification element whose props can be
 * adjusted live via the configurator controls.
 *
 * `actionLabel` defaults to empty (no action button rendered). Setting it in
 * the configurator controls causes the action button to appear.
 */
export const inlineNotificationStory: Story<'diwa-inline-notification'> = {
  state: {
    properties: {
      state: 'info',
      heading: 'Some heading',
      description: 'Some description.',
      theme: 'dark',
      dismissButton: true,
      actionLabel: '',
    },
  },
  generator: ({ properties } = {}) => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    const actionLabel = attrs.actionLabel as string | undefined;

    return [
      {
        tag: 'diwa-inline-notification' as const,
        properties: {
          state: attrs.state ?? 'info',
          heading: attrs.heading ?? 'Some heading',
          description: attrs.description ?? 'Some description.',
          theme: attrs.theme ?? 'dark',
          dismissButton: attrs.dismissButton ?? true,
          ...(actionLabel ? { actionLabel } : {}),
        },
      },
    ];
  },
};

export const inlineNotificationPropDefinitions: PropDefinition[] = [
  {
    name: 'state',
    type: 'select',
    options: ['info', 'success', 'warning', 'error'],
    defaultValue: 'info',
  },
  {
    name: 'heading',
    type: 'string',
    defaultValue: 'Some heading',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: 'Some description.',
  },
  {
    name: 'dismissButton',
    type: 'boolean',
    defaultValue: true,
  },
  {
    name: 'actionLabel',
    type: 'string',
    defaultValue: '',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
  },
];

import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

export const bannerStory: Story<'diwa-banner'> = {
  state: {
    properties: {
      open: false,
      state: 'info',
      heading: 'Some heading',
      description: 'Some description.',
      persistent: false,
      duration: 6000,
      dismissButton: true,
      actionLabel: '',
      actionLoading: false,
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => {
    const attrs = (properties ?? {}) as Record<string, unknown>;
    const actionLabel = attrs.actionLabel as string | undefined;

    return [
      {
        tag: 'diwa-banner' as const,
        properties: {
          open: attrs.open ?? false,
          state: attrs.state ?? 'info',
          heading: attrs.heading ?? 'Some heading',
          description: attrs.description ?? 'Some description.',
          persistent: attrs.persistent ?? false,
          duration: attrs.duration ?? 6000,
          dismissButton: attrs.dismissButton ?? true,
          actionLoading: attrs.actionLoading ?? false,
          theme: attrs.theme ?? 'dark',
          ...(actionLabel ? { actionLabel } : {}),
        },
      },
    ];
  },
};

export const bannerPropDefinitions: PropDefinition[] = [
  {
    name: 'open',
    type: 'boolean',
    defaultValue: false,
    description: 'Controls visibility. Default is closed until explicitly opened.',
  },
  {
    name: 'state',
    type: 'select',
    options: ['info', 'success', 'warning', 'error'],
    defaultValue: 'info',
    description: 'Semantic state which controls color treatment, icon, and ARIA urgency.',
  },
  {
    name: 'heading',
    type: 'string',
    defaultValue: 'Some heading',
    description: 'Primary heading text shown before description.',
  },
  {
    name: 'description',
    type: 'string',
    defaultValue: 'Some description.',
    description: 'Supporting text content. Use slot content when richer markup is required.',
  },
  {
    name: 'persistent',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, disables auto-dismiss regardless of duration.',
  },
  {
    name: 'duration',
    type: 'number',
    defaultValue: 6000,
    min: 0,
    step: 100,
    description: 'Auto-dismiss delay in milliseconds when persistent is false. Use 0 to disable timer.',
  },
  {
    name: 'dismissButton',
    type: 'boolean',
    defaultValue: true,
    description: 'Show or hide the dismiss icon button.',
  },
  {
    name: 'actionLabel',
    type: 'string',
    defaultValue: '',
    description: 'Optional label for the action button. Empty hides the action.',
  },
  {
    name: 'actionLoading',
    type: 'boolean',
    defaultValue: false,
    description: 'Show loading state on action button.',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
    description: 'Visual theme for the component.',
  },
];

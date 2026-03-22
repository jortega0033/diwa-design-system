import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';
import { ICON_NAMES } from '@/app/components/icon/icon.stories';

export const tagStory: Story<'diwa-tag'> = {
  state: {
    properties: {
      variant: 'neutral',
      compact: false,
      icon: 'none',
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-tag'>[] => {
    const icon = properties?.icon as string | undefined;
    return [
      {
        tag: 'diwa-tag' as const,
        properties: {
          variant: properties?.variant as string | undefined,
          compact: properties?.compact as boolean | undefined,
          // 'none' means no icon — omit the prop entirely
          ...(icon && icon !== 'none' ? { icon } : {}),
        },
        children: ['Status'],
      },
    ];
  },
};

export const tagPropDefinitions: PropDefinition[] = [
  {
    name: 'variant',
    type: 'select',
    options: ['neutral', 'primary', 'info', 'success', 'warning', 'error'],
    defaultValue: 'neutral',
    description: 'Visual variant/semantic color of the tag',
  },
  {
    name: 'compact',
    type: 'boolean',
    defaultValue: false,
    description: 'Use a smaller, compact appearance',
  },
  {
    name: 'icon',
    type: 'select',
    options: ['none', ...ICON_NAMES],
    defaultValue: 'none',
    description: 'Optional leading icon name (omit for no icon)',
  },
];

import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig } from '@/utils/generator/generator';

export const dropdownStory: Story<'diwa-dropdown'> = {
  state: {
    properties: {
      placement: 'bottom-start',
      strategy: 'fixed',
      disabled: false,
      submenu: false,
      closeOnSelect: true,
      matchTriggerWidth: false,
      offsetPx: 6,
      triggerLabel: 'Actions',
      triggerVariant: 'secondary',
      triggerSize: 'sm',
      triggerIcon: 'none',
      hideTriggerLabel: false,
    },
  },
  generator: ({ properties } = {}): ElementConfig<'diwa-dropdown'>[] => [
    {
      tag: 'diwa-dropdown' as const,
      properties: {
        placement: properties?.placement as string | undefined,
        strategy: properties?.strategy as string | undefined,
        disabled: properties?.disabled as boolean | undefined,
        submenu: properties?.submenu as boolean | undefined,
        closeOnSelect: properties?.closeOnSelect as boolean | undefined,
        matchTriggerWidth: properties?.matchTriggerWidth as boolean | undefined,
        offsetPx: properties?.offsetPx as number | undefined,
        triggerLabel: properties?.triggerLabel as string | undefined,
        triggerVariant: properties?.triggerVariant as string | undefined,
        triggerSize: properties?.triggerSize as string | undefined,
        triggerIcon: properties?.triggerIcon as string | undefined,
        hideTriggerLabel: properties?.hideTriggerLabel as boolean | undefined,
      },
      children: [
        {
          tag: 'button',
          properties: {
            role: 'menuitem',
            type: 'button',
            'data-dropdown-value': 'edit',
          },
          children: ['Edit'],
        },
        {
          tag: 'button',
          properties: {
            role: 'menuitem',
            type: 'button',
            'data-dropdown-value': 'duplicate',
          },
          children: ['Duplicate'],
        },
        {
          tag: 'div',
          properties: {
            'data-dropdown-separator': 'true',
          },
        },
        {
          tag: 'button',
          properties: {
            role: 'menuitem',
            type: 'button',
            'data-dropdown-value': 'archive',
          },
          children: ['Archive'],
        },
      ],
    },
  ],
};

export const dropdownPropDefinitions: PropDefinition[] = [
  {
    name: 'placement',
    type: 'select',
    options: ['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end', 'right-start', 'left-start'],
    defaultValue: 'bottom-start',
    description: 'Preferred menu placement relative to the trigger.',
  },
  {
    name: 'strategy',
    type: 'select',
    options: ['fixed', 'absolute'],
    defaultValue: 'fixed',
    description: 'Positioning strategy used by Floating UI.',
  },
  {
    name: 'offsetPx',
    type: 'number',
    defaultValue: 6,
    min: 0,
    max: 40,
    step: 1,
    description: 'Distance in pixels between trigger and dropdown panel.',
  },
  {
    name: 'closeOnSelect',
    type: 'boolean',
    defaultValue: true,
    description: 'When true, closes the menu after selecting an item.',
  },
  {
    name: 'matchTriggerWidth',
    type: 'boolean',
    defaultValue: false,
    description: 'When true, panel min-width matches trigger width.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: false,
    description: 'Disables trigger interaction.',
  },
  {
    name: 'submenu',
    type: 'boolean',
    defaultValue: false,
    description: 'Nested submenu mode. Forces side placement and ArrowLeft/ArrowRight keyboard behavior.',
  },
  {
    name: 'triggerLabel',
    type: 'string',
    defaultValue: 'Actions',
    description: 'Fallback trigger text when no trigger slot is provided.',
  },
  {
    name: 'triggerVariant',
    type: 'select',
    options: ['primary', 'secondary', 'ghost', 'danger'],
    defaultValue: 'secondary',
    description: 'Fallback trigger diwa-button variant.',
  },
  {
    name: 'triggerSize',
    type: 'select',
    options: ['xs', 'sm', 'md', 'lg'],
    defaultValue: 'sm',
    description: 'Fallback trigger diwa-button size.',
  },
  {
    name: 'triggerIcon',
    type: 'select',
    options: ['none', 'chevron-down', 'more-horizontal', 'more-vertical', 'settings', 'plus', 'x', 'sliders'],
    defaultValue: 'none',
    description: 'Fallback trigger icon name (Lucide). Select "none" for no icon.',
  },
  {
    name: 'hideTriggerLabel',
    type: 'boolean',
    defaultValue: false,
    description: 'Hide fallback trigger label for icon-only trigger.',
  },
];

export const dropdownBasicStory: Story<'diwa-dropdown'> = {
  state: {},
  generator: () => [
    {
      tag: 'diwa-dropdown' as const,
      properties: { triggerLabel: 'Actions', triggerVariant: 'secondary' },
      children: [
        { tag: 'button', properties: { role: 'menuitem', type: 'button', 'data-dropdown-value': 'edit' }, children: ['Edit'] },
        { tag: 'button', properties: { role: 'menuitem', type: 'button', 'data-dropdown-value': 'copy' }, children: ['Duplicate'] },
        { tag: 'button', properties: { role: 'menuitem', type: 'button', 'data-dropdown-value': 'archive' }, children: ['Archive'] },
      ],
    },
  ],
};

export const dropdownCustomTriggerStory: Story<'diwa-dropdown'> = {
  state: {},
  generator: () => [
    {
      tag: 'diwa-dropdown' as const,
      properties: { placement: 'bottom-end' },
      children: [
        {
          tag: 'diwa-button',
          properties: {
            slot: 'trigger',
            variant: 'primary',
            icon: 'chevron-down',
          },
          children: ['Project menu'],
        },
        { tag: 'button', properties: { role: 'menuitem', type: 'button', 'data-dropdown-value': 'rename' }, children: ['Rename project'] },
        { tag: 'button', properties: { role: 'menuitem', type: 'button', 'data-dropdown-value': 'move' }, children: ['Move to workspace'] },
        { tag: 'button', properties: { role: 'menuitem', type: 'button', 'data-dropdown-value': 'settings' }, children: ['Project settings'] },
      ],
    },
  ],
};

export const dropdownNestedStory: Story<'diwa-dropdown'> = {
  state: {},
  generator: () => [
    {
      tag: 'diwa-dropdown' as const,
      properties: { triggerLabel: 'Command palette', placement: 'bottom-start' },
      children: [
        { tag: 'button', properties: { role: 'menuitem', type: 'button', 'data-dropdown-value': 'new-file' }, children: ['New file'] },
        {
          tag: 'diwa-dropdown',
          properties: {
            submenu: true,
            triggerLabel: 'Share',
            triggerSize: 'sm',
          },
          children: [
            { tag: 'button', properties: { role: 'menuitem', type: 'button', 'data-dropdown-value': 'share-slack' }, children: ['Slack'] },
            { tag: 'button', properties: { role: 'menuitem', type: 'button', 'data-dropdown-value': 'share-email' }, children: ['Email'] },
            { tag: 'button', properties: { role: 'menuitem', type: 'button', 'data-dropdown-value': 'share-link' }, children: ['Copy link'] },
          ],
        },
        { tag: 'button', properties: { role: 'menuitem', type: 'button', 'data-dropdown-value': 'delete' }, children: ['Delete'] },
      ],
    },
  ],
};

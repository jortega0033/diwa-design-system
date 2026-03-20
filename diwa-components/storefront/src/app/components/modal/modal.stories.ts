import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Configurator story for diwa-modal.
 * Mirrors Diwa's modal story pattern for controlled open/close behavior.
 *
 * The story renders a trigger <diwa-button> alongside the <diwa-modal>.
 * EventConfig wires the button click → open:true and dismiss → open:false,
 * so the full controlled-component pattern is live and interactive.
 */
export const modalStory: Story<'diwa-modal'> = {
  state: {
    properties: {
      open: false,
      heading: 'Dialog title',
      dismissButton: true,
      disableBackdropClick: false,
      backdrop: 'blur',
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => {
    const props = (properties ?? {}) as Record<string, unknown>;
    return [
      {
        tag: 'diwa-button' as const,
        properties: { variant: 'primary' },
        children: ['Open Modal'],
        events: {
          onClick: { target: 'diwa-button', prop: 'open', value: true },
        },
      },
      {
        tag: 'diwa-modal' as const,
        properties: {
          open: props['open'] ?? false,
          heading: props['heading'] ?? 'Dialog title',
          dismissButton: props['dismissButton'] ?? true,
          disableBackdropClick: props['disableBackdropClick'] ?? false,
          backdrop: props['backdrop'] ?? 'blur',
          theme: props['theme'] ?? 'dark',
        },
        children: [
          'This is the modal body. Add your content here — forms, descriptions, or any interactive elements that require the user\'s full attention.',
        ],
        events: {
          ondismiss: { target: 'diwa-modal', prop: 'open', value: false },
        },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

export const modalPropDefinitions: PropDefinition[] = [
  { name: 'open', type: 'boolean', defaultValue: false, group: 'State', description: 'Controls modal visibility.' },
  { name: 'heading', type: 'string', defaultValue: 'Dialog title', group: 'Content' },
  { name: 'dismissButton', type: 'boolean', defaultValue: true, group: 'Behavior', description: 'Shows the close/dismiss button in the header.' },
  { name: 'disableBackdropClick', type: 'boolean', defaultValue: false, group: 'Behavior', description: 'Prevents closing when clicking the backdrop.' },
  { name: 'backdrop', type: 'select', options: ['blur', 'shading'], defaultValue: 'blur', group: 'Appearance' },
  { name: 'theme', type: 'select', options: ['dark', 'light'], defaultValue: 'dark', group: 'Appearance' },
];

// ── Static example stories ────────────────────────────────────────────────

/** Basic modal — heading + body copy only, no footer. */
export const modalStoryBasic: Story<'diwa-modal'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'diwa-button' as const,
        properties: { variant: 'primary' },
        children: ['Open Modal'],
        events: { onClick: { target: 'diwa-modal', prop: 'open', value: true } },
      },
      {
        tag: 'diwa-modal' as const,
        properties: { open, heading: 'About Diwa' },
        children: [
          'Diwa Design System provides a set of accessible, framework-agnostic Web Components built with Stencil.js.',
        ],
        events: { ondismiss: { target: 'diwa-modal', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Modal with a sticky footer containing action buttons. */
export const modalStoryWithFooter: Story<'diwa-modal'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'diwa-button' as const,
        properties: { variant: 'primary' },
        children: ['Open Modal'],
        events: { onClick: { target: 'diwa-modal', prop: 'open', value: true } },
      },
      {
        tag: 'diwa-modal' as const,
        properties: { open, heading: 'Confirm deletion' },
        children: [
          'Are you sure you want to delete this item? This action cannot be undone.',
          {
            tag: 'div' as const,
            properties: { slot: 'footer', style: { display: 'flex', gap: '8px' } },
            children: [
              { tag: 'diwa-button' as const, properties: { variant: 'danger' }, children: ['Delete'] },
              { tag: 'diwa-button' as const, properties: { variant: 'secondary' }, children: ['Cancel'] },
            ],
          },
        ],
        events: { ondismiss: { target: 'diwa-modal', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Modal with a sub-header description below the title bar. */
export const modalStoryWithHeader: Story<'diwa-modal'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'diwa-button' as const,
        properties: { variant: 'primary' },
        children: ['Open Modal'],
        events: { onClick: { target: 'diwa-modal', prop: 'open', value: true } },
      },
      {
        tag: 'diwa-modal' as const,
        properties: { open, heading: 'Update settings' },
        children: [
          {
            tag: 'p' as const,
            properties: { slot: 'header', style: { margin: '0', fontSize: '13px', color: 'var(--diwa-text-secondary)' } },
            children: ['Changes take effect immediately and apply across all sessions.'],
          },
          'Adjust your preferences below. All settings are saved automatically.',
          {
            tag: 'div' as const,
            properties: { slot: 'footer', style: { display: 'flex', gap: '8px' } },
            children: [
              { tag: 'diwa-button' as const, properties: { variant: 'primary' }, children: ['Save changes'] },
              { tag: 'diwa-button' as const, properties: { variant: 'ghost' }, children: ['Discard'] },
            ],
          },
        ],
        events: { ondismiss: { target: 'diwa-modal', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Modal with long scrollable body content. */
export const modalStoryScrollable: Story<'diwa-modal'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'diwa-button' as const,
        properties: { variant: 'primary' },
        children: ['Open Modal'],
        events: { onClick: { target: 'diwa-modal', prop: 'open', value: true } },
      },
      {
        tag: 'diwa-modal' as const,
        properties: { open, heading: 'Terms of Service' },
        children: [
          Array.from({ length: 8 }, (_, i) =>
            `Section ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. `,
          ).join('\n\n'),
          {
            tag: 'div' as const,
            properties: { slot: 'footer', style: { display: 'flex', gap: '8px' } },
            children: [
              { tag: 'diwa-button' as const, properties: { variant: 'primary' }, children: ['Accept'] },
              { tag: 'diwa-button' as const, properties: { variant: 'secondary' }, children: ['Decline'] },
            ],
          },
        ],
        events: { ondismiss: { target: 'diwa-modal', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

/** Shading backdrop variant. */
export const modalStoryShadingBackdrop: Story<'diwa-modal'> = {
  state: { properties: { open: false } },
  generator: ({ properties } = {}) => {
    const open = (properties ?? {})['open'] ?? false;
    return [
      {
        tag: 'diwa-button' as const,
        properties: { variant: 'primary' },
        children: ['Open Modal'],
        events: { onClick: { target: 'diwa-modal', prop: 'open', value: true } },
      },
      {
        tag: 'diwa-modal' as const,
        properties: { open, heading: 'Session expired', backdrop: 'shading', disableBackdropClick: true, dismissButton: false },
        children: [
          'Your session has expired due to inactivity. Please sign in again to continue.',
          {
            tag: 'div' as const,
            properties: { slot: 'footer' },
            children: [
              { tag: 'diwa-button' as const, properties: { variant: 'primary' }, children: ['Sign in'] },
            ],
          },
        ],
        events: { ondismiss: { target: 'diwa-modal', prop: 'open', value: false } },
      },
    ] as (string | ElementConfig<HTMLTagOrComponent> | undefined)[];
  },
};

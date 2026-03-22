import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

/** Curated set of Lucide icons relevant to a UI design system, grouped by category. */
export const ICON_NAMES = [
  // Arrows & direction
  'arrow-down', 'arrow-down-left', 'arrow-down-right', 'arrow-left', 'arrow-right',
  'arrow-right-left', 'arrow-up', 'arrow-up-down', 'arrow-up-left', 'arrow-up-right',
  'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up',
  'chevrons-left-right', 'chevrons-up-down',
  'corner-down-right', 'corner-up-left',
  'external-link', 'move', 'move-horizontal', 'move-vertical',
  'redo2', 'refresh-cw', 'refresh-ccw', 'rotate-ccw', 'rotate-cw', 'undo2',
  // Actions
  'archive', 'archive-restore', 'check', 'check-check',
  'clipboard', 'clipboard-check', 'clipboard-copy', 'clipboard-list',
  'copy', 'crop', 'download', 'edit2', 'edit3',
  'filter', 'filter-x', 'forward', 'grip', 'grip-horizontal', 'grip-vertical',
  'link', 'link2', 'minus', 'paperclip', 'pen', 'pen-line', 'pencil',
  'plus', 'reply', 'save', 'search', 'send', 'share2', 'trash-2', 'unlink',
  'upload', 'x', 'zoom-in', 'zoom-out',
  // UI controls
  'cog', 'columns2', 'columns3', 'ellipsis', 'ellipsis-vertical',
  'eye', 'eye-off', 'grid2x2', 'grid3x3',
  'layout-dashboard', 'layout-grid', 'layout-list',
  'maximize', 'maximize2', 'menu', 'minimize', 'minimize2',
  'more-horizontal', 'more-vertical',
  'panel-bottom', 'panel-left', 'panel-right', 'panel-top',
  'rows2', 'rows3', 'settings', 'settings2', 'sidebar',
  'sliders', 'sliders-horizontal', 'sliders-vertical',
  'toggle-left', 'toggle-right',
  // Notifications & status
  'alert-circle', 'alert-octagon', 'alert-triangle',
  'badge-alert', 'badge-check', 'badge-info', 'badge-x',
  'bell', 'bell-dot', 'bell-off', 'bell-ring',
  'check-circle', 'check-circle2', 'circle-help', 'info',
  'loader', 'loader-circle', 'x-circle',
  // People & accounts
  'contact', 'contact-round', 'fingerprint', 'id-card',
  'log-in', 'log-out',
  'user', 'user-check', 'user-plus', 'user-round', 'user-x', 'users',
  // Security
  'key', 'key-round', 'lock', 'lock-open', 'shield', 'shield-alert', 'shield-check', 'shield-x', 'unlock',
  // Communication
  'headphones', 'inbox',
  'mail', 'mail-check', 'mail-open', 'mail-plus', 'mailbox',
  'message-circle', 'message-square', 'message-square-more',
  'mic', 'mic-off', 'phone', 'phone-call', 'phone-off',
  // Files & docs
  'file', 'file-check', 'file-code', 'file-image', 'file-json',
  'file-minus', 'file-plus', 'file-text', 'file-x',
  'folder', 'folder-open', 'folder-plus',
  // Time & calendar
  'alarm-clock', 'calendar', 'calendar-check', 'calendar-days', 'clock', 'hourglass', 'timer',
  // Media
  'audio-lines', 'camera', 'fast-forward', 'image', 'music',
  'pause', 'play', 'rewind', 'skip-back', 'skip-forward', 'stop-circle',
  'video', 'volume-off', 'volume-x', 'volume2',
  // Design & dev
  'braces', 'brush', 'bug', 'code', 'code2', 'cpu',
  'figma', 'git-branch', 'github',
  'layers', 'layers2', 'layers3', 'palette', 'pen-tool', 'rocket',
  'ruler', 'sparkle', 'terminal', 'zap',
  // Shopping & finance
  'banknote', 'coins', 'credit-card', 'gift', 'package',
  'percent', 'receipt', 'shopping-bag', 'shopping-cart', 'tag', 'wallet',
  // Charts & analytics
  'activity', 'bar-chart', 'bar-chart2', 'chart-bar', 'chart-line', 'line-chart', 'pie-chart',
  'trending-down', 'trending-up',
  // Maps & location
  'building', 'compass', 'globe', 'home', 'map', 'map-pin', 'navigation',
  // Misc
  'at-sign', 'award', 'bookmark', 'flag', 'hash', 'heart', 'medal',
  'moon', 'ribbon', 'star', 'sun', 'sun-moon', 'target',
];

export const iconStory: Story<'diwa-icon'> = {
  state: {
    properties: {
      name: 'star',
      size: 24,
      color: 'currentColor',
      theme: 'dark',
    },
  },
  generator: ({ properties } = {}) => {
    const { size, ...rest } = properties ?? {};
    return [
      {
        tag: 'diwa-icon' as const,
        properties: { ...rest, size: Number(size ?? 24) },
        children: [],
      },
    ];
  },
};

/** Sizes example — shows all available size values */
export const iconStorySizes: Story<'diwa-icon'> = {
  state: { properties: { name: 'star', size: 24, color: 'currentColor', theme: 'dark' } },
  generator: () =>
    ([16, 20, 24, 32, 48] as const).map((size) => ({
      tag: 'diwa-icon' as const,
      properties: { name: 'star', size, color: 'currentColor', theme: 'dark' },
      children: [],
    })),
};

/** Decorative icon — aria-hidden, used purely visually */
export const iconStoryDecorative: Story<'diwa-icon'> = {
  state: { properties: { name: 'info', size: 20, color: 'currentColor', theme: 'dark' } },
  generator: () => [
    {
      tag: 'diwa-icon' as const,
      properties: { name: 'info', size: 20, color: 'currentColor', theme: 'dark' },
      children: [],
    },
  ],
};

/** Semantic icons — carries a label announced to screen readers */
export const iconStoryAccessible: Story<'diwa-icon'> = {
  state: {
    properties: { name: 'bell', size: 24, color: 'currentColor', label: 'Notifications', theme: 'dark' },
  },
  generator: () => [
    {
      tag: 'diwa-icon' as const,
      properties: { name: 'bell', size: 24, color: 'currentColor', label: 'Notifications', theme: 'dark' },
      children: [],
    },
  ],
};

/** Common icon set — a representative selection */
export const iconStorySet: Story<'diwa-icon'> = {
  state: { properties: { name: 'star', size: 24, color: 'currentColor', theme: 'dark' } },
  generator: () =>
    [
      'home', 'search', 'bell', 'user', 'settings', 'mail',
      'heart', 'star', 'download', 'trash-2', 'edit3', 'lock',
      'check', 'x', 'plus', 'minus', 'arrow-right', 'arrow-left',
      'info', 'alert-triangle', 'copy', 'external-link', 'eye', 'filter',
    ].map((name) => ({
      tag: 'diwa-icon' as const,
      properties: { name, size: 24, color: 'currentColor', theme: 'dark' },
      children: [],
    })),
};

export const iconPropDefinitions: PropDefinition[] = [
  {
    name: 'name',
    type: 'select',
    options: ICON_NAMES,
    defaultValue: 'star',
    description: 'The icon name to render from the curated set',
  },
  {
    name: 'size',
    type: 'select',
    options: ['16', '20', '24', '32', '48'],
    defaultValue: '24',
    description: 'Icon size in pixels',
  },
  {
    name: 'color',
    type: 'select',
    options: [
      'currentColor',
      'var(--diwa-text-primary)',
      'var(--diwa-text-secondary)',
      'var(--diwa-text-tertiary)',
      'var(--diwa-text-muted)',
      'var(--diwa-text-disabled)',
      'var(--diwa-text-inverse)',
      'var(--diwa-accent)',
      'var(--diwa-notification-success)',
      'var(--diwa-notification-warning)',
      'var(--diwa-notification-error)',
      'var(--diwa-notification-info)',
    ],
    defaultValue: 'currentColor',
    description: 'CSS color or token; `currentColor` inherits the surrounding text color',
  },
  {
    name: 'label',
    type: 'string',
    defaultValue: '',
    description: 'Accessible label for semantic icons; leave empty for decorative icons',
  },
  {
    name: 'theme',
    type: 'select',
    options: ['dark', 'light'],
    defaultValue: 'dark',
    description: 'Visual theme for icon display (affects example background)',
  },
];

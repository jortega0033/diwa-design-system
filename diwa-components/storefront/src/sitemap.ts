/** Navigation tree for the diwa storefront sidebar. */
export type NavItem = {
  label: string;
  href: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const sitemap: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '/' },
    ],
  },
  {
    title: 'Designing',
    items: [
      { label: 'Introduction', href: '/designing' },
    ],
  },
  {
    title: 'Developing',
    items: [
      { label: 'Introduction', href: '/developing' },
      { label: 'Vanilla JS', href: '/developing/vanilla-js' },
      { label: 'Next.js', href: '/developing/next-js' },
      { label: 'React', href: '/developing/react' },
      { label: 'Angular', href: '/developing/angular' },
      { label: 'Vue', href: '/developing/vue' },
      { label: 'Components Ready', href: '/developing/components-ready' },
    ],
  },
  {
    title: 'Partials',
    items: [
      { label: 'Introduction', href: '/partials' },
      { label: 'Loader Script', href: '/partials/loader-script' },
      { label: 'Initial Styles', href: '/partials/initial-styles' },
      { label: 'Component Chunk Links', href: '/partials/component-chunk-links' },
      { label: 'DSR Ponyfill', href: '/partials/dsr-ponyfill' },
      { label: 'Browser Support Fallback', href: '/partials/browser-support-fallback' },
    ],
  },
  {
    title: 'Patterns',
    items: [
      { label: 'Introduction', href: '/patterns' },
      { label: 'Forms', href: '/patterns/forms' },
      { label: 'Notifications', href: '/patterns/notifications' },
    ],
  },
  {
    title: 'Must Know',
    items: [
      { label: 'Introduction', href: '/must-know' },
      { label: 'Initialization', href: '/must-know/initialization' },
      { label: 'Performance', href: '/must-know/performance' },
      { label: 'Accessibility', href: '/must-know/accessibility' },
      { label: 'Security', href: '/must-know/security' },
      { label: 'Browser Compatibility', href: '/must-know/browser-compatibility' },
      { label: 'Versioning', href: '/must-know/versioning' },
      { label: 'Definition of Done', href: '/must-know/definition-of-done' },
    ],
  },
  {
    title: 'Help',
    items: [
      { label: 'Introduction', href: '/help' },
      { label: 'Support', href: '/help/support' },
      { label: 'FAQ', href: '/help/faq' },
      { label: 'Feature Request', href: '/help/feature-request' },
      { label: 'Bug Report', href: '/help/bug-report' },
      { label: 'Contribution', href: '/help/contribution' },
    ],
  },
  {
    title: 'News',
    items: [
      { label: 'Changelog', href: '/news/changelog' },
      { label: 'Roadmap', href: '/news/roadmap' },
      { label: 'Migration Guide', href: '/news/migration-guide' },
    ],
  },
  {
    title: 'Styles',
    items: [
      { label: 'Introduction', href: '/styles' },
      { label: 'Border', href: '/styles/border' },
      { label: 'Drop Shadow', href: '/styles/drop-shadow' },
      { label: 'Focus', href: '/styles/focus' },
      { label: 'Frosted Glass', href: '/styles/frosted-glass' },
      { label: 'Gradient', href: '/styles/gradient' },
      { label: 'Grid', href: '/styles/grid' },
      { label: 'Hover', href: '/styles/hover' },
      { label: 'Media Query', href: '/styles/media-query' },
      { label: 'Motion', href: '/styles/motion' },
      { label: 'Skeleton', href: '/styles/skeleton' },
      { label: 'Spacing', href: '/styles/spacing' },
      { label: 'Theme', href: '/styles/theme' },
      { label: 'Typography', href: '/styles/typography' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Introduction', href: '/components' },
      { label: 'Accordion', href: '/components/accordion/configurator' },
      { label: 'Badge', href: '/components/badge/configurator' },
      { label: 'Button', href: '/components/button/configurator' },
      { label: 'Button Pure', href: '/components/button-pure/configurator' },
      { label: 'Checkbox', href: '/components/checkbox/configurator' },
      { label: 'Divider', href: '/components/divider/configurator' },
      { label: 'Flyout', href: '/components/flyout/configurator' },
      { label: 'Icon', href: '/components/icon/configurator' },
      { label: 'Inline Notification', href: '/components/inline-notification/configurator' },
      { label: 'Input Date', href: '/components/input-date/configurator' },
      { label: 'Input Email', href: '/components/input-email/configurator' },
      { label: 'Input Month', href: '/components/input-month/configurator' },
      { label: 'Input Number', href: '/components/input-number/configurator' },
      { label: 'Input Password', href: '/components/input-password/configurator' },
      { label: 'Input Search', href: '/components/input-search/configurator' },
      { label: 'Input Tel', href: '/components/input-tel/configurator' },
      { label: 'Input Text', href: '/components/input-text/configurator' },
      { label: 'Input Time', href: '/components/input-time/configurator' },
      { label: 'Input Url', href: '/components/input-url/configurator' },
      { label: 'Input Week', href: '/components/input-week/configurator' },
      { label: 'Link', href: '/components/link/configurator' },
      { label: 'Link Pure', href: '/components/link-pure/configurator' },
      { label: 'Modal', href: '/components/modal/configurator' },
      { label: 'Multi Select', href: '/components/multi-select/configurator' },
      { label: 'Pagination', href: '/components/pagination/configurator' },
      { label: 'Pin Code', href: '/components/pin-code/configurator' },
      { label: 'Popover', href: '/components/popover/configurator' },
      { label: 'Radio Group', href: '/components/radio-group/configurator' },
      { label: 'Scroller', href: '/components/scroller/configurator' },
      { label: 'Segmented Control', href: '/components/segmented-control/configurator' },
      { label: 'Select', href: '/components/select/configurator' },
      { label: 'Spinner', href: '/components/spinner/configurator' },
      { label: 'Stepper Horizontal', href: '/components/stepper-horizontal/configurator' },
      { label: 'Switch', href: '/components/switch/configurator' },
      { label: 'Table', href: '/components/table/configurator' },
      { label: 'Tabs', href: '/components/tabs/configurator' },
      { label: 'Tabs Bar', href: '/components/tabs-bar/configurator' },
      { label: 'Tag', href: '/components/tag/configurator' },
      { label: 'Text', href: '/components/text/configurator' },
      { label: 'Text List', href: '/components/text-list/configurator' },
      { label: 'Textarea', href: '/components/textarea/configurator' },
      { label: 'Toast', href: '/components/toast/configurator' },
    ],
  },
];

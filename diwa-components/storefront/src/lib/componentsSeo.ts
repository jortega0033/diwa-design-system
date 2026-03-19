import type { Metadata } from 'next';
import { buildMetadata } from './seo';

/**
 * Metadata for every component route.
 * Keyed by the component slug (e.g. 'accordion').
 * The canonical URL points to the Configurator tab — the primary entry point.
 */
export const componentsSeo: Record<string, Metadata> = {
  accordion: buildMetadata({
    title: 'Accordion',
    description:
      'An animated, accessible panel that reveals or hides content when the user clicks its heading. Follows the controlled component pattern — the consumer manages open state.',
    pathname: '/components/accordion/configurator',
    ogSection: 'components',
  }),
  badge: buildMetadata({
    title: 'Badge',
    description:
      'Compact pill-shaped labels for status, counts, and metadata. Use Badge for small semantic indicators that should stay visually lightweight.',
    pathname: '/components/badge/configurator',
    ogSection: 'components',
  }),
  button: buildMetadata({
    title: 'Button',
    description:
      'Buttons trigger actions, submit forms, and navigate through the application. Choose the variant that communicates the weight of the action.',
    pathname: '/components/button/configurator',
    ogSection: 'components',
  }),
  'button-pure': buildMetadata({
    title: 'Button Pure',
    description:
      'A minimal, transparent button — icon and label only, without background or border. Use it for inline actions, contextual links, and secondary affordances where a full button would be too heavy.',
    pathname: '/components/button-pure/configurator',
    ogSection: 'components',
  }),
  checkbox: buildMetadata({
    title: 'Checkbox',
    description:
      'Checkboxes allow users to select one or more options from a set, or toggle a single binary choice. Supports indeterminate state for partial selection patterns.',
    pathname: '/components/checkbox/configurator',
    ogSection: 'components',
  }),
  divider: buildMetadata({
    title: 'Divider',
    description:
      'A thin visual rule used to separate content sections or items. Supports horizontal and vertical orientations.',
    pathname: '/components/divider/configurator',
    ogSection: 'components',
  }),
  flyout: buildMetadata({
    title: 'Flyout',
    description:
      'A full-height overlay panel that slides in from the edge of the viewport. Follows the controlled component pattern — the consumer manages open state and responds to the dismiss event.',
    pathname: '/components/flyout/configurator',
    ogSection: 'components',
  }),
  icon: buildMetadata({
    title: 'Icon',
    description:
      'Icons are a fundamental visual element that aid quick recognition and navigation. Diwa uses the Lucide icon set — a consistent, open-source library built on a 24×24 grid with 2px strokes.',
    pathname: '/components/icon/configurator',
    ogSection: 'components',
  }),
  'inline-notification': buildMetadata({
    title: 'Inline Notification',
    description:
      'A static inline banner that communicates contextual feedback — informational, success, warning, or error. Renders as a live region so screen readers are notified automatically.',
    pathname: '/components/inline-notification/configurator',
    ogSection: 'components',
  }),
  'input-date': buildMetadata({
    title: 'Input Date',
    description:
      'A date picker input (YYYY-MM-DD). Delegates to the native browser date picker. Supports min and max date constraints.',
    pathname: '/components/input-date/configurator',
    ogSection: 'components',
  }),
  'input-email': buildMetadata({
    title: 'Input Email',
    description:
      'An email address input. Provides native browser email validation, appropriate mobile keyboard, and autocomplete hints.',
    pathname: '/components/input-email/configurator',
    ogSection: 'components',
  }),
  'input-month': buildMetadata({
    title: 'Input Month',
    description:
      'A month-and-year picker input (YYYY-MM). Delegates to the native browser month picker. Supports min and max month constraints.',
    pathname: '/components/input-month/configurator',
    ogSection: 'components',
  }),
  'input-number': buildMetadata({
    title: 'Input Number',
    description:
      'A numeric input with native browser number validation. Native spinners are hidden by default. Supports min, max, and step constraints.',
    pathname: '/components/input-number/configurator',
    ogSection: 'components',
  }),
  'input-password': buildMetadata({
    title: 'Input Password',
    description:
      'A password input with a built-in visibility toggle. Clicking the eye icon switches between masked and plain-text views.',
    pathname: '/components/input-password/configurator',
    ogSection: 'components',
  }),
  'input-search': buildMetadata({
    title: 'Input Search',
    description:
      'A search input with an optional clear button. The clear button appears automatically when the field has a value and disappears once cleared.',
    pathname: '/components/input-search/configurator',
    ogSection: 'components',
  }),
  'input-tel': buildMetadata({
    title: 'Input Tel',
    description:
      'A telephone number input. Triggers the numeric keypad on mobile devices and supports autocomplete for phone numbers.',
    pathname: '/components/input-tel/configurator',
    ogSection: 'components',
  }),
  'input-text': buildMetadata({
    title: 'Input Text',
    description:
      'A single-line text input for freeform string values. Supports label, description, validation states, dense mode (compact), and character limits.',
    pathname: '/components/input-text/configurator',
    ogSection: 'components',
  }),
  'input-time': buildMetadata({
    title: 'Input Time',
    description:
      'A time picker input (HH:MM). Delegates to the native browser time picker. Supports min, max, and step constraints.',
    pathname: '/components/input-time/configurator',
    ogSection: 'components',
  }),
  'input-url': buildMetadata({
    title: 'Input URL',
    description:
      'A URL input with native browser URL validation. Provides an optimised keyboard on mobile and supports autocomplete for web addresses.',
    pathname: '/components/input-url/configurator',
    ogSection: 'components',
  }),
  'input-week': buildMetadata({
    title: 'Input Week',
    description:
      'A week-and-year picker input (YYYY-Www). Delegates to the native browser week picker. Supports min and max week constraints.',
    pathname: '/components/input-week/configurator',
    ogSection: 'components',
  }),
  link: buildMetadata({
    title: 'Link',
    description:
      'Links navigate users to a new page or section. Use the variant that communicates the visual weight of the navigation action.',
    pathname: '/components/link/configurator',
    ogSection: 'components',
  }),
  'link-pure': buildMetadata({
    title: 'Link Pure',
    description:
      'A minimal text+icon navigation link with no background or border. Use for inline navigation actions where a full-weight link would be too visually heavy.',
    pathname: '/components/link-pure/configurator',
    ogSection: 'components',
  }),
  modal: buildMetadata({
    title: 'Modal',
    description:
      "An overlay dialog that focuses the user's attention on a single task or piece of information. The page behind is blocked from interaction until the modal is dismissed.",
    pathname: '/components/modal/configurator',
    ogSection: 'components',
  }),
  'multi-select': buildMetadata({
    title: 'Multi Select',
    description:
      'Multi Select allows users to choose one or more options from a filterable dropdown list. Supports keyboard navigation, validation states, and dense mode (compact) for space-constrained layouts.',
    pathname: '/components/multi-select/configurator',
    ogSection: 'components',
  }),
  pagination: buildMetadata({
    title: 'Pagination',
    description:
      'Splits large data sets across numbered pages with previous and next navigation.',
    pathname: '/components/pagination/configurator',
    ogSection: 'components',
  }),
  'pin-code': buildMetadata({
    title: 'Pin Code',
    description:
      'A segmented code entry field with automatic focus advancement. Used for OTP, verification codes, and PINs.',
    pathname: '/components/pin-code/configurator',
    ogSection: 'components',
  }),
  popover: buildMetadata({
    title: 'Popover',
    description:
      'A lightweight contextual panel that reveals additional information when a trigger is activated. Closes on Escape or clicking outside.',
    pathname: '/components/popover/configurator',
    ogSection: 'components',
  }),
  'radio-group': buildMetadata({
    title: 'Radio Group',
    description:
      'A group of radio inputs that lets users select exactly one option from a set.',
    pathname: '/components/radio-group/configurator',
    ogSection: 'components',
  }),
  scroller: buildMetadata({
    title: 'Scroller',
    description:
      'A horizontal scroll container with gradient fade indicators. Ideal for tab bars, tag lists, and other content that may overflow its container.',
    pathname: '/components/scroller/configurator',
    ogSection: 'components',
  }),
  'segmented-control': buildMetadata({
    title: 'Segmented Control',
    description:
      'A compact button group that lets users switch between a set of mutually exclusive views or modes.',
    pathname: '/components/segmented-control/configurator',
    ogSection: 'components',
  }),
  select: buildMetadata({
    title: 'Select',
    description:
      'Select allows users to choose a single option from a filterable dropdown list. Supports keyboard navigation, validation states, and dense mode (compact) for space-constrained layouts.',
    pathname: '/components/select/configurator',
    ogSection: 'components',
  }),
  spinner: buildMetadata({
    title: 'Spinner',
    description:
      'A CSS-only animated loading indicator. Communicates asynchronous activity to both sighted users and screen readers via role="status" and an accessible label.',
    pathname: '/components/spinner/configurator',
    ogSection: 'components',
  }),
  'stepper-horizontal': buildMetadata({
    title: 'Stepper Horizontal',
    description:
      'Displays progress through a sequential multi-step process with a horizontal step indicator.',
    pathname: '/components/stepper-horizontal/configurator',
    ogSection: 'components',
  }),
  switch: buildMetadata({
    title: 'Switch',
    description:
      'A toggle control that lets users turn an option on or off immediately without requiring form submission.',
    pathname: '/components/switch/configurator',
    ogSection: 'components',
  }),
  table: buildMetadata({
    title: 'Table',
    description:
      'Displays structured data in rows and columns with consistent styling and accessible markup.',
    pathname: '/components/table/configurator',
    ogSection: 'components',
  }),
  tabs: buildMetadata({
    title: 'Tabs',
    description:
      'A full-featured tabbed interface that combines a tab bar with associated panel content.',
    pathname: '/components/tabs/configurator',
    ogSection: 'components',
  }),
  'tabs-bar': buildMetadata({
    title: 'Tabs Bar',
    description:
      'A navigation bar that organises content into labelled tabs, allowing users to switch between related views.',
    pathname: '/components/tabs-bar/configurator',
    ogSection: 'components',
  }),
  tag: buildMetadata({
    title: 'Tag',
    description:
      'Compact inline labels for categorisation, status, and metadata. Use diwa-tag for static labels and diwa-tag-dismissible when the user needs to remove an item.',
    pathname: '/components/tag/configurator',
    ogSection: 'components',
  }),
  text: buildMetadata({
    title: 'Text',
    description:
      'A semantically correct text renderer that maps a visual type scale onto the right HTML element. Supports size, weight, alignment, colour, and ellipsis truncation.',
    pathname: '/components/text/configurator',
    ogSection: 'components',
  }),
  'text-list': buildMetadata({
    title: 'Text List',
    description:
      'A styled list component that renders as a bulleted list, a numbered list, or an inline flex row. Accepts diwa-text-list-item children.',
    pathname: '/components/text-list/configurator',
    ogSection: 'components',
  }),
  textarea: buildMetadata({
    title: 'Textarea',
    description:
      'A multi-line text input for longer freeform content. Supports validation states, labels, descriptions, and resizing.',
    pathname: '/components/textarea/configurator',
    ogSection: 'components',
  }),
  toast: buildMetadata({
    title: 'Toast',
    description:
      'Toast notifications display brief, auto-dismissing messages in the corner of the screen.',
    pathname: '/components/toast/configurator',
    ogSection: 'components',
  }),
};

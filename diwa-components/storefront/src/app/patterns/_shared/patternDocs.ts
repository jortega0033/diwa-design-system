import type { DocDetail } from '@/app/_shared/docsContent';

export const PATTERN_DOCS: Record<string, DocDetail> = {
  forms: {
    title: 'Patterns: Forms',
    intro: 'Build form flows that are easy to scan, keyboard-operable, and clear about validation state at each step.',
    prerequisites: [
      'A defined form schema and validation rules.',
      'Component choice for each field type (input, select, switch, checkbox).',
      'Error and success messaging strategy agreed with product and QA.',
    ],
    steps: [
      {
        title: 'Compose fields with semantic labels and help text',
        description: 'Use component labels and descriptions to reduce ambiguity before users submit.',
        code: `<diwa-input-text
  label="Email"
  placeholder="name@company.com"
  description="Use a work email for account notifications."
></diwa-input-text>

<diwa-select label="Region" description="Used for timezone defaults."></diwa-select>`,
      },
      {
        title: 'Show inline validation where problems occur',
        description: 'Display error state on the field itself and keep summary text near the action area.',
        code: `<diwa-input-password
  label="Password"
  state="error"
  message="Use at least 12 characters."
></diwa-input-password>`,
      },
      {
        title: 'Confirm submit outcomes with visible feedback',
        description: 'Use inline notifications for context-specific outcomes and toasts for global confirmations.',
        code: `<diwa-inline-notification
  variant="success"
  heading="Profile updated"
  description="Your changes were saved."
></diwa-inline-notification>`,
      },
      {
        title: 'Validate keyboard and mobile flow',
        description: 'Ensure logical tab order, visible focus, and enough touch target spacing for dense and default layouts.',
        code: `@media (pointer: coarse) {
  .form-actions > * + * {
    margin-top: var(--diwa-touch-target-spacing, 0.5rem);
  }
}`,
      },
    ],
    notes: [
      'Keep dense mode as an explicit, documented variant for constrained layouts.',
      'Avoid blocking users with only top-level error banners without field-level state.',
      'Use accessibility tab guidance on each component page before shipping.',
    ],
    troubleshooting: [
      'If users miss errors, place messages directly under the affected field.',
      'If keyboard focus seems lost, verify custom focus overrides did not remove visible state.',
      'If forms feel crowded on mobile, increase spacing and touch-target defaults.',
    ],
    nextActions: [
      {
        href: '/components',
        label: 'Components Introduction',
        description: 'Choose the right form primitives and review API tabs.',
      },
      {
        href: '/must-know/accessibility',
        label: 'Must Know: Accessibility',
        description: 'Apply keyboard and focus quality gates to every form flow.',
      },
      {
        href: '/patterns/notifications',
        label: 'Notifications Pattern',
        description: 'Pair form outcomes with clear feedback channels.',
      },
    ],
  },
  notifications: {
    title: 'Patterns: Notifications',
    intro: 'Use the right feedback channel for each message severity so users receive context without interruption overload.',
    prerequisites: [
      'Severity model (info, success, warning, error) documented by product.',
      'Component mapping for inline notifications versus toasts.',
      'Action policy for undo/retry/escalation flows.',
    ],
    steps: [
      {
        title: 'Pick channel by context',
        description: 'Inline notifications belong near related content; toasts are for global, transient feedback.',
        code: `const channel = {
  inline: 'Use when message is tied to a specific form or section.',
  toast: 'Use for app-level confirmations and short-lived updates.',
};`,
      },
      {
        title: 'Use semantic variants and concise content',
        description: 'Keep heading and description clear so users can act quickly.',
        code: `<diwa-inline-notification
  variant="warning"
  heading="Session expiring soon"
  description="Save your work to avoid losing edits."
></diwa-inline-notification>`,
      },
      {
        title: 'Support recovery actions',
        description: 'Provide an action when users can undo, retry, or open additional detail.',
        code: `<diwa-toast
  heading="Item archived"
  description="You can undo this action for 30 seconds."
  action-label="Undo"
></diwa-toast>`,
      },
      {
        title: 'Respect motion and dismissal expectations',
        description: 'Reduce animation for users with reduced-motion preferences and avoid disappearing critical errors too quickly.',
        code: `@media (prefers-reduced-motion: reduce) {
  .notification-enter,
  .notification-exit {
    animation: none;
  }
}`,
      },
    ],
    notes: [
      'Critical errors should remain visible until user dismissal or resolution.',
      'Use polite live-region behavior for non-critical toasts to reduce screen reader interruption.',
      'Keep notification timing consistent across app areas.',
    ],
    troubleshooting: [
      'If users miss toasts, increase visibility duration or provide inline redundancy for important updates.',
      'If message volume feels noisy, consolidate repeated events into a single summary notification.',
      'If notifications overlap interactive controls, adjust placement and stacking rules.',
    ],
    nextActions: [
      {
        href: '/components/toast/configurator',
        label: 'Toast Component',
        description: 'Validate variants, actions, and motion behavior.',
      },
      {
        href: '/components/inline-notification/configurator',
        label: 'Inline Notification',
        description: 'Test contextual message patterns with real content.',
      },
      {
        href: '/must-know/definition-of-done',
        label: 'Definition of Done',
        description: 'Confirm notification quality gates before release.',
      },
    ],
  },
};

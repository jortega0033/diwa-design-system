import React from 'react';
import { Section, Table, Code } from '@/components/docs';

const props = [
  {
    name: 'state',
    type: "'info' | 'success' | 'warning' | 'error'",
    default: "'info'",
    description:
      "Semantic state. Controls background colour, border colour, status icon, and ARIA live region role. Use 'error' for critical issues (assertive) and all others for non-blocking messages (polite).",
  },
  {
    name: 'heading',
    type: 'string',
    default: "''",
    description:
      'Bold heading text rendered above the description. Omit when the description alone is sufficient.',
  },
  {
    name: 'description',
    type: 'string',
    default: "''",
    description:
      'Description text. When empty the default slot is rendered instead, allowing rich markup (links, <strong>, etc.).',
  },
  {
    name: 'dismissButton',
    type: 'boolean',
    default: 'true',
    description:
      'Whether to show the dismiss (×) icon button. Set to false for persistent notifications the user should not be able to dismiss.',
  },
  {
    name: 'actionLabel',
    type: 'string',
    default: 'undefined',
    description:
      'Optional label for a secondary action button. When set, a diwa-button-pure with an arrow icon is rendered. Clicking it emits the action event.',
  },
  {
    name: 'actionLoading',
    type: 'boolean',
    default: 'false',
    description:
      'Shows a spinner on the action button and blocks interaction. Has no effect when actionLabel is not set.',
  },
  {
    name: 'theme',
    type: "'dark' | 'light'",
    default: "'dark'",
    description:
      'Per-component theme override. Reflects data-theme onto the host so the light-mode design token overrides in app.css cascade into the Shadow DOM.',
  },
];


export default function InlineNotificationApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={props.map(p => [<Code>{p.name}</Code>, <Code>{p.type}</Code>, <Code>{p.default}</Code>, p.description])}
        />
      </Section>

      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>dismiss</Code>, <Code>void</Code>, 'No', "Emitted when the dismiss (×) button is clicked. The consumer is responsible for removing or hiding the notification."],
            [<Code>action</Code>, <Code>void</Code>, 'No', <><Code>actionLabel</Code> is set and the button is not in a loading state.</>],
          ]}
        />
        <p className="mt-3 text-xs text-[var(--diwa-text-secondary)]">
          When using in React (JSX), listen via <Code>ondismiss</Code> and <Code>onaction</Code> (lowercase) — React 19 maps <Code>onXxx</Code> → <Code>addEventListener(&apos;Xxx&apos;, ...)</Code> without lowercasing.
        </p>
      </Section>

      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, <>Fallback description content rendered when the <Code>description</Code> prop is empty. Allows rich markup — links, <Code>{'<strong>'}</Code>, etc.</>],
          ]}
        />
      </Section>

      <Section title="CSS Custom Properties">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          No CSS custom properties are exposed in V1. All colours are derived from the global{' '}
          <Code>--diwa-notification-*</Code> and <Code>--diwa-color-*</Code> tokens defined in{' '}
          <Code>app.css</Code>. Theme overrides cascade automatically via the{' '}
          <Code>data-theme</Code> attribute on the host element.
        </p>
      </Section>
    </div>
  );
}

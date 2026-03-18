import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';




export default function CheckboxUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-success)] bg-[var(--diwa-notification-success-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-success)]">
              Do
            </p>
            <ul className="space-y-2">
              {[
                'Use to let users select one or more independent options from a list.',
                'Use a single checkbox for a binary opt-in / opt-out choice (e.g. "Remember me").',
                'Use in forms where multiple answers may apply simultaneously.',
                'Use the indeterminate state for "Select All" controls when only a subset is selected.',
                'Use dense mode (compact) in tables, toolbars, or sidebars where space is constrained.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[var(--diwa-text-secondary)]">
                  <span className="mt-0.5 text-[var(--diwa-notification-success)] shrink-0">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">
              Don&apos;t
            </p>
            <ul className="space-y-2">
              {[
                "Don't use checkboxes for mutually exclusive options — use radio buttons instead.",
                "Don't use a checkbox when the action takes effect immediately (use a toggle/switch).",
                "Don't hide the label without providing an accessible screen-reader name via the label prop.",
                "Don't apply error state without a visible message explaining what needs to be corrected.",
                "Don't nest checkboxes more than one level deep — it creates confusing hierarchies.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[var(--diwa-text-secondary)]">
                  <span className="mt-0.5 text-[var(--diwa-notification-error)] shrink-0">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Controlled pattern">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          <Code>diwa-checkbox</Code> is <strong className="text-[var(--diwa-text-primary)]">semi-controlled</strong>:{' '}
          it mutates its own <Code>checked</Code> prop on user interaction and simultaneously
          emits an <Code>update</Code> event. You can listen to <Code>update</Code> to keep external
          state in sync, or use the component standalone without any event wiring.
        </p>
        <CodeSnippet
          code={`// Vanilla JS — listen for the update event
const el = document.querySelector('diwa-checkbox');
el.addEventListener('update', (e) => {
  console.log('checked:', e.detail.checked);
});

// React — use lowercase onupdate (React 19 custom element mapping)
<diwa-checkbox
  label="Accept terms"
  checked={accepted}
  onupdate={(e) => setAccepted(e.detail.checked)}
/>`}
        />
      </Section>

      <Section title='Indeterminate — "Select All" pattern'>
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          The <Code>indeterminate</Code> state visually overrides <Code>checked</Code> and sets
          {' '}<Code>aria-checked=&quot;mixed&quot;</Code> for screen readers. Use it for a parent
          "Select All" control when only some child options are selected. Clicking the indeterminate
          checkbox should select all; clicking again should deselect all.
        </p>
        <CodeSnippet
          code={`const allChecked = items.every(Boolean);
const someChecked = items.some(Boolean) && !allChecked;

<diwa-checkbox
  label="Select all"
  checked={allChecked}
  indeterminate={someChecked}
  onupdate={(e) => {
    // If currently indeterminate → select all; otherwise reflect the request
    const nextChecked = someChecked ? true : e.detail.checked;
    setItems(items.map(() => nextChecked));
  }}
/>`}
        />
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mt-4">
          Note: the component automatically clears the <Code>indeterminate</Code> attribute on
          user interaction (matching standard browser behaviour). The consumer should derive
          indeterminate from state, not set it imperatively.
        </p>
      </Section>

      <Section title="Validation states">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          Set <Code>state=&quot;error&quot;</Code> or <Code>state=&quot;success&quot;</Code> together
          with a <Code>message</Code> to communicate feedback below the checkbox. The message is
          wired to the input via <Code>aria-describedby</Code> automatically.
        </p>
        <CodeSnippet
          code={`<!-- Error — required field not checked -->
<diwa-checkbox
  label="I accept the terms"
  required
  state="error"
  message="You must accept the terms to continue."
/>

<!-- Success — validated -->
<diwa-checkbox
  label="Email notifications"
  checked
  state="success"
  message="Preference saved."
/>`}
        />
      </Section>

      <Section title="Required fields">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          Setting <Code>required</Code> adds a visual asterisk to the label text and passes the
          attribute to the native <Code>&lt;input&gt;</Code>. Always pair <Code>required</Code> with
          explicit error feedback — never rely on the browser&apos;s default validation popup.
        </p>
        <CodeSnippet
          code={`<diwa-checkbox
  label="I agree to the privacy policy"
  required
  state={hasError ? 'error' : 'none'}
  message={hasError ? 'This field is required.' : ''}
/>`}
        />
      </Section>

      <Section title="Form submission caveat (V1)">
        <div className="p-4 rounded-lg border border-[var(--diwa-notification-warning)] bg-[var(--diwa-notification-warning-soft)]">
          <p className="text-sm text-[var(--diwa-text-primary)] leading-relaxed">
            <strong>Known limitation:</strong> The inner <Code>&lt;input name&gt;</Code> lives inside
            Shadow DOM and is therefore <strong>not visible</strong> to an ancestor{' '}
            <Code>&lt;form&gt;</Code> for native form submission. This is a standard Shadow DOM caveat.
            <br /><br />
            <strong>Workaround:</strong> Collect checkbox values via the <Code>update</Code> event
            and submit them programmatically (e.g. <Code>fetch</Code> / <Code>FormData</Code>
            constructed in JS). Native form participation via <Code>ElementInternals</Code> is
            planned for V2.
          </p>
        </div>
      </Section>
    </div>
  );
}

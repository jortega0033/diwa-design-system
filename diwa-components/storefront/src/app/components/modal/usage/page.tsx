import React from 'react';
import { Section, Code, CodeSnippet, DoCard, DontCard, DoList, DontList } from '@/components/docs';





export default function ModalUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList
              items={[
                'Use for focused tasks that require the user\'s full attention — confirmations, forms, alerts.',
                'Keep modal content concise. If content exceeds a screen, reconsider the pattern.',
                'Provide a clear dismiss action: the × button, a Cancel button in the footer, or both.',
                'Return focus to the element that triggered the modal on close.',
                'Use the blur backdrop when the modal is triggered by a user action (click, keyboard).',
                'Use the shading backdrop for system-initiated modals (session timeout, cookie consent).',
              ]}
            />
          </DoCard>
          <DontCard>
            <DontList
              items={[
                "Don't open a modal on page load without user interaction — this is disorienting.",
                "Don't use modals for simple notifications; use inline-notification or toast instead.",
                "Don't nest modals inside other modals.",
                "Don't disable the dismiss button without providing another way to close.",
                "Don't use disableBackdropClick for routine modals — it reduces perceived control.",
                "Don't put long multi-step flows in a single modal; consider a flyout or separate page.",
              ]}
            />
          </DontCard>
        </div>
      </Section>

      <Section title="Controlled pattern">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The modal is a <strong className="text-[var(--diwa-text-primary)]">controlled component</strong>. The consumer
          owns the <Code>open</Code> state and must set it to <Code>false</Code> in response to the{' '}
          <Code>dismiss</Code> event.
        </p>
        <CodeSnippet
          code={`<!-- HTML + vanilla JS -->
<diwa-button id="open-btn" variant="primary">Open Modal</diwa-button>

<diwa-modal id="my-modal" heading="Confirm action">
  <p>Are you sure you want to proceed?</p>
  <div slot="footer">
    <diwa-button id="confirm-btn" variant="primary">Confirm</diwa-button>
    <diwa-button id="cancel-btn" variant="secondary">Cancel</diwa-button>
  </div>
</diwa-modal>

<script>
  const modal = document.getElementById('my-modal');
  document.getElementById('open-btn').addEventListener('click', () => {
    modal.open = true;
  });
  modal.addEventListener('dismiss', () => {
    modal.open = false;
  });
  document.getElementById('confirm-btn').addEventListener('click', () => {
    // handle confirm...
    modal.open = false;
  });
  document.getElementById('cancel-btn').addEventListener('click', () => {
    modal.open = false;
  });
</script>`}
        />
      </Section>

      <Section title="React usage">
        <CodeSnippet
          code={`import { useState } from 'react';

function DeleteConfirmation({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <diwa-button variant="danger" onClick={() => setOpen(true)}>
        Delete item
      </diwa-button>

      <diwa-modal
        open={open}
        heading="Delete item"
        ondismiss={() => setOpen(false)}
      >
        <p>This action cannot be undone.</p>
        <div slot="footer">
          <diwa-button variant="danger" onClick={onConfirm}>
            Delete
          </diwa-button>
          <diwa-button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </diwa-button>
        </div>
      </diwa-modal>
    </>
  );
}`}
        />
      </Section>

      <Section title="Backdrop variants">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]">
            <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-2">
              <Code>backdrop="blur"</Code> (default)
            </h3>
            <p className="text-sm text-[var(--diwa-text-secondary)]">
              Applies a frosted-glass effect via <Code>backdrop-filter: blur</Code>.
              Signals that the content behind is temporarily inaccessible but still present.
              Use for all user-initiated modals.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]">
            <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-2">
              <Code>backdrop="shading"</Code>
            </h3>
            <p className="text-sm text-[var(--diwa-text-secondary)]">
              Applies a solid semi-transparent scrim. Provides higher contrast between the modal and
              the background. Use for system-triggered interruptions (cookie consent, auth expiry).
            </p>
          </div>
        </div>
      </Section>

      <Section title="CSS variable overrides">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The modal panel dimensions can be overridden per-instance using CSS custom properties:
        </p>
        <CodeSnippet
          code={`/* Narrow modal for simple confirmations */
diwa-modal.confirm {
  --diwa-modal-width: 400px;
}

/* Wide modal for data-heavy content */
diwa-modal.wide {
  --diwa-modal-width: 800px;
  --diwa-modal-max-height: 95vh;
}`}
        />
      </Section>
    </div>
  );
}

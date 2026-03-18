import React from 'react';

export default function TextareaExamplesPage() {
  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Basic textarea</h2>
        <div className="p-6 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]">
          <diwa-textarea
            label="Message"
            description="Describe your request in detail."
            placeholder="Enter your message here..."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Validation states</h2>
        <div className="p-6 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] space-y-6">
          <diwa-textarea
            label="Success"
            state="success"
            message="Your message was saved successfully."
            value="This looks great!"
          />
          <diwa-textarea
            label="Error"
            state="error"
            message="This field is required."
            required
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">States</h2>
        <div className="p-6 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] space-y-6">
          <diwa-textarea label="Disabled" disabled value="This content is not editable." />
          <diwa-textarea label="Read-only" readOnly value="This content is read-only." />
          <diwa-textarea label="Compact" compact placeholder="Compact textarea..." />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Resize options</h2>
        <div className="p-6 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] space-y-6">
          <diwa-textarea label="Vertical (default)" resize="vertical" placeholder="Resize vertically..." />
          <diwa-textarea label="None" resize="none" placeholder="Cannot be resized..." />
          <diwa-textarea label="Both" resize="both" placeholder="Resize in both directions..." />
        </div>
      </section>

    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

// ── Static code-reference stories ────────────────────────────────────────────

const defaultStory: Story<'diwa-pin-code'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-pin-code' as const,
    properties: { label: 'Verification code', description: 'Enter the 6-digit code sent to your email.', length: 6 },
  }],
};

const maskedStory: Story<'diwa-pin-code'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-pin-code' as const,
    properties: { label: 'Enter PIN', length: 4, type: 'password' },
  }],
};

const errorStory: Story<'diwa-pin-code'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-pin-code' as const,
    properties: { label: 'Invalid code', state: 'error', message: 'The code you entered is incorrect. Please try again.', length: 6 },
  }],
};

const successStory: Story<'diwa-pin-code'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-pin-code' as const,
    properties: { label: 'Verified', state: 'success', message: 'Identity verified.', value: '123456', length: 6 },
  }],
};

const compactStory: Story<'diwa-pin-code'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-pin-code' as const,
    properties: { label: 'PIN', compact: true, length: 4 },
  }],
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PinCodeExamplesPage() {
  const [value, setValue] = useState('');
  const [complete, setComplete] = useState(false);

  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">6-digit OTP</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          Live demo — type digits to see the value accumulate. The complete flag fires when all cells are filled.
        </p>
        <div className="p-6 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] space-y-4">
          <diwa-pin-code
            label="Verification code"
            description="Enter the 6-digit code sent to your email."
            length={6}
            onUpdate={(e: CustomEvent<{ value: string; isComplete: boolean }>) => {
              setValue(e.detail.value);
              setComplete(e.detail.isComplete);
            }}
          />
          <p className="text-sm text-[var(--diwa-text-secondary)]">
            Value: <code className="font-mono text-[var(--diwa-text-primary)]">{value || '—'}</code>
            {complete && <span className="ml-2 text-[var(--diwa-notification-success)]">Complete ✓</span>}
          </p>
        </div>
        <ComponentStory story={defaultStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">4-digit PIN (masked)</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          Set <code className="text-xs font-mono">type="password"</code> to mask each digit as it is entered.
        </p>
        <ComponentStory story={maskedStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Validation states</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          Use <code className="text-xs font-mono">state="error"</code> or <code className="text-xs font-mono">state="success"</code> with a <code className="text-xs font-mono">message</code> to give validation feedback.
        </p>
        <ComponentStory story={errorStory} />
        <ComponentStory story={successStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Compact</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <code className="text-xs font-mono">compact</code> enables dense mode and reduces cell size for denser layouts.
        </p>
        <ComponentStory story={compactStory} />
      </section>

    </div>
  );
}

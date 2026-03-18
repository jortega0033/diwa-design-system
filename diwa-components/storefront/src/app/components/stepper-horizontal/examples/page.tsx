'use client';

import React, { useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const STEPS = ['Account', 'Details', 'Review', 'Confirm'];
const STEP_CONTENT: Record<number, string> = {
  0: 'Create your account by entering your email and choosing a password.',
  1: 'Fill in your personal details including your name and contact information.',
  2: 'Review all the information you have provided before submitting.',
  3: 'Click confirm to complete the process and submit your application.',
};

// Static code reference story — generates clean HTML/React/Angular/Vue markup
const basicStory: Story<'diwa-stepper-horizontal'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-stepper-horizontal' as const,
    properties: { 'active-step-index': 1 },
    children: [
      { tag: 'diwa-stepper-horizontal-item' as const, properties: { label: 'Account' } },
      { tag: 'diwa-stepper-horizontal-item' as const, properties: { label: 'Details' } },
      { tag: 'diwa-stepper-horizontal-item' as const, properties: { label: 'Review' } },
      { tag: 'diwa-stepper-horizontal-item' as const, properties: { label: 'Confirm' } },
    ],
  }],
};

export default function StepperHorizontalExamplesPage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-1">Multi-step form</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Drive <code className="text-xs font-mono">active-step-index</code> from parent state. Previous steps are styled as completed; future steps are upcoming.
        </p>
        <div className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-6 space-y-6">
          <diwa-stepper-horizontal active-step-index={activeStep}>
            {STEPS.map((label) => (
              <diwa-stepper-horizontal-item key={label} label={label} />
            ))}
          </diwa-stepper-horizontal>

          <div className="py-4 text-sm text-[var(--diwa-text-secondary)]">
            <strong className="text-[var(--diwa-text-primary)]">Step {activeStep + 1}: {STEPS[activeStep]}</strong>
            <p className="mt-1">{STEP_CONTENT[activeStep]}</p>
          </div>

          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded text-sm bg-[var(--diwa-bg-elevated)] text-[var(--diwa-text-primary)] border border-[var(--diwa-border)] disabled:opacity-40"
              disabled={activeStep === 0}
              onClick={() => setActiveStep(s => Math.max(0, s - 1))}
            >
              Back
            </button>
            <button
              className="px-4 py-2 rounded text-sm bg-[var(--diwa-accent)] text-white disabled:opacity-40"
              disabled={activeStep === STEPS.length - 1}
              onClick={() => setActiveStep(s => Math.min(STEPS.length - 1, s + 1))}
            >
              {activeStep === STEPS.length - 2 ? 'Review' : 'Next'}
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">Code</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The stepper is a display-only component. Render it with the desired <code className="text-xs font-mono">active-step-index</code> and update from your own navigation logic.
        </p>
        <ComponentStory story={basicStory} />
      </section>

    </div>
  );
}


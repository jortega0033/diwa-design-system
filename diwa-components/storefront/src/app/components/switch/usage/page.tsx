import React from 'react';
import { Section, Code, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function SwitchUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use a switch for settings that take effect immediately — there is no confirmation step.',
              'Label the switch clearly so the user knows what changes when they toggle it.',
              'Use the loading state when the toggle triggers an async operation (e.g. an API call).',
              'Use alignLabel="start" in forms that follow a right-to-left label pattern.',
              'Group related switches in a logical section with a heading.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use a switch for binary choices that require confirmation before taking effect — use a checkbox with a submit button instead.",
              "Don't use a switch to represent selection within a list — use a checkbox or radio group.",
              "Don't place a switch inside a form that has a Save button — the user expects the toggle to act immediately.",
              "Don't remove the label — every switch must have a visible text label or an accessible aria-label.",
              "Don't nest switches inside other interactive controls.",
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Controlled usage">
        <div className="space-y-2 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <p>
            <strong className="text-[var(--diwa-text-primary)]">diwa-switch is a controlled component.</strong> The <Code>checked</Code> prop reflects the current state, and the component emits an <Code>update</Code> event with a <Code>{'{ checked: boolean }'}</Code> detail. Your application must update the prop in response.
          </p>
          <p>
            This pattern ensures the switch always reflects the application's true state and prevents out-of-sync UI when async operations fail.
          </p>
        </div>
      </Section>

    </div>
  );
}

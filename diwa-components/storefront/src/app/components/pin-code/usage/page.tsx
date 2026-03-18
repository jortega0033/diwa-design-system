import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function PinCodeUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use a pin code for OTP, verification codes, PINs, or any short fixed-length code entry.',
              'Set length to match the code format sent to the user (typically 4 or 6).',
              'Use type="password" when the code should be masked (e.g. PIN entry).',
              'Use the update event to react to progress — check isComplete to know all boxes are filled.',
              'Paste support is built in — users can paste a full code into the first box.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use a pin code for variable-length input — use diwa-input-text instead.",
              "Don't use length > 6 — very long codes are better entered in a standard text input.",
              "Don't disable paste — it significantly impairs usability for OTP flows.",
              "Don't omit the label — screen reader users need context about what code to enter.",
            ]} />
          </DontCard>
        </div>
      </Section>
    </div>
  );
}

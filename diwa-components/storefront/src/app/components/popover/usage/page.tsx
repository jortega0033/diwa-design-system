import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function PopoverUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use a popover to surface additional context that not all users need to see at all times.',
              'Use the description prop for a single short sentence; use the default slot for richer content.',
              'Choose a direction that keeps the panel within the viewport — prefer "bottom" or "end" near page edges.',
              'Pair a popover with a form label to explain a complex option without cluttering the layout.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't put critical information only inside a popover — users who miss the trigger will never see it.",
              "Don't use a popover for interactive actions like forms or menus — use a modal or dropdown instead.",
              "Don't use more than one popover open at a time — there is no automatic mutual exclusivity.",
              "Don't rely on hover to open a popover — the default trigger is click for keyboard and touch compatibility.",
            ]} />
          </DontCard>
        </div>
      </Section>

    </div>
  );
}

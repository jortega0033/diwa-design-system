import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function SegmentedControlUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="When to use">
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--diwa-text-secondary)]">
          <li>When users need to switch between a small set of related views or modes (2-5 options).</li>
          <li>When all options should be visible simultaneously without scrolling.</li>
          <li>For in-context toggles that immediately update the content below (e.g. chart type, calendar view).</li>
        </ul>
      </Section>

      <Section title="When not to use">
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--diwa-text-secondary)]">
          <li>Use <strong>diwa-radio-group</strong> for form fields where the choice is submitted with a form.</li>
          <li>Use <strong>diwa-tabs</strong> when switching between full page sections or panels with a URL.</li>
          <li>Use <strong>diwa-select</strong> when there are more than 5 options or limited horizontal space.</li>
        </ul>
      </Section>

      <Section title="Dos and don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoCard>
            <DoList items={[
              'Keep labels short - one or two words per segment.',
              'Ensure exactly one segment is always selected.',
              'Use 2-5 segments for best usability.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use for navigation that changes the URL - use tabs or links.",
              "Don't use long labels that overflow the segment.",
              "Don't use more than 5 segments in a single control.",
            ]} />
          </DontCard>
        </div>
      </Section>
    </div>
  );
}

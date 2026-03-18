import React from 'react';
import { Section, Code, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function TabsUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="When to use">
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--diwa-text-secondary)]">
          <li>When you need both a tab navigation bar and associated content panels in a self-contained component.</li>
          <li>When tab content is rendered directly alongside the bar (not in a separate route).</li>
          <li>When you want the component to manage active state without external wiring.</li>
        </ul>
      </Section>

      <Section title="When not to use">
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--diwa-text-secondary)]">
          <li>Use <strong>diwa-tabs-bar</strong> when you need to manage the tab bar and panels separately (e.g. with routing).</li>
          <li>Use <strong>diwa-segmented-control</strong> for compact, inline mode switching without dedicated panels.</li>
        </ul>
      </Section>

      <Section title="Dos and don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoCard>
            <DoList items={[
              <>Use <Code>label</Code> on each <Code>diwa-tabs-item</Code> for clear tab labels.</>,
              'Keep related content grouped under a single tabs instance.',
              <>Pre-select the most relevant tab with <Code>active-tab-index</Code>.</>,
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't nest tabs within tabs - this creates confusing navigation hierarchy.",
              "Don't put unrelated content in tabs - each tab should belong to the same conceptual group.",
            ]} />
          </DontCard>
        </div>
      </Section>
    </div>
  );
}

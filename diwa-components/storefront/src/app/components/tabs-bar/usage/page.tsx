import React from 'react';
import { Section, Code, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function TabsBarUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="When to use">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoCard>
            <DoList items={[
              'Use for 3-7 peer views that belong to the same workflow, object, or settings area.',
              'Place the tabs bar directly above the panel it controls so the relationship is obvious.',
              'Keep one tab active at all times and preserve panel context when switching.',
              'Use concise labels that read well in an application shell, such as Overview, Details, or History.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use tabs for primary product navigation or broad information architecture - use a sidebar or top-level nav.",
              "Don't let labels become sentence-length or rely on truncation to fit the layout.",
              "Don't stack multiple tabs bars in the same content region unless the hierarchy is unmistakable.",
              "Don't use tabs for sequential steps - use a stepper when order matters.",
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Enterprise fit">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <Code>diwa-tabs-bar</Code> works best for application sections where the navigation chrome and
          panel content are composed separately. That makes it a strong fit for enterprise dashboards,
          settings workspaces, record detail screens, and admin consoles where the selected view may
          control routing, lazy loading, or external state.
        </p>
      </Section>

      <Section title="Label quality">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          Labels should feel like stable destinations rather than action prompts. Prefer one to three
          words, keep the vocabulary parallel across tabs, and avoid mixing nouns with verbs in the
          same set. A tabs bar feels more enterprise-grade when labels are predictable and scan cleanly
          from left to right.
        </p>
      </Section>

      <Section title="Panel composition">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          Pair the bar with a clearly bounded content panel immediately below it. Keep the panel shell,
          padding, and border treatment consistent across tabs so switching feels like changing views
          within one workspace rather than jumping between unrelated cards. If the selected view needs
          a corresponding accessible region, connect it with a nearby <Code>role="tabpanel"</Code>.
        </p>
      </Section>

      <Section title="Scaling the pattern">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          Once a navigation set grows beyond seven items, the tabs bar stops feeling like a compact
          workspace control and starts behaving like primary navigation. At that point, move the
          architecture to a sidebar, menu, or another navigation model instead of forcing additional
          tabs into the row.
        </p>
      </Section>
    </div>
  );
}

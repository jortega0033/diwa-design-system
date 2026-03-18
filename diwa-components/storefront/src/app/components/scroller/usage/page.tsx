import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function ScrollerUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use a scroller for horizontal lists of items (tags, chips, tab pills) that may overflow their container.',
              'Set scrollbar={false} (default) for a clean UI where the gradient indicators communicate overflow.',
              'Use inside a constrained container — the scroller takes the full block width.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use a scroller for vertical overflow — use overflow-y on a standard container instead.",
              "Don't place high-priority content only inside a scroller where it may be hidden by overflow.",
              "Don't nest scrollers inside other scrollers.",
            ]} />
          </DontCard>
        </div>
      </Section>
    </div>
  );
}

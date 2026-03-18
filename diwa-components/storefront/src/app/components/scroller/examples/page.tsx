'use client';

import React from 'react';

const TAGS = ['React', 'TypeScript', 'Stencil', 'Design System', 'Web Components', 'CSS Custom Properties', 'Accessibility', 'Dark Mode', 'Tokens', 'Shadow DOM', 'Slots'];

export default function ScrollerExamplesPage() {
  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Tag list</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">A list of tags wrapped in a scroller. Resize the window to see the gradient fade indicators.</p>
        <div className="rounded-lg border border-[var(--diwa-border)] overflow-hidden">
          <diwa-scroller>
            <div style={{ display: 'flex', gap: '8px', padding: '12px' }}>
              {TAGS.map((label) => (
                <diwa-tag key={label} variant="neutral">{label}</diwa-tag>
              ))}
            </div>
          </diwa-scroller>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">With scrollbar visible</h2>
        <div className="rounded-lg border border-[var(--diwa-border)] overflow-hidden">
          <diwa-scroller scrollbar>
            <div style={{ display: 'flex', gap: '8px', padding: '12px' }}>
              {TAGS.map((label) => (
                <diwa-tag key={label} variant="primary">{label}</diwa-tag>
              ))}
            </div>
          </diwa-scroller>
        </div>
      </section>

    </div>
  );
}

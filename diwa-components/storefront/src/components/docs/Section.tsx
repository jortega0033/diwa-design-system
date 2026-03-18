import React from 'react';

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-4 pb-2 border-b border-[var(--diwa-border)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

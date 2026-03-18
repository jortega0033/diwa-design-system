import React from 'react';

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded text-[var(--diwa-text-primary)]">
      {children}
    </code>
  );
}

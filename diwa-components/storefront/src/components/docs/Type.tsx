import React from 'react';

export function Type({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-xs font-mono text-[var(--diwa-accent)]">{children}</code>
  );
}

import React from 'react';

export function CodeSnippet({ code }: { code: string }) {
  return (
    <pre className="p-4 rounded-md bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-sm font-mono text-[var(--diwa-text-primary)] overflow-x-auto whitespace-pre">
      <code>{code}</code>
    </pre>
  );
}

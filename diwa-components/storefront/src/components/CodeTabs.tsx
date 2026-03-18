'use client';

import React, { useState } from 'react';

export type CodeTab = { label: string; code: string };

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Tab strip */}
      <div className="flex border-b border-[var(--diwa-border)]">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
              i === active
                ? 'border-[var(--diwa-accent)] text-[var(--diwa-text-primary)]'
                : 'border-transparent text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)] hover:border-[var(--diwa-border)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code panel */}
      <pre className="p-5 rounded-b-lg rounded-tr-lg bg-[var(--diwa-bg-surface)] border border-t-0 border-[var(--diwa-border)] text-sm font-mono text-[var(--diwa-text-primary)] overflow-x-auto leading-relaxed">
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}

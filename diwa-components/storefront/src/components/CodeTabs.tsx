'use client';

import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';

export type CodeTab = { label: string; code: string };

function inferTabLanguage(label: string, code: string): string {
  const l = label.toLowerCase();
  if (l.includes('css')) return 'css';
  if (l.includes('js') || l.includes('ts')) return 'typescript';
  if (l.includes('html') || l.includes('markup')) return 'xml';

  const sample = code.trim();
  if (sample.startsWith('<') || sample.includes('<diwa-')) return 'xml';
  if (sample.includes(':root') || sample.includes('--diwa-') || sample.includes('@media')) return 'css';
  if (sample.startsWith('npm ') || sample.startsWith('pnpm ') || sample.startsWith('yarn ')) return 'bash';
  return 'typescript';
}

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);
  const { resolvedTheme } = useStorefrontTheme();

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
      <div className="overflow-hidden rounded-b-lg rounded-tr-lg border border-t-0 border-[var(--diwa-border)] bg-[var(--diwa-bg-base)]">
        <SyntaxHighlighter
          language={inferTabLanguage(tabs[active].label, tabs[active].code)}
          style={resolvedTheme === 'dark' ? atomOneDark : atomOneLight}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: 'var(--diwa-bg-base)',
            fontSize: '0.875rem',
            lineHeight: '1.65',
            overflowX: 'auto',
          }}
          showLineNumbers={false}
          wrapLongLines={false}
        >
          {tabs[active].code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

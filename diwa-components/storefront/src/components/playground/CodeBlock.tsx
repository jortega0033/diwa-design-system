'use client';

import React, { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';
import type { Framework, FrameworkCode } from '@/models/framework';

const LS_KEY = 'diwa-playground-framework';

function readStoredFramework(): Framework {
  if (typeof window === 'undefined') return 'html';
  const stored = localStorage.getItem(LS_KEY);
  const valid: Framework[] = ['html', 'react', 'angular', 'vue'];
  return valid.includes(stored as Framework) ? (stored as Framework) : 'html';
}

const SYNTAX_LANGUAGE: Record<Framework, string> = {
  html: 'xml',
  react: 'typescript',
  angular: 'typescript',
  vue: 'xml',
};

const FRAMEWORKS: { id: Framework; label: string }[] = [
  { id: 'html', label: 'HTML' },
  { id: 'react', label: 'React' },
  { id: 'angular', label: 'Angular' },
  { id: 'vue', label: 'Vue' },
];

type CodeBlockProps = {
  frameworkCode: FrameworkCode;
  /** Whether the code is visible; controlled by Playground. */
  visible: boolean;
  /** Called when the show/hide button is clicked. */
  onToggle: () => void;
};

/**
 * CodeBlock — framework tab bar + syntax-highlighted code panel.
 * The code’s collapsed/expanded state is owned by the parent (Playground).
 */
export function CodeBlock({ frameworkCode, visible, onToggle }: CodeBlockProps) {
  const [framework, setFramework] = useState<Framework>('html');
  const [copied, setCopied] = useState(false);

  // Sync from localStorage after mount — avoids SSR/client hydration mismatch.
  useEffect(() => {
    const stored = readStoredFramework();
    if (stored !== 'html') setFramework(stored);
  }, []);

  const selectFramework = (f: Framework) => {
    setFramework(f);
    localStorage.setItem(LS_KEY, f);
  };
  const { resolvedTheme } = useStorefrontTheme();
  const activeCode = frameworkCode[framework];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const syntaxStyle = resolvedTheme === 'dark' ? atomOneDark : atomOneLight;

  return (
    <div>
      {/* Tab bar — always visible */}
      <div className="flex items-center border-t border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]">
        {/* Framework tabs */}
        <div className="flex items-end flex-1">
          {FRAMEWORKS.map(({ id, label }) => {
            const isActive = framework === id;
            return (
              <button
                key={id}
                onClick={() => selectFramework(id)}
                className={[
                  'px-4 py-2.5 min-h-[var(--diwa-button-height)] text-xs font-medium border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--diwa-border-focus)]',
                  isActive
                    ? 'border-[var(--diwa-accent)] text-[var(--diwa-accent)] bg-[var(--diwa-bg-base)]'
                    : 'border-transparent text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)]',
                ].join(' ')}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 px-2">
          <button
            onClick={handleCopy}
            className="px-3 py-2 min-h-[var(--diwa-button-height)] text-xs font-medium rounded text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)] hover:bg-[var(--diwa-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--diwa-border-focus)]"
            aria-label="Copy code"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <button
            onClick={onToggle}
            className="px-3 py-2 min-h-[var(--diwa-button-height)] text-xs font-medium rounded text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)] hover:bg-[var(--diwa-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--diwa-border-focus)]"
            aria-expanded={visible}
          >
            {visible ? '▲ Hide' : '▼ Show'}
          </button>
        </div>
      </div>

      {/* Syntax-highlighted code — toggled by parent */}
      {visible && (
        <SyntaxHighlighter
          language={SYNTAX_LANGUAGE[framework]}
          style={syntaxStyle}
          customStyle={{
            margin: 0,
            padding: '1rem 1.25rem',
            background: 'var(--diwa-bg-base)',
            fontSize: '0.8125rem',
            lineHeight: '1.65',
            maxHeight: '420px',
            overflow: 'auto',
            borderRadius: 0,
          }}
          showLineNumbers={false}
          wrapLongLines={false}
        >
          {activeCode}
        </SyntaxHighlighter>
      )}
    </div>
  );
}

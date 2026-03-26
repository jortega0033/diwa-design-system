'use client';

import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';

function inferLanguage(code: string): string {
  const sample = code.trim();

  if (
    sample.startsWith('npm ') ||
    sample.startsWith('pnpm ') ||
    sample.startsWith('yarn ') ||
    sample.startsWith('bun ') ||
    sample.startsWith('# ') ||
    sample.startsWith('$ ')
  ) {
    return 'bash';
  }

  if (sample.includes('<diwa-') || sample.includes('</') || sample.startsWith('<')) {
    return 'xml';
  }

  if (
    sample.includes(':root') ||
    sample.includes('--diwa-') ||
    sample.includes('@media') ||
    sample.includes('{') && sample.includes('}') && sample.includes(';')
  ) {
    return 'css';
  }

  if (
    sample.includes('import ') ||
    sample.includes('export ') ||
    sample.includes('const ') ||
    sample.includes('document.') ||
    sample.includes('window.') ||
    sample.includes('=>')
  ) {
    return 'typescript';
  }

  return 'plaintext';
}

export function CodeSnippet({ code, language }: { code: string; language?: string }) {
  const { resolvedTheme } = useStorefrontTheme();

  return (
    <div className="overflow-hidden rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-base)]">
      <SyntaxHighlighter
        language={language ?? inferLanguage(code)}
        style={resolvedTheme === 'dark' ? atomOneDark : atomOneLight}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'var(--diwa-bg-base)',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          overflowX: 'auto',
        }}
        showLineNumbers={false}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

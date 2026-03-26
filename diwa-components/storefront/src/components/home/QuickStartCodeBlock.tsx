'use client';

import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useStorefrontTheme } from '@/hooks/useStorefrontTheme';

type QuickStartCodeBlockProps = {
  code: string;
  language: string;
};

export function QuickStartCodeBlock({ code, language }: QuickStartCodeBlockProps) {
  const { resolvedTheme } = useStorefrontTheme();

  return (
    <div className="overflow-hidden rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-base)]">
      <SyntaxHighlighter
        language={language}
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

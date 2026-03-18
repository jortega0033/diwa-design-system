'use client';

import React, { useState, type ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';

import type { FrameworkCode } from '@/models/framework';

type PlaygroundProps = {
  /** The rendered component demo. */
  children: ReactNode;
  /** All four framework code strings shown in the code block. */
  frameworkCode: FrameworkCode;
  /** Pre-expand the code block on mount (useful for examples pages). */
  codeVisible?: boolean;
  /** Extra class names applied to the preview wrapper (e.g. 'w-full max-w-xl'). */
  previewClassName?: string;
};

/**
 * Playground — live preview area + collapsible syntax-highlighted code block.
 * Visual structure mirrors the PDS Playground component:
 *   ┌─────────────────────────────────────────────┐
 *   │  demo area (p-8, bg-surface)                  │
 *   ├─────────────────────────────────────────────┤
 *   │  [HTML] [React] [Angular] [Vue]  Copy  Show │  ← tab bar
 *   ├─────────────────────────────────────────────┤
 *   │  <syntax-highlighted html>                    │  ← collapsible
 *   └─────────────────────────────────────────────┘
 */
export function Playground({ children, frameworkCode, codeVisible = true, previewClassName }: PlaygroundProps) {
  const [showCode, setShowCode] = useState(codeVisible);

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--diwa-border)] mb-8">
      {/* Live preview */}
      <div
        className={['p-8 flex items-center justify-center min-h-[140px] bg-[var(--diwa-bg-surface)]', previewClassName].filter(Boolean).join(' ')}
        data-preview
      >
        {children}
      </div>

      {/* Tab bar + collapsible code */}
      <CodeBlock
        frameworkCode={frameworkCode}
        visible={showCode}
        onToggle={() => setShowCode((v) => !v)}
      />
    </div>
  );
}

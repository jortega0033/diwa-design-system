'use client';

import { useState, useEffect } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  ICON_NAMES,
  iconStorySizes,
  iconStoryDecorative,
  iconStoryAccessible,
} from '../icon.stories';

function IconGrid() {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filtered = query.trim()
    ? ICON_NAMES.filter((n) => n.includes(query.toLowerCase()))
    : ICON_NAMES;

  function handleCopy(name: string) {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(name);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  if (!mounted) return null;

  return (
    <div>
      <input
        type="search"
        placeholder="Filter icons…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-5 w-full max-w-sm px-3 py-2 text-sm rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] text-[var(--diwa-text-primary)] placeholder:text-[var(--diwa-text-tertiary)] focus:outline-none focus:ring-1 focus:ring-[var(--diwa-border-focus)]"
      />
      <p className="text-xs text-[var(--diwa-text-tertiary)] mb-4">
        {filtered.length} icon{filtered.length !== 1 ? 's' : ''}
        {query ? ` matching "${query}"` : ' total'} — click to copy name
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
        {filtered.map((name) => (
          <button
            key={name}
            onClick={() => handleCopy(name)}
            title={copied === name ? 'Copied!' : name}
            className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-transparent hover:border-[var(--diwa-border)] hover:bg-[var(--diwa-bg-surface)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--diwa-border-focus)]"
          >
            <diwa-icon name={name} size={20} />
            <span className="text-[10px] leading-tight text-center text-[var(--diwa-text-tertiary)] group-hover:text-[var(--diwa-text-secondary)] break-all max-w-full">
              {copied === name ? '✓ copied' : name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function IconExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-1">Icon set</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          A curated selection from the Lucide icon library. The full set is available at{' '}
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noreferrer"
            className="underline text-[var(--diwa-accent)] hover:opacity-80"
          >
            lucide.dev/icons
          </a>
          .
        </p>
        <IconGrid />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">Sizes</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use the <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">size</code> prop
          to control dimensions. Available values: 16, 20, 24 (default), 32, 48.
        </p>
        <ComponentStory story={iconStorySizes} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">Decorative icon</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          When the icon is purely visual, omit the <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">label</code> prop.
          The component automatically sets <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">aria-hidden="true"</code> so
          assistive technologies skip it.
        </p>
        <ComponentStory story={iconStoryDecorative} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-1">Accessible / semantic icon</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          When the icon stands alone without adjacent visible text, set the{' '}
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">label</code> prop.
          This applies <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">role="img"</code>{' '}
          and <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">aria-label</code> to the SVG.
        </p>
        <ComponentStory story={iconStoryAccessible} />
      </section>
    </div>
  );
}

'use client';

import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import type { PropDefinition } from '@/models/propDefinition';
import type { StoryState } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';
import { useSidebar } from '@/context/SidebarContext';

type Props = {
  propDefinitions: PropDefinition[];
  storyState: StoryState<HTMLTagOrComponent>;
  setStoryState: Dispatch<SetStateAction<StoryState<HTMLTagOrComponent>>>;
};

/**
 * ConfiguratorControls — portals a prop-control panel into `#diwa-sidebar-end`
 * (the right sidebar rendered by Canvas on configurator pages).
 * When the sidebar is hidden the element doesn’t exist and nothing renders.
 */
export function ConfiguratorControls({ propDefinitions, storyState, setStoryState }: Props) {
  const { isSidebarEndOpen } = useSidebar();
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  // Re-query whenever the sidebar mounts/unmounts so we never get stuck with a
  // stale null from a navigation where the sidebar wasn't open yet on first render.
  useEffect(() => {
    setPortalTarget(isSidebarEndOpen ? document.getElementById('diwa-sidebar-end') : null);
  }, [isSidebarEndOpen]);

  if (!portalTarget) return null;

  const props = storyState.properties ?? {};

  function update(name: string, value: unknown) {
    setStoryState((prev) => ({
      ...prev,
      properties: { ...(prev.properties ?? {}), [name]: value },
    }));
  }

  const controls = (
    <div className="p-4 space-y-5">
      <h3 className="text-xs uppercase tracking-widest font-semibold text-[var(--diwa-text-secondary)]">
        Props
      </h3>

      {propDefinitions.map((def) => {
        if (def.type === 'boolean') {
          return (
            <label key={def.name} className="flex items-center gap-3 min-h-[var(--diwa-touch-target-min-size)] cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(props[def.name] ?? def.defaultValue ?? false)}
                onChange={(e) => update(def.name, e.target.checked)}
                className="accent-[var(--diwa-accent)] w-5 h-5"
              />
              <span className="text-sm font-mono text-[var(--diwa-text-primary)]">{def.name}</span>
            </label>
          );
        }

        if (def.type === 'select') {
          return (
            <div key={def.name} className="space-y-1">
              <label className="block text-xs font-mono text-[var(--diwa-text-secondary)]">
                {def.name}
              </label>
              <select
                value={String(props[def.name] ?? def.defaultValue ?? def.options[0])}
                onChange={(e) => update(def.name, e.target.value)}
                className="w-full min-h-[var(--diwa-touch-target-min-size)] rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] text-[var(--diwa-text-primary)] text-sm px-3 py-2 font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--diwa-border-focus)]"
              >
                {def.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (def.type === 'number') {
          return (
            <div key={def.name} className="space-y-1">
              <label className="block text-xs font-mono text-[var(--diwa-text-secondary)]">
                {def.name}
              </label>
              <input
                type="number"
                value={Number(props[def.name] ?? def.defaultValue ?? 0)}
                onChange={(e) => update(def.name, e.target.valueAsNumber)}
                className="w-full min-h-[var(--diwa-touch-target-min-size)] rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] text-[var(--diwa-text-primary)] text-sm px-3 py-2 font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--diwa-border-focus)]"
              />
            </div>
          );
        }

        if (def.type === 'string') {
          return (
            <div key={def.name} className="space-y-1">
              <label className="block text-xs font-mono text-[var(--diwa-text-secondary)]">
                {def.name}
              </label>
              <input
                type="text"
                value={String(props[def.name] ?? def.defaultValue ?? '')}
                onChange={(e) => update(def.name, e.target.value)}
                className="w-full min-h-[var(--diwa-touch-target-min-size)] rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] text-[var(--diwa-text-primary)] text-sm px-3 py-2 font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--diwa-border-focus)]"
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );

  return createPortal(controls, portalTarget);
}

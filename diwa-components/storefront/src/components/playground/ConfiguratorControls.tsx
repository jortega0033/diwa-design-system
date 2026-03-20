'use client';

import React, { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import type { PropDefinition } from '@/models/propDefinition';
import type { StoryState } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';
import { useSidebar } from '@/context/SidebarContext';

/* ── Constants ──────────────────────────────────────────────────────────── */

const DEFAULT_GROUP = 'Properties';

/* ── Types ──────────────────────────────────────────────────────────────── */

type Props = {
  propDefinitions: PropDefinition[];
  storyState: StoryState<HTMLTagOrComponent>;
  setStoryState: Dispatch<SetStateAction<StoryState<HTMLTagOrComponent>>>;
  /** Default state for "reset" functionality. */
  defaultState?: StoryState<HTMLTagOrComponent>;
};

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function getDefault(def: PropDefinition): unknown {
  if (def.type === 'boolean') return def.defaultValue ?? false;
  if (def.type === 'number' || def.type === 'range') return def.defaultValue ?? 0;
  if (def.type === 'select') return def.defaultValue ?? def.options[0];
  if (def.type === 'color') return def.defaultValue ?? '#000000';
  return def.defaultValue ?? '';
}

function isModified(current: unknown, defaultVal: unknown): boolean {
  return current !== undefined && current !== defaultVal;
}

function groupDefs(defs: PropDefinition[]): Map<string, PropDefinition[]> {
  const map = new Map<string, PropDefinition[]>();
  for (const def of defs) {
    const group = def.group ?? DEFAULT_GROUP;
    const arr = map.get(group) ?? [];
    arr.push(def);
    map.set(group, arr);
  }
  return map;
}

function propNameToLabel(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ── Toggle Switch ──────────────────────────────────────────────────────── */

function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors',
        checked ? 'bg-[var(--diwa-accent)]' : 'bg-[var(--diwa-border)]',
      ].join(' ')}
    >
      <span
        className={[
          'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  );
}

/* ── Modified Dot ────────────────────────────────────────────────────────── */

function ModifiedDot() {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--diwa-accent)] shrink-0"
      title="Modified from default"
      aria-label="Value modified from default"
    />
  );
}

/* ── Reset Button ────────────────────────────────────────────────────────── */

function ResetButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="text-[10px] font-medium text-[var(--diwa-text-tertiary)] hover:text-[var(--diwa-accent)] transition-colors uppercase tracking-wider"
      title={label}
      aria-label={label}
    >
      Reset
    </button>
  );
}

/* ── Accordion Section ──────────────────────────────────────────────────── */

function AccordionSection({
  title,
  children,
  defaultOpen = true,
  modifiedCount,
  onReset,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  modifiedCount: number;
  onReset?: () => void;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--diwa-border)]">
      <div className="flex items-center gap-2 hover:bg-[var(--diwa-bg-hover)] transition-colors">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 flex-1 px-4 py-2.5 text-left min-w-0"
          aria-expanded={open}
        >
          <svg
            className={`w-3 h-3 shrink-0 text-[var(--diwa-text-tertiary)] transition-transform ${open ? 'rotate-90' : ''}`}
            viewBox="0 0 6 10"
            fill="none"
          >
            <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--diwa-text-secondary)] flex-1">
            {title}
          </span>
          {modifiedCount > 0 && (
            <span className="text-[10px] tabular-nums font-medium text-[var(--diwa-accent)] bg-[var(--diwa-accent-bg)] px-1.5 py-0.5 rounded-full">
              {modifiedCount}
            </span>
          )}
        </button>
        {onReset && modifiedCount > 0 && (
          <div className="pr-3 shrink-0">
            <ResetButton onClick={onReset} label={`Reset ${title}`} />
          </div>
        )}
      </div>
      {open && <div className="px-4 pb-3 space-y-3">{children}</div>}
    </div>
  );
}

/* ── Individual Controls ─────────────────────────────────────────────────── */

const INPUT_CLASS =
  'w-full min-h-[var(--diwa-touch-target-min-size)] rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] text-[var(--diwa-text-primary)] text-sm px-3 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--diwa-border-focus)]';

function PropControl({
  def,
  value,
  modified,
  onChange,
}: {
  def: PropDefinition;
  value: unknown;
  modified: boolean;
  onChange: (name: string, value: unknown) => void;
}) {
  const controlId = `prop-${def.name}`;

  if (def.type === 'boolean') {
    return (
      <div className="flex items-center justify-between gap-3 min-h-[28px]">
        <div className="flex items-center gap-1.5 min-w-0">
          <label htmlFor={controlId} className="text-sm text-[var(--diwa-text-primary)] truncate cursor-pointer">
            {def.label ?? propNameToLabel(def.name)}
          </label>
          {modified && <ModifiedDot />}
        </div>
        <Toggle id={controlId} checked={Boolean(value)} onChange={(v) => onChange(def.name, v)} />
      </div>
    );
  }

  if (def.type === 'select') {
    const isSegmented = def.options.length <= 3;
    return (
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <label htmlFor={isSegmented ? undefined : controlId} className="text-xs text-[var(--diwa-text-secondary)]">
            {def.label ?? propNameToLabel(def.name)}
          </label>
          {modified && <ModifiedDot />}
        </div>
        {isSegmented ? (
          <div
            role="group"
            aria-label={def.label ?? propNameToLabel(def.name)}
            className="flex rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-0.5 gap-0.5"
          >
            {def.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(def.name, opt)}
                aria-pressed={String(value) === opt}
                className={[
                  'flex-1 py-1.5 rounded text-xs font-medium transition-colors capitalize',
                  String(value) === opt
                    ? 'bg-[var(--diwa-bg-base)] text-[var(--diwa-text-primary)] shadow-sm'
                    : 'text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)]',
                ].join(' ')}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <select
            id={controlId}
            value={String(value)}
            onChange={(e) => onChange(def.name, e.target.value)}
            className={INPUT_CLASS}
          >
            {def.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )}
      </div>
    );
  }

  if (def.type === 'number') {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <label htmlFor={controlId} className="text-xs text-[var(--diwa-text-secondary)]">
            {def.label ?? propNameToLabel(def.name)}
          </label>
          {modified && <ModifiedDot />}
        </div>
        <input
          id={controlId}
          type="number"
          value={Number(value)}
          min={def.min}
          max={def.max}
          step={def.step}
          onChange={(e) => onChange(def.name, e.target.valueAsNumber)}
          className={INPUT_CLASS}
        />
      </div>
    );
  }

  if (def.type === 'color') {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <label htmlFor={controlId} className="text-xs text-[var(--diwa-text-secondary)]">
            {def.label ?? propNameToLabel(def.name)}
          </label>
          {modified && <ModifiedDot />}
        </div>
        <div className="flex items-center gap-2">
          <input
            id={controlId}
            type="color"
            value={String(value)}
            onChange={(e) => onChange(def.name, e.target.value)}
            className="w-8 h-8 rounded border border-[var(--diwa-border)] cursor-pointer bg-transparent p-0"
          />
          <input
            type="text"
            value={String(value)}
            onChange={(e) => onChange(def.name, e.target.value)}
            className={`${INPUT_CLASS} flex-1`}
            aria-label={`${def.name} hex value`}
          />
        </div>
      </div>
    );
  }

  if (def.type === 'range') {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5">
            <label htmlFor={controlId} className="text-xs text-[var(--diwa-text-secondary)]">
              {def.label ?? propNameToLabel(def.name)}
            </label>
            {modified && <ModifiedDot />}
          </div>
          <span className="text-xs tabular-nums text-[var(--diwa-text-secondary)]">
            {String(value)}
          </span>
        </div>
        <input
          id={controlId}
          type="range"
          min={def.min}
          max={def.max}
          step={def.step ?? 1}
          value={Number(value)}
          onChange={(e) => onChange(def.name, e.target.valueAsNumber)}
          className="w-full accent-[var(--diwa-accent)] h-1.5"
        />
      </div>
    );
  }

  // string (default)
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <label htmlFor={controlId} className="text-xs text-[var(--diwa-text-secondary)]">
          {def.label ?? propNameToLabel(def.name)}
        </label>
        {modified && <ModifiedDot />}
      </div>
      <input
        id={controlId}
        type="text"
        value={String(value)}
        onChange={(e) => onChange(def.name, e.target.value)}
        className={INPUT_CLASS}
      />
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────────────── */

/**
 * ConfiguratorControls — portals an enterprise-level prop-control panel into
 * `#diwa-sidebar-end` (the right sidebar rendered by Canvas on configurator pages).
 *
 * Features:
 * - Grouped accordion sections with collapse
 * - Toggle switches for booleans
 * - Modified-value indicators (accent dot + count badge)
 * - Per-section and global reset
 * - Search/filter for props
 * - Color picker and range slider controls
 */
export function ConfiguratorControls({ propDefinitions, storyState, setStoryState, defaultState }: Props) {
  const { isSidebarEndOpen } = useSidebar();
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setPortalTarget(isSidebarEndOpen ? document.getElementById('diwa-sidebar-end') : null);
  }, [isSidebarEndOpen]);

  const props = storyState.properties ?? {};
  const defaults = defaultState?.properties ?? {};

  function update(name: string, value: unknown) {
    setStoryState((prev) => ({
      ...prev,
      properties: { ...(prev.properties ?? {}), [name]: value },
    }));
  }

  function resetProps(defs: PropDefinition[]) {
    setStoryState((prev) => {
      const next = { ...(prev.properties ?? {}) };
      for (const def of defs) {
        const defVal = defaults[def.name] ?? getDefault(def);
        next[def.name] = defVal;
      }
      return { ...prev, properties: next };
    });
  }

  function resetAll() {
    resetProps(propDefinitions);
  }

  // Filter + group
  const filtered = useMemo(() => {
    if (!filter) return propDefinitions;
    const q = filter.toLowerCase();
    return propDefinitions.filter((d) =>
      d.name.toLowerCase().includes(q) ||
      d.description?.toLowerCase().includes(q) ||
      d.group?.toLowerCase().includes(q),
    );
  }, [propDefinitions, filter]);

  const grouped = useMemo(() => groupDefs(filtered), [filtered]);

  const totalModified = useMemo(() => {
    let count = 0;
    for (const def of propDefinitions) {
      const defVal = defaults[def.name] ?? getDefault(def);
      if (isModified(props[def.name], defVal)) count++;
    }
    return count;
  }, [propDefinitions, props, defaults]);

  if (!portalTarget) return null;

  const controls = (
    <div className="flex flex-col h-full">
      {/* ── Header with search + reset ──────────────────────────── */}
      <div className="px-4 pt-3 pb-2 space-y-2 border-b border-[var(--diwa-border)]">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-[var(--diwa-text-secondary)]">
            Props
          </h3>
          {totalModified > 0 && (
            <ResetButton onClick={resetAll} label="Reset all props" />
          )}
        </div>
        {propDefinitions.length > 5 && (
          <div className="relative">
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--diwa-text-tertiary)]"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="10.5" y1="10.5" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter props…"
              className="w-full h-8 rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] text-[var(--diwa-text-primary)] text-xs pl-8 pr-3 placeholder:text-[var(--diwa-text-tertiary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--diwa-border-focus)]"
            />
          </div>
        )}
      </div>

      {/* ── Grouped sections ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {grouped.size === 0 && filter && (
          <p className="px-4 py-6 text-xs text-[var(--diwa-text-tertiary)] text-center">
            No props match &ldquo;{filter}&rdquo;
          </p>
        )}

        {Array.from(grouped.entries()).map(([groupName, defs]) => {
          const modifiedInGroup = defs.filter((d) => {
            const defVal = defaults[d.name] ?? getDefault(d);
            return isModified(props[d.name], defVal);
          }).length;

          return (
            <AccordionSection
              key={groupName}
              title={groupName}
              modifiedCount={modifiedInGroup}
              onReset={() => resetProps(defs)}
            >
              {defs.map((def) => {
                const defVal = defaults[def.name] ?? getDefault(def);
                const current = props[def.name] ?? defVal;
                const mod = isModified(props[def.name], defVal);
                return (
                  <div key={def.name}>
                    <PropControl def={def} value={current} modified={mod} onChange={update} />
                    {def.description && (
                      <p className="mt-1 text-[11px] text-[var(--diwa-text-tertiary)] leading-tight">
                        {def.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </AccordionSection>
          );
        })}
      </div>
    </div>
  );

  return createPortal(controls, portalTarget);
}

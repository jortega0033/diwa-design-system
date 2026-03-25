'use client';

import React, { useEffect, useMemo, useRef, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
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
    <diwa-switch
      id={id}
      checked={checked}
      onClick={() => onChange(!checked)}
      compact
      aria-label={id}
    />
  );
}

function DiwaSelectControl({
  id,
  label,
  options,
  value,
  onValueChange,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ value?: string }>).detail;
      const next = detail?.value;
      if (typeof next === 'string') onValueChange(next);
    };

    el.addEventListener('change', handler as EventListener);
    return () => el.removeEventListener('change', handler as EventListener);
  }, [onValueChange]);

  return (
    <diwa-select
      ref={(node: HTMLElement | null) => {
        ref.current = node as HTMLElement | null;
      }}
      value={value}
      label={label}
      hideLabel
      compact
    >
      {options.map((opt) => (
        <diwa-select-option key={opt} value={opt}>{opt}</diwa-select-option>
      ))}
    </diwa-select>
  );
}

function DiwaSegmentedControl({
  id,
  label,
  options,
  value,
  onValueChange,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ value?: string }>).detail;
      const next = detail?.value;
      if (typeof next === 'string') onValueChange(next);
    };

    el.addEventListener('update', handler as EventListener);
    return () => el.removeEventListener('update', handler as EventListener);
  }, [onValueChange]);

  return (
    <diwa-segmented-control
      id={id}
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      value={value}
      aria-label={label}
      compact
    >
      {options.map((opt) => (
        <diwa-segmented-control-item key={opt} value={opt}>
          {opt}
        </diwa-segmented-control-item>
      ))}
    </diwa-segmented-control>
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
    <diwa-button-pure
      onClick={onClick}
      size="sm"
      color="secondary"
      icon="none"
      title={label}
      aria-label={label}
    >
      Reset
    </diwa-button-pure>
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
    <div className="border-b border-[var(--diwa-border)] last:border-b-0">
      <div className="flex items-center gap-2 hover:bg-[var(--diwa-bg-hover)] transition-colors">
        <diwa-button-pure
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 flex-1 px-4 py-2.5 text-left min-w-0"
          aria-expanded={open ? 'true' : 'false'}
          icon="none"
          color="secondary"
          size="sm"
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
        </diwa-button-pure>
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
          <DiwaSegmentedControl
            id={controlId}
            label={def.label ?? propNameToLabel(def.name)}
            options={def.options}
            value={String(value)}
            onValueChange={(next) => onChange(def.name, next)}
          />
        ) : (
          <DiwaSelectControl
            id={controlId}
            label={def.label ?? propNameToLabel(def.name)}
            options={def.options}
            value={String(value)}
            onValueChange={(next) => onChange(def.name, next)}
          />
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
        <diwa-input-number
          id={controlId}
          value={String(value ?? '')}
          min={def.min}
          max={def.max}
          step={def.step}
          label={def.label ?? propNameToLabel(def.name)}
          hideLabel
          compact
          onInput={(e: FormEvent<HTMLElement>) => {
            const next = Number(((e.nativeEvent as unknown) as CustomEvent<string>).detail ?? 0);
            onChange(def.name, Number.isNaN(next) ? 0 : next);
          }}
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
          <diwa-input-text
            value={String(value)}
            label={`${def.name} hex value`}
            hideLabel
            compact
            onInput={(e: FormEvent<HTMLElement>) => onChange(def.name, (((e.nativeEvent as unknown) as CustomEvent<string>).detail ?? ''))}
            className="flex-1"
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
      <diwa-input-text
        id={controlId}
        value={String(value)}
        label={def.label ?? propNameToLabel(def.name)}
        hideLabel
        compact
        onInput={(e: FormEvent<HTMLElement>) => onChange(def.name, (((e.nativeEvent as unknown) as CustomEvent<string>).detail ?? ''))}
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
  const groupedEntries = useMemo(() => Array.from(grouped.entries()), [grouped]);
  const isSingleDefaultGroup = groupedEntries.length === 1 && groupedEntries[0]?.[0] === DEFAULT_GROUP;

  const totalModified = useMemo(() => {
    let count = 0;
    for (const def of propDefinitions) {
      const defVal = defaults[def.name] ?? getDefault(def);
      if (isModified(props[def.name], defVal)) count++;
    }
    return count;
  }, [propDefinitions, props, defaults]);

  if (!portalTarget) return null;

  const renderPropList = (defs: PropDefinition[]) => (
    <div className="space-y-3">
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
    </div>
  );

  const controls = (
    <div className="flex flex-col h-full">
      {/* ── Header with search + reset ──────────────────────────── */}
      <div className="px-4 pt-3 pb-2 space-y-2 border-b border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]/70 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-[var(--diwa-text-secondary)]">
            Properties
          </h3>
          {totalModified > 0 && (
            <ResetButton onClick={resetAll} label="Reset all props" />
          )}
        </div>
        {propDefinitions.length > 5 && (
          <div>
            <diwa-input-search
              value={filter}
              label="Filter props"
              hideLabel
              compact
              placeholder="Filter props..."
              onInput={(e: FormEvent<HTMLElement>) => setFilter((((e.nativeEvent as unknown) as CustomEvent<string>).detail ?? ''))}
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

        {isSingleDefaultGroup && groupedEntries[0] && (
          <div className="px-4 py-3">
            {renderPropList(groupedEntries[0][1])}
          </div>
        )}

        {!isSingleDefaultGroup && groupedEntries.map(([groupName, defs]) => {
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
              {renderPropList(defs)}
            </AccordionSection>
          );
        })}
      </div>
    </div>
  );

  return createPortal(controls, portalTarget);
}

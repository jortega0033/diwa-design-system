import React from 'react';

export type AriaRow = { property: string; value: string; note?: string };

export function AriaTable({ rows }: { rows: AriaRow[] }) {
  const hasNotes = rows.some((r) => r.note !== undefined);
  const cols = hasNotes ? ['Property', 'Value', 'Note'] : ['Attribute / Property', 'Value / Behaviour'];
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
            {cols.map((col, idx) => (
              <th
                {...(!hasNotes && idx === 0 ? { className: 'px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/3' } : { className: 'px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]' })}
                key={col}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.property} className={i % 2 === 0 ? '' : 'bg-[var(--diwa-bg-surface)]'}>
              <td className="px-4 py-3">
                <code className="text-xs font-mono text-[var(--diwa-text-primary)]">{row.property}</code>
              </td>
              <td className="px-4 py-3">
                {hasNotes ? (
                  <code className="text-xs font-mono text-[var(--diwa-accent)]">{row.value}</code>
                ) : (
                  <span className="text-[var(--diwa-text-secondary)]">{row.value}</span>
                )}
              </td>
              {hasNotes && (
                <td className="px-4 py-3 text-[var(--diwa-text-secondary)]">{row.note ?? '—'}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';

export type KeyRow = { key: string; action: string };

export function KeyboardTable({ rows }: { rows: KeyRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/3">
              Key
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.key} className={i % 2 === 0 ? '' : 'bg-[var(--diwa-bg-surface)]'}>
              <td className="px-4 py-3">
                <kbd className="px-2 py-0.5 rounded border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] font-mono text-xs text-[var(--diwa-text-primary)]">
                  {row.key}
                </kbd>
              </td>
              <td className="px-4 py-3 text-[var(--diwa-text-secondary)]">{row.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

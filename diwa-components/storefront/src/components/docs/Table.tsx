import React from 'react';

export function Table({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)] mb-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 !== 0 ? 'bg-[var(--diwa-bg-surface)]' : ''}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[var(--diwa-text-secondary)] align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

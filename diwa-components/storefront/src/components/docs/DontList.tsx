import React from 'react';

export function DontList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5 text-sm text-[var(--diwa-text-secondary)]">
          <span className="mt-0.5 text-[var(--diwa-notification-error)] shrink-0">✕</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

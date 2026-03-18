import React from 'react';

export function DontCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
      <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">
        Don&apos;t
      </p>
      {children}
    </div>
  );
}

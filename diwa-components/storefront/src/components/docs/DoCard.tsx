import React from 'react';

export function DoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-lg border border-[var(--diwa-notification-success)] bg-[var(--diwa-notification-success-soft)]">
      <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-success)]">
        Do
      </p>
      {children}
    </div>
  );
}

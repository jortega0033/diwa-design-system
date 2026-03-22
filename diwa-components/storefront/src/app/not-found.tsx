import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto py-24 px-4 text-center">
      <h1 className="text-5xl font-extrabold text-[var(--diwa-text-primary)] mb-4">404</h1>
      <p className="text-lg text-[var(--diwa-text-secondary)] mb-6">We couldn't find the page you're looking for.</p>

      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] px-4 py-2 text-sm font-medium text-[var(--diwa-text-primary)] hover:border-[var(--diwa-accent)] hover:text-[var(--diwa-accent)] transition-colors"
        >
          Return to home
        </Link>

        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Or explore the components library:
          <Link href="/components" className="ml-2 text-[var(--diwa-accent)] hover:underline">
            View components
          </Link>
        </p>
      </div>
    </div>
  );
}

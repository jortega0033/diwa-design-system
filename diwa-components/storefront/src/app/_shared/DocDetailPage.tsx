import Link from 'next/link';
import React from 'react';
import { CodeSnippet, Section } from '@/components/docs';
import type { DocDetail, DocLinkAction } from './docsContent';

function NextActionCard({ action }: { action: DocLinkAction }) {
  const className = 'rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4 hover:border-[var(--diwa-accent)] transition-colors';

  if (action.external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">{action.label}</p>
        <p className="text-xs text-[var(--diwa-text-secondary)] leading-relaxed">{action.description}</p>
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">{action.label}</p>
      <p className="text-xs text-[var(--diwa-text-secondary)] leading-relaxed">{action.description}</p>
    </Link>
  );
}

export function DocDetailPage({ doc }: { doc: DocDetail }) {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">{doc.title}</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">{doc.intro}</p>

      {doc.prerequisites && doc.prerequisites.length > 0 && (
        <Section title="Prerequisites">
          <ul className="space-y-2">
            {doc.prerequisites.map((item) => (
              <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
                - {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {doc.steps?.map((step, index) => (
        <Section key={step.title} title={`Step ${index + 1}: ${step.title}`}>
          <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">{step.description}</p>
          {step.code && <CodeSnippet code={step.code} />}
        </Section>
      ))}

      {doc.notes && doc.notes.length > 0 && (
        <Section title={doc.notesTitle ?? 'Implementation Notes'}>
          <ul className="space-y-2">
            {doc.notes.map((note) => (
              <li key={note} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
                - {note}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {doc.troubleshooting && doc.troubleshooting.length > 0 && (
        <Section title="Troubleshooting">
          <ul className="space-y-2">
            {doc.troubleshooting.map((item) => (
              <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
                - {item}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Next Actions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {doc.nextActions.map((action) => (
            <NextActionCard key={`${action.href}:${action.label}`} action={action} />
          ))}
        </div>
      </Section>
    </div>
  );
}

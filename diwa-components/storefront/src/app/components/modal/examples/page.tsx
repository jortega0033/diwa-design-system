'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  modalStoryBasic,
  modalStoryWithFooter,
  modalStoryWithHeader,
  modalStoryScrollable,
  modalStoryShadingBackdrop,
} from '../modal.stories';

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-2">{title}</h2>
      {description && (
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">{description}</p>
      )}
      {children}
    </section>
  );
}

export default function ModalExamplesPage() {
  return (
    <div className="space-y-2">
      <Section
        title="Basic"
        description="A simple modal with heading and body text. No footer — dismiss via the × button or Escape key."
      >
        <ComponentStory story={modalStoryBasic} />
      </Section>

      <Section
        title="With footer"
        description="The sticky footer slot holds primary and secondary action buttons. Use clear, action-oriented labels."
      >
        <ComponentStory story={modalStoryWithFooter} />
      </Section>

      <Section
        title="With header slot"
        description="The header slot adds a description or metadata line below the title bar, before the body."
      >
        <ComponentStory story={modalStoryWithHeader} />
      </Section>

      <Section
        title="Scrollable content"
        description="The body scrolls independently when content exceeds the modal's max-height. The footer stays pinned."
      >
        <ComponentStory story={modalStoryScrollable} />
      </Section>

      <Section
        title="Shading backdrop"
        description="Use the shading backdrop for system-triggered modals (session expiry, cookie consent). Backdrop click is disabled."
      >
        <ComponentStory story={modalStoryShadingBackdrop} />
      </Section>
    </div>
  );
}

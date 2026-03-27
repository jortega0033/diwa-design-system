'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { CodeSnippet } from '@/components/docs';
import { generateHtmlMarkup } from '@/utils/generator/generateHtmlMarkup';
import {
  dropdownBasicStory,
  dropdownCustomTriggerStory,
  dropdownNestedStory,
} from '../dropdown.stories';

export default function DropdownExamplesPage() {
  const implementationSnippet = generateHtmlMarkup(
    dropdownBasicStory.generator(dropdownBasicStory.state ?? {}),
  );

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Default dropdown</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Uses the built-in trigger (a diwa-button) and menuitem buttons as content.
        </p>
        <ComponentStory story={dropdownBasicStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Custom trigger slot</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Supply any trigger component through the <code className="text-xs font-mono">trigger</code> slot.
        </p>
        <ComponentStory story={dropdownCustomTriggerStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Nested submenu</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Place a second <code className="text-xs font-mono">diwa-dropdown</code> inside menu content and set{' '}
          <code className="text-xs font-mono">submenu</code> for side placement and submenu keyboard handling.
        </p>
        <ComponentStory story={dropdownNestedStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Implementation snippet</h2>
        <CodeSnippet code={implementationSnippet} />
      </section>
    </div>
  );
}

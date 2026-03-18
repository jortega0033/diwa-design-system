import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';




const snippet = `<!-- Basic search field -->
<diwa-input-search
  id="search"
  label="Search"
  placeholder="Search components…"
  show-clear-button
></diwa-input-search>

<script>
  const search = document.getElementById('search');
  search.addEventListener('input', (e) => filterResults(e.detail));
</script>`;

export default function InputSearchUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <Section title="When to use">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>diwa-input-search</Code> for search fields. The clear button (×) appears automatically
          when the field has a value, giving users a quick way to reset the search without selecting
          all text.
        </p>
      </Section>

      <Section title="Example">
        <CodeSnippet code={snippet} />
      </Section>

      <Section title="Hiding the label">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          In compact toolbars, set <Code>hideLabel</Code> to visually hide the label while retaining it
          as an accessible name via <Code>aria-label</Code>.
        </p>
      </Section>

      <Section title="Clear button">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          The clear button is shown only when <Code>value</Code> is non-empty, <Code>disabled</Code> is{' '}
          <Code>false</Code>, and <Code>readonly</Code> is <Code>false</Code>. Set{' '}
          <Code>showClearButton={'{false}'}</Code> to suppress it entirely — for example in a filter
          field where clearing should be done through a separate Reset button.
        </p>
      </Section>
    </div>
  );
}

import React from 'react';
import { Section, Code, CodeSnippet, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function PaginationUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
                'Use when a data set has more items than can be shown on a single screen (typically more than 25–50 rows).',
                'Use on search results, data tables, and catalogue grids where the user may want to jump to a specific page.',
                'Use with a per-page selector so users can control the page size.',
                'Place pagination at the bottom of the list it controls, ideally with a result count summary above.',
                'Prefer pagination over infinite scroll when the user needs to share, bookmark, or return to a specific position.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
                "Don't use pagination for fewer than 2 pages — hide the component entirely.",
                "Don't use pagination for continuous content such as feeds, timelines, or chat — use infinite scroll instead.",
                "Don't place pagination above the list; users need to scroll through results before navigating.",
                "Don't update the URL without preserving pagination state — the back button must restore the correct page.",
                "Don't reset the active page to 1 when filtering unless the filter genuinely invalidates the current page.",
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Controlled pattern">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          <Code>diwa-pagination</Code> is <strong className="text-[var(--diwa-text-primary)]">semi-controlled</strong>:{' '}
          it mutates its own <Code>active-page</Code> prop on user interaction and simultaneously
          emits an <Code>update</Code> event carrying <Code>{'{ page, previousPage }'}</Code>.
          Listen to <Code>update</Code> to sync external state or fire a data-fetch.
        </p>
        <CodeSnippet
          code={`// Vanilla JS
const el = document.querySelector('diwa-pagination');
el.addEventListener('update', (e) => {
  const { page, previousPage } = e.detail;
  fetchPage(page);
});

// React — lowercase onupdate (React 19 custom element mapping)
<diwa-pagination
  total-items-count={totalCount}
  items-per-page={pageSize}
  active-page={currentPage}
  onupdate={(e) => {
    setCurrentPage(e.detail.page);
    fetchPage(e.detail.page);
  }}
/>`}
        />
      </Section>

      <Section title="Hiding the last-page shortcut">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          By default the last page number is always shown so users know the extent of the data
          set. Set <Code>show-last-page=&quot;false&quot;</Code> when the total count is unknown
          (cursor-based pagination) or when showing the last page is not meaningful.
        </p>
        <CodeSnippet
          code={`<!-- When the total count is known — show last page (default) -->
<diwa-pagination total-items-count="1000" items-per-page="25" />

<!-- When the total count is unknown / streaming -->
<diwa-pagination total-items-count="9999" items-per-page="25" show-last-page="false" />`}
        />
      </Section>

      <Section title="Localisation">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          Override the default aria-label strings via the <Code>intl</Code> prop. This is a plain
          object — pass it as a JavaScript reference rather than a JSON string attribute.
        </p>
        <CodeSnippet
          code={`// React / Stencil JSX
<diwa-pagination
  intl={{ root: 'Seitennavigation', prev: 'Vorherige Seite', next: 'Nächste Seite', page: 'Seite' }}
  total-items-count={500}
  items-per-page={25}
/>

// Vanilla JS — assign the property directly (not via setAttribute)
const el = document.querySelector('diwa-pagination');
el.intl = { root: 'Navigation', prev: 'Précédent', next: 'Suivant', page: 'Page' };`}
        />
      </Section>
    </div>
  );
}

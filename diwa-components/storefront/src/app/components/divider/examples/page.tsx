'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { Playground } from '@/components/playground/Playground';
import type { Story } from '@/models/story';
import type { FrameworkCode } from '@/models/framework';

// ── Story definitions ─────────────────────────────────────────────────────

const horizontalStory: Story<'diwa-divider'> = {
  state: { properties: { orientation: 'horizontal', theme: 'dark' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-divider' as const, properties: properties ?? {} },
  ],
};

const verticalStory: Story<'diwa-divider'> = {
  state: { properties: { orientation: 'vertical', theme: 'dark' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-divider' as const, properties: properties ?? {} },
  ],
};

const lightStory: Story<'diwa-divider'> = {
  state: { properties: { orientation: 'horizontal', theme: 'light' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-divider' as const, properties: properties ?? {} },
  ],
};

// ── Static framework code for custom-layout examples ────────────────────────

const dividerVerticalCode: FrameworkCode = {
  html: `<div style="display:flex;align-items:stretch;gap:1.5rem;height:5rem;">
  <span>Section A</span>
  <diwa-divider orientation="vertical"></diwa-divider>
  <span>Section B</span>
  <diwa-divider orientation="vertical"></diwa-divider>
  <span>Section C</span>
</div>`,
  react: `<div style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem', height: '5rem' }}>
  <span>Section A</span>
  <diwa-divider orientation="vertical" />
  <span>Section B</span>
  <diwa-divider orientation="vertical" />
  <span>Section C</span>
</div>`,
  angular: `<div style="display:flex;align-items:stretch;gap:1.5rem;height:5rem;">
  <span>Section A</span>
  <diwa-divider orientation="vertical"></diwa-divider>
  <span>Section B</span>
  <diwa-divider orientation="vertical"></diwa-divider>
  <span>Section C</span>
</div>`,
  vue: `<div style="display:flex;align-items:stretch;gap:1.5rem;height:5rem;">
  <span>Section A</span>
  <diwa-divider orientation="vertical"></diwa-divider>
  <span>Section B</span>
  <diwa-divider orientation="vertical"></diwa-divider>
  <span>Section C</span>
</div>`,
};

const dividerSectionedCode: FrameworkCode = {
  html: `<div style="display:flex;flex-direction:column;gap:1rem;">
  <div>
    <p><strong>Account details</strong></p>
    <p>Manage your personal information and preferences.</p>
  </div>
  <diwa-divider></diwa-divider>
  <div>
    <p><strong>Notifications</strong></p>
    <p>Configure when and how you receive alerts.</p>
  </div>
  <diwa-divider></diwa-divider>
  <div>
    <p><strong>Privacy &amp; security</strong></p>
    <p>Control your data and connected applications.</p>
  </div>
</div>`,
  react: `<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
  <div>
    <p><strong>Account details</strong></p>
    <p>Manage your personal information and preferences.</p>
  </div>
  <diwa-divider />
  <div>
    <p><strong>Notifications</strong></p>
    <p>Configure when and how you receive alerts.</p>
  </div>
  <diwa-divider />
  <div>
    <p><strong>Privacy &amp; security</strong></p>
    <p>Control your data and connected applications.</p>
  </div>
</div>`,
  angular: `<div style="display:flex;flex-direction:column;gap:1rem;">
  <div><p><strong>Account details</strong></p></div>
  <diwa-divider></diwa-divider>
  <div><p><strong>Notifications</strong></p></div>
  <diwa-divider></diwa-divider>
  <div><p><strong>Privacy &amp; security</strong></p></div>
</div>`,
  vue: `<div style="display:flex;flex-direction:column;gap:1rem;">
  <div><p><strong>Account details</strong></p></div>
  <diwa-divider></diwa-divider>
  <div><p><strong>Notifications</strong></p></div>
  <diwa-divider></diwa-divider>
  <div><p><strong>Privacy &amp; security</strong></p></div>
</div>`,
};

const dividerNavCode: FrameworkCode = {
  html: `<nav style="display:flex;align-items:stretch;height:3rem;padding:0 1rem;">
  <button>Overview</button>
  <diwa-divider orientation="vertical" style="margin:8px 0"></diwa-divider>
  <button>Analytics</button>
  <diwa-divider orientation="vertical" style="margin:8px 0"></diwa-divider>
  <button>Reports</button>
  <diwa-divider orientation="vertical" style="margin:8px 0"></diwa-divider>
  <button>Settings</button>
</nav>`,
  react: `<nav style={{ display: 'flex', alignItems: 'stretch', height: '3rem', padding: '0 1rem' }}>
  {['Overview', 'Analytics', 'Reports', 'Settings'].map((label, i, arr) => (
    <React.Fragment key={label}>
      <button>{label}</button>
      {i < arr.length - 1 && (
        <diwa-divider orientation="vertical" style={{ margin: '8px 0' }} />
      )}
    </React.Fragment>
  ))}
</nav>`,
  angular: `<nav style="display:flex;align-items:stretch;height:3rem;padding:0 1rem;">
  <button>Overview</button>
  <diwa-divider orientation="vertical" style="margin:8px 0"></diwa-divider>
  <button>Analytics</button>
  <diwa-divider orientation="vertical" style="margin:8px 0"></diwa-divider>
  <button>Reports</button>
  <diwa-divider orientation="vertical" style="margin:8px 0"></diwa-divider>
  <button>Settings</button>
</nav>`,
  vue: `<nav style="display:flex;align-items:stretch;height:3rem;padding:0 1rem;">
  <button>Overview</button>
  <diwa-divider orientation="vertical" style="margin:8px 0"></diwa-divider>
  <button>Analytics</button>
  <diwa-divider orientation="vertical" style="margin:8px 0"></diwa-divider>
  <button>Reports</button>
  <diwa-divider orientation="vertical" style="margin:8px 0"></diwa-divider>
  <button>Settings</button>
</nav>`,
};

// ── Section helper ────────────────────────────────────────────────────────

function ExampleSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-[var(--diwa-text-primary)] mb-1">{title}</h2>
      {description && (
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">{description}</p>
      )}
      {children}
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function DividerExamplesPage() {
  return (
    <div className="space-y-2">
      <ExampleSection
        title="Horizontal (default)"
        description="A full-width 1 px horizontal rule. The host element is display:block and fills its container width."
      >
        <ComponentStory story={horizontalStory} />
      </ExampleSection>

      <ExampleSection
        title="Vertical"
        description="A 1 px vertical rule that stretches to the height of its flex parent. The parent below uses display:flex with a fixed height."
      >
        <Playground frameworkCode={dividerVerticalCode} previewClassName="!items-stretch gap-6 justify-center">
          <span className="text-sm text-[var(--diwa-text-secondary)] self-center">Section A</span>
          <diwa-divider orientation="vertical" />
          <span className="text-sm text-[var(--diwa-text-secondary)] self-center">Section B</span>
          <diwa-divider orientation="vertical" />
          <span className="text-sm text-[var(--diwa-text-secondary)] self-center">Section C</span>
        </Playground>
      </ExampleSection>

      <ExampleSection
        title="Sectioned content"
        description="Horizontal dividers separating distinct content blocks — a common pattern for article sections, settings panels, and cards."
      >
        <Playground frameworkCode={dividerSectionedCode}>
          <div className="space-y-4 w-full">
            <div>
              <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">Account details</p>
              <p className="text-sm text-[var(--diwa-text-secondary)]">Manage your personal information and preferences.</p>
            </div>
            <diwa-divider />
            <div>
              <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">Notifications</p>
              <p className="text-sm text-[var(--diwa-text-secondary)]">Configure when and how you receive alerts.</p>
            </div>
            <diwa-divider />
            <div>
              <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">Privacy &amp; security</p>
              <p className="text-sm text-[var(--diwa-text-secondary)]">Control your data and connected applications.</p>
            </div>
          </div>
        </Playground>
      </ExampleSection>

      <ExampleSection
        title="Navigation bar"
        description="Vertical dividers between navigation items in a horizontal toolbar."
      >
        <Playground frameworkCode={dividerNavCode} previewClassName="!p-0">
          <div className="px-4 flex items-stretch h-12 w-full">
            {['Overview', 'Analytics', 'Reports', 'Settings'].map((label, i, arr) => (
              <React.Fragment key={label}>
                <button className="px-4 text-sm text-[var(--diwa-text-secondary)] hover:text-[var(--diwa-text-primary)] transition-colors">
                  {label}
                </button>
                {i < arr.length - 1 && (
                  <diwa-divider orientation="vertical" style={{ margin: '8px 0' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </Playground>
      </ExampleSection>

      <ExampleSection
        title="Light theme"
        description="Per-component theme override — sets data-theme=&quot;light&quot; on the host element."
      >
        <ComponentStory story={lightStory} />
      </ExampleSection>
    </div>
  );
}

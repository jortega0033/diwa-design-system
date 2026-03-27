import React from 'react';
import { Section, Code, CodeSnippet, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function DropdownUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList
              items={[
                'Group related actions behind a single trigger to reduce visual noise.',
                'Use nested submenus only when a flat list would be too long or unclear.',
                'Use clear, action-oriented labels for each menu item.',
                'Close the menu after selection for command menus (closeOnSelect=true).',
                'Use custom trigger slot when the trigger must match a specific product pattern.',
              ]}
            />
          </DoCard>
          <DontCard>
            <DontList
              items={[
                "Don't use Dropdown for irreversible destructive flows without confirmation.",
                "Don't place long paragraph content inside dropdown panels.",
                "Don't hide critical primary actions inside a menu when visibility is needed.",
                "Don't nest more than one submenu depth unless absolutely necessary.",
                "Don't mix navigation and destructive actions without visual separation.",
              ]}
            />
          </DontCard>
        </div>
      </Section>

      <Section title="Trigger patterns">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The component supports both a built-in trigger and a custom trigger slot. Prefer the slot when
          you need complete trigger control (icon-only, avatar trigger, custom layout).
        </p>
        <CodeSnippet
          code={`<!-- Built-in trigger -->
<diwa-dropdown trigger-label="Actions" trigger-variant="secondary">
  <button role="menuitem" type="button">Edit</button>
</diwa-dropdown>

<!-- Custom trigger slot -->
<diwa-dropdown>
  <diwa-button slot="trigger" variant="primary" icon="chevron-down">Project menu</diwa-button>
  <button role="menuitem" type="button">Rename</button>
</diwa-dropdown>`}
        />
      </Section>

      <Section title="Nested submenu">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use <Code>submenu</Code> for nested menu instances. This enables side placement and submenu keyboard
          behavior for <Code>ArrowRight</Code>/<Code>ArrowLeft</Code>.
        </p>
        <CodeSnippet
          code={`<diwa-dropdown trigger-label="Actions">
  <button role="menuitem" type="button">New file</button>

  <diwa-dropdown submenu trigger-label="Share">
    <button role="menuitem" type="button">Slack</button>
    <button role="menuitem" type="button">Email</button>
  </diwa-dropdown>
</diwa-dropdown>`}
        />
      </Section>

      <Section title="Item semantics">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Menu items should be interactive elements with clear semantics. Use buttons for in-app commands
          and anchors for navigation.
        </p>
        <CodeSnippet
          code={`<diwa-dropdown trigger-label="Navigate">
  <a href="/dashboard" role="menuitem" data-dropdown-item="true">Dashboard</a>
  <a href="/settings" role="menuitem" data-dropdown-item="true">Settings</a>
</diwa-dropdown>`}
        />
      </Section>
    </div>
  );
}

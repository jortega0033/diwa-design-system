'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Code } from '@/components/docs';
import { Playground } from '@/components/playground/Playground';
import type { FrameworkCode } from '@/models/framework';

const basicTabs = ['Overview', 'Details', 'Settings'] as const;

const basicPanels = [
  'Overview: A summary of the selected item and its key metrics.',
  'Details: In-depth specifications and configuration options.',
  'Settings: Customise preferences and notifications.',
];

const fourTabs = ['Overview', 'Details', 'Settings', 'History'] as const;

const fourPanels = [
  'Overview: High-level status, owners, and KPIs for the current workspace.',
  'Details: Product specifications, dependencies, and implementation notes.',
  'Settings: Notification rules, access controls, and display preferences.',
  'History: A timeline of releases, edits, and important system events.',
];

const disabledTabs = ['Overview', 'Reports', 'Settings'] as const;

const disabledPanels = [
  'Overview: Core workspace information is available to all users.',
  'Reports: This destination is currently unavailable because the user does not have reporting access.',
  'Settings: Administrators can review workspace rules, alerts, and defaults here.',
];

const basicWithPanelCode: FrameworkCode = {
  html: `<div>
  <diwa-tabs-bar id="bar" active-tab-index="0">
    <button>Overview</button>
    <button>Details</button>
    <button>Settings</button>
  </diwa-tabs-bar>
  <div id="panel" style="padding: 1rem; font-size: 0.875rem;">
    Overview: A summary of the selected item and its key metrics.
  </div>
</div>
<script>
  const panels = [
    'Overview: A summary of the selected item and its key metrics.',
    'Details: In-depth specifications and configuration options.',
    'Settings: Customise preferences and notifications.',
  ];
  const bar = document.querySelector('#bar');
  const panel = document.querySelector('#panel');
  bar.addEventListener('update', (e) => {
    panel.textContent = panels[e.detail.activeTabIndex];
  });
</script>`,
  react: `import React, { useRef, useEffect, useState } from 'react';

const panels = [
  'Overview: A summary of the selected item and its key metrics.',
  'Details: In-depth specifications and configuration options.',
  'Settings: Customise preferences and notifications.',
];

export const TabsBarWithPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const handler = (e) => setActiveTab(e.detail.activeTabIndex);
    el.addEventListener('update', handler);
    return () => el.removeEventListener('update', handler);
  }, []);

  return (
    <div>
      <diwa-tabs-bar ref={barRef} active-tab-index={activeTab} class="block w-full">
        <button>Overview</button>
        <button>Details</button>
        <button>Settings</button>
      </diwa-tabs-bar>
      <div style={{ padding: '1rem', fontSize: '0.875rem' }}>
        {panels[activeTab]}
      </div>
    </div>
  );
};`,
  angular: `import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';

@Component({
  template: \`
    <diwa-tabs-bar #bar [attr.active-tab-index]="activeTab" class="block w-full">
      <button>Overview</button>
      <button>Details</button>
      <button>Settings</button>
    </diwa-tabs-bar>
    <div style="padding: 1rem; font-size: 0.875rem">{{ panels[activeTab] }}</div>
  \`,
})
export class TabsBarWithPanelComponent implements OnInit, OnDestroy {
  @ViewChild('bar') barRef!: ElementRef;
  activeTab = 0;
  panels = [
    'Overview: A summary of the selected item and its key metrics.',
    'Details: In-depth specifications and configuration options.',
    'Settings: Customise preferences and notifications.',
  ];

  ngOnInit() { this.barRef.nativeElement.addEventListener('update', this.onUpdate); }
  ngOnDestroy() { this.barRef.nativeElement.removeEventListener('update', this.onUpdate); }
  onUpdate = (e: CustomEvent) => { this.activeTab = e.detail.activeTabIndex; };
}`,
  vue: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const panels = [
  'Overview: A summary of the selected item and its key metrics.',
  'Details: In-depth specifications and configuration options.',
  'Settings: Customise preferences and notifications.',
];

const activeTab = ref(0);
const barEl = ref(null);
const onUpdate = (e) => { activeTab.value = e.detail.activeTabIndex; };

onMounted(() => barEl.value?.addEventListener('update', onUpdate));
onUnmounted(() => barEl.value?.removeEventListener('update', onUpdate));
</script>

<template>
  <div>
    <diwa-tabs-bar ref="barEl" :active-tab-index="activeTab" class="block w-full">
      <button>Overview</button>
      <button>Details</button>
      <button>Settings</button>
    </diwa-tabs-bar>
    <div style="padding: 1rem; font-size: 0.875rem">{{ panels[activeTab] }}</div>
  </div>
</template>`,
};

const fourTabsCode: FrameworkCode = {
  html: `<div>
  <diwa-tabs-bar id="bar" active-tab-index="0">
    <button>Overview</button>
    <button>Details</button>
    <button>Settings</button>
    <button>History</button>
  </diwa-tabs-bar>
  <div id="panel" style="padding: 1rem; font-size: 0.875rem;">
    Overview: High-level status, owners, and KPIs for the current workspace.
  </div>
</div>
<script>
  const panels = [
    'Overview: High-level status, owners, and KPIs for the current workspace.',
    'Details: Product specifications, dependencies, and implementation notes.',
    'Settings: Notification rules, access controls, and display preferences.',
    'History: A timeline of releases, edits, and important system events.',
  ];
  const bar = document.querySelector('#bar');
  const panel = document.querySelector('#panel');
  bar.addEventListener('update', (e) => {
    panel.textContent = panels[e.detail.activeTabIndex];
  });
</script>`,
  react: `import React, { useEffect, useRef, useState } from 'react';

const tabs = ['Overview', 'Details', 'Settings', 'History'];
const panels = [
  'Overview: High-level status, owners, and KPIs for the current workspace.',
  'Details: Product specifications, dependencies, and implementation notes.',
  'Settings: Notification rules, access controls, and display preferences.',
  'History: A timeline of releases, edits, and important system events.',
];

export const TabsBarFourTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const handler = (e) => setActiveTab(e.detail.activeTabIndex);
    el.addEventListener('update', handler);
    return () => el.removeEventListener('update', handler);
  }, []);

  return (
    <div>
      <diwa-tabs-bar ref={barRef} active-tab-index={activeTab} class="block w-full">
        {tabs.map((tab) => (
          <button key={tab}>{tab}</button>
        ))}
      </diwa-tabs-bar>
      <div style={{ padding: '1rem', fontSize: '0.875rem' }}>
        {panels[activeTab]}
      </div>
    </div>
  );
};`,
  angular: `import { Component, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';

@Component({
  template: \
    <div>
      <diwa-tabs-bar #bar [attr.active-tab-index]="activeTab" class="block w-full">
        <button>Overview</button>
        <button>Details</button>
        <button>Settings</button>
        <button>History</button>
      </diwa-tabs-bar>
      <div style="padding: 1rem; font-size: 0.875rem">{{ panels[activeTab] }}</div>
    </div>
  \,
})
export class TabsBarFourTabsComponent implements OnInit, OnDestroy {
  @ViewChild('bar') barRef!: ElementRef;
  activeTab = 0;
  panels = [
    'Overview: High-level status, owners, and KPIs for the current workspace.',
    'Details: Product specifications, dependencies, and implementation notes.',
    'Settings: Notification rules, access controls, and display preferences.',
    'History: A timeline of releases, edits, and important system events.',
  ];

  ngOnInit() { this.barRef.nativeElement.addEventListener('update', this.onUpdate); }
  ngOnDestroy() { this.barRef.nativeElement.removeEventListener('update', this.onUpdate); }
  onUpdate = (e: CustomEvent) => { this.activeTab = e.detail.activeTabIndex; };
}`,
  vue: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeTab = ref(0);
const barEl = ref(null);
const panels = [
  'Overview: High-level status, owners, and KPIs for the current workspace.',
  'Details: Product specifications, dependencies, and implementation notes.',
  'Settings: Notification rules, access controls, and display preferences.',
  'History: A timeline of releases, edits, and important system events.',
];
const onUpdate = (e) => { activeTab.value = e.detail.activeTabIndex; };

onMounted(() => barEl.value?.addEventListener('update', onUpdate));
onUnmounted(() => barEl.value?.removeEventListener('update', onUpdate));
</script>

<template>
  <div>
    <diwa-tabs-bar ref="barEl" :active-tab-index="activeTab" class="block w-full">
      <button>Overview</button>
      <button>Details</button>
      <button>Settings</button>
      <button>History</button>
    </diwa-tabs-bar>
    <div style="padding: 1rem; font-size: 0.875rem">{{ panels[activeTab] }}</div>
  </div>
</template>`,
};

const disabledTabsCode: FrameworkCode = {
  html: `<div>
  <diwa-tabs-bar id="bar" active-tab-index="0">
    <button>Overview</button>
    <button disabled>Reports</button>
    <button>Settings</button>
  </diwa-tabs-bar>
  <div id="panel" style="padding: 1rem; font-size: 0.875rem;">
    Overview: Core workspace information is available to all users.
  </div>
</div>
<script>
  const panels = [
    'Overview: Core workspace information is available to all users.',
    'Reports: This destination is currently unavailable because the user does not have reporting access.',
    'Settings: Administrators can review workspace rules, alerts, and defaults here.',
  ];
  const bar = document.querySelector('#bar');
  const panel = document.querySelector('#panel');
  bar.addEventListener('update', (e) => {
    panel.textContent = panels[e.detail.activeTabIndex];
  });
</script>`,
  react: `import React, { useEffect, useRef, useState } from 'react';

const panels = [
  'Overview: Core workspace information is available to all users.',
  'Reports: This destination is currently unavailable because the user does not have reporting access.',
  'Settings: Administrators can review workspace rules, alerts, and defaults here.',
];

export const TabsBarDisabledTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const handler = (e) => setActiveTab(e.detail.activeTabIndex);
    el.addEventListener('update', handler);
    return () => el.removeEventListener('update', handler);
  }, []);

  return (
    <div>
      <diwa-tabs-bar ref={barRef} active-tab-index={activeTab} class="block w-full">
        <button>Overview</button>
        <button disabled>Reports</button>
        <button>Settings</button>
      </diwa-tabs-bar>
      <div style={{ padding: '1rem', fontSize: '0.875rem' }}>
        {panels[activeTab]}
      </div>
    </div>
  );
};`,
  angular: `import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';

@Component({
  template: \
    <div>
      <diwa-tabs-bar #bar [attr.active-tab-index]="activeTab" class="block w-full">
        <button>Overview</button>
        <button disabled>Reports</button>
        <button>Settings</button>
      </diwa-tabs-bar>
      <div style="padding: 1rem; font-size: 0.875rem">{{ panels[activeTab] }}</div>
    </div>
  \,
})
export class TabsBarDisabledTabComponent implements OnInit, OnDestroy {
  @ViewChild('bar') barRef!: ElementRef;
  activeTab = 0;
  panels = [
    'Overview: Core workspace information is available to all users.',
    'Reports: This destination is currently unavailable because the user does not have reporting access.',
    'Settings: Administrators can review workspace rules, alerts, and defaults here.',
  ];

  ngOnInit() { this.barRef.nativeElement.addEventListener('update', this.onUpdate); }
  ngOnDestroy() { this.barRef.nativeElement.removeEventListener('update', this.onUpdate); }
  onUpdate = (e: CustomEvent) => { this.activeTab = e.detail.activeTabIndex; };
}`,
  vue: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeTab = ref(0);
const barEl = ref(null);
const panels = [
  'Overview: Core workspace information is available to all users.',
  'Reports: This destination is currently unavailable because the user does not have reporting access.',
  'Settings: Administrators can review workspace rules, alerts, and defaults here.',
];
const onUpdate = (e) => { activeTab.value = e.detail.activeTabIndex; };

onMounted(() => barEl.value?.addEventListener('update', onUpdate));
onUnmounted(() => barEl.value?.removeEventListener('update', onUpdate));
</script>

<template>
  <div>
    <diwa-tabs-bar ref="barEl" :active-tab-index="activeTab" class="block w-full">
      <button>Overview</button>
      <button disabled>Reports</button>
      <button>Settings</button>
    </diwa-tabs-bar>
    <div style="padding: 1rem; font-size: 0.875rem">{{ panels[activeTab] }}</div>
  </div>
</template>`,
};

function TabsBarPreview({
  tabs,
  panels,
  disabledIndices = [],
}: {
  tabs: readonly string[];
  panels: readonly string[];
  disabledIndices?: readonly number[];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      setActiveTab((e as CustomEvent<{ activeTabIndex: number }>).detail.activeTabIndex);
    };

    el.addEventListener('update', handler);
    return () => el.removeEventListener('update', handler);
  }, []);

  return (
    <div className="w-full max-w-3xl">
      <diwa-tabs-bar ref={barRef} active-tab-index={activeTab} className="block w-full">
        {tabs.map((tab, index) => (
          <button key={tab} disabled={disabledIndices.includes(index)}>
            {tab}
          </button>
        ))}
      </diwa-tabs-bar>
      <div className="rounded-b-lg border border-t-0 border-[var(--diwa-border)] bg-[var(--diwa-bg)] p-4 text-sm text-[var(--diwa-text-secondary)]">
        {panels[activeTab]}
      </div>
    </div>
  );
}

export default function TabsBarExamplesPage() {
  return (
    <div className="space-y-12">

      <div className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Basic tabs bar</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          A simple three-tab layout with a linked content panel for the active destination.
        </p>
        <Playground frameworkCode={basicWithPanelCode} previewClassName="w-full items-stretch">
          <TabsBarPreview tabs={basicTabs} panels={basicPanels} />
        </Playground>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Four tabs</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          A wider set shows how the bar handles more peer destinations while still keeping related content directly below.
        </p>
        <Playground frameworkCode={fourTabsCode} previewClassName="w-full items-stretch">
          <TabsBarPreview tabs={fourTabs} panels={fourPanels} />
        </Playground>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">With panel content</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Listen to the <Code>update</Code> event to switch panel content when the active tab changes.
        </p>
        <Playground frameworkCode={basicWithPanelCode} previewClassName="w-full items-stretch">
          <TabsBarPreview tabs={basicTabs} panels={basicPanels} />
        </Playground>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Disabled destination</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Disabled tabs remain visible in the information architecture but cannot be activated until the
          destination becomes available.
        </p>
        <Playground frameworkCode={disabledTabsCode} previewClassName="w-full items-stretch">
          <TabsBarPreview tabs={disabledTabs} panels={disabledPanels} disabledIndices={[1]} />
        </Playground>
      </div>

    </div>
  );
}
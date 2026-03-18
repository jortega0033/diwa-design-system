'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { Playground } from '@/components/playground/Playground';
import type { Story } from '@/models/story';
import type { FrameworkCode } from '@/models/framework';

const basicTabsStory: Story<'diwa-tabs'> = {
  generator: () => [
    {
      tag: 'diwa-tabs' as const,
      properties: { 'active-tab-index': 0, className: 'block w-full' },
      children: [
        { tag: 'diwa-tabs-item' as const, properties: { label: 'Overview' }, children: ['Overview content goes here.'] },
        { tag: 'diwa-tabs-item' as const, properties: { label: 'Details' }, children: ['Detailed information goes here.'] },
        { tag: 'diwa-tabs-item' as const, properties: { label: 'Settings' }, children: ['Settings content goes here.'] },
      ],
    },
  ],
};

const controlledTabsCode: FrameworkCode = {
  html: `<diwa-tabs id="tabs" active-tab-index="0">
  <diwa-tabs-item label="Profile">Manage your public profile information.</diwa-tabs-item>
  <diwa-tabs-item label="Security">Update your password and two-factor authentication settings.</diwa-tabs-item>
  <diwa-tabs-item label="Notifications">Configure which emails and push notifications you receive.</diwa-tabs-item>
</diwa-tabs>
<script>
  const el = document.querySelector('#tabs');
  el.addEventListener('update', (e) => {
    console.log('Active tab index:', e.detail.activeTabIndex);
  });
</script>`,
  react: `import React, { useRef, useEffect, useState } from 'react';

export const ControlledTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => setActiveTab(e.detail.activeTabIndex);
    el.addEventListener('update', handler);
    return () => el.removeEventListener('update', handler);
  }, []);

  return (
    <diwa-tabs ref={ref} active-tab-index={activeTab} class="block w-full">
      <diwa-tabs-item label="Profile">Manage your public profile information.</diwa-tabs-item>
      <diwa-tabs-item label="Security">Update your password and two-factor authentication settings.</diwa-tabs-item>
      <diwa-tabs-item label="Notifications">Configure which emails and push notifications you receive.</diwa-tabs-item>
    </diwa-tabs>
  );
};`,
  angular: `import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';

@Component({
  template: \`
    <diwa-tabs #tabs [attr.active-tab-index]="activeTab" class="block w-full">
      <diwa-tabs-item label="Profile">Manage your public profile information.</diwa-tabs-item>
      <diwa-tabs-item label="Security">Update your password and two-factor authentication settings.</diwa-tabs-item>
      <diwa-tabs-item label="Notifications">Configure which emails and push notifications you receive.</diwa-tabs-item>
    </diwa-tabs>
  \`,
})
export class ControlledTabsComponent implements OnInit, OnDestroy {
  @ViewChild('tabs') tabsRef!: ElementRef;
  activeTab = 0;

  ngOnInit() { this.tabsRef.nativeElement.addEventListener('update', this.onUpdate); }
  ngOnDestroy() { this.tabsRef.nativeElement.removeEventListener('update', this.onUpdate); }
  onUpdate = (e: CustomEvent) => { this.activeTab = e.detail.activeTabIndex; };
}`,
  vue: `<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeTab = ref(0);
const tabsEl = ref(null);
const onUpdate = (e) => { activeTab.value = e.detail.activeTabIndex; };

onMounted(() => tabsEl.value?.addEventListener('update', onUpdate));
onUnmounted(() => tabsEl.value?.removeEventListener('update', onUpdate));
</script>

<template>
  <diwa-tabs ref="tabsEl" :active-tab-index="activeTab" class="block w-full">
    <diwa-tabs-item label="Profile">Manage your public profile information.</diwa-tabs-item>
    <diwa-tabs-item label="Security">Update your password and two-factor authentication settings.</diwa-tabs-item>
    <diwa-tabs-item label="Notifications">Configure which emails and push notifications you receive.</diwa-tabs-item>
  </diwa-tabs>
</template>`,
};

export default function TabsExamplesPage() {
  const [profileTab, setProfileTab] = useState(0);
  const tabsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const handler = (e: Event) =>
      setProfileTab((e as CustomEvent<{ activeTabIndex: number }>).detail.activeTabIndex);
    el.addEventListener('update', handler);
    return () => el.removeEventListener('update', handler);
  }, []);

  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Basic tabs</h2>
        <ComponentStory story={basicTabsStory} previewClassName="!p-0 block" />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Controlled tabs</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Listen to the <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">update</code> event to keep external state in sync with the active tab.
        </p>
        <Playground frameworkCode={controlledTabsCode} previewClassName="!p-0 block">
          <diwa-tabs ref={tabsRef} active-tab-index={profileTab} className="block w-full">
            <diwa-tabs-item label="Profile">
              <p className="text-sm text-[var(--diwa-text-secondary)]">Manage your public profile information.</p>
            </diwa-tabs-item>
            <diwa-tabs-item label="Security">
              <p className="text-sm text-[var(--diwa-text-secondary)]">Update your password and two-factor authentication settings.</p>
            </diwa-tabs-item>
            <diwa-tabs-item label="Notifications">
              <p className="text-sm text-[var(--diwa-text-secondary)]">Configure which emails and push notifications you receive.</p>
            </diwa-tabs-item>
          </diwa-tabs>
        </Playground>
        <p className="text-xs text-[var(--diwa-text-muted)]">
          Active tab index: <strong>{profileTab}</strong>
        </p>
      </section>

    </div>
  );
}
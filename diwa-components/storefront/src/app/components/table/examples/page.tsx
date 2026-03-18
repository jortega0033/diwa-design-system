'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { Playground } from '@/components/playground/Playground';
import type { FrameworkCode } from '@/models/framework';
import { tableBasicStory, tableCompactStory, tableBorderedStory, tableStripedStory } from '../table.stories';

const TEAM = [
  { name: 'Alice Chen', role: 'Product Designer', dept: 'Design', status: 'Active', joined: '2022-03' },
  { name: 'Bob Kumar', role: 'Frontend Engineer', dept: 'Engineering', status: 'Away', joined: '2021-07' },
  { name: 'Carlos Silva', role: 'Backend Engineer', dept: 'Engineering', status: 'Active', joined: '2023-01' },
  { name: 'Diana Müller', role: 'QA Engineer', dept: 'Quality', status: 'Active', joined: '2022-11' },
];

type SortState = { id: string; active: boolean; direction: 'asc' | 'desc' };

const sortableTableCode: FrameworkCode = {
  html: `<diwa-table id="table" caption="Team members">
  <diwa-table-head>
    <diwa-table-row>
      <diwa-table-head-cell id="col-name">Name</diwa-table-head-cell>
      <diwa-table-head-cell>Role</diwa-table-head-cell>
      <diwa-table-head-cell>Department</diwa-table-head-cell>
      <diwa-table-head-cell>Status</diwa-table-head-cell>
      <diwa-table-head-cell id="col-joined">Joined</diwa-table-head-cell>
    </diwa-table-row>
  </diwa-table-head>
  <diwa-table-body id="tbody"></diwa-table-body>
</diwa-table>
<script>
  const DATA = [
    { name: 'Alice Chen', role: 'Product Designer', dept: 'Design', status: 'Active', joined: '2022-03' },
    { name: 'Bob Kumar', role: 'Frontend Engineer', dept: 'Engineering', status: 'Away', joined: '2021-07' },
    { name: 'Carlos Silva', role: 'Backend Engineer', dept: 'Engineering', status: 'Active', joined: '2023-01' },
    { name: 'Diana Müller', role: 'QA Engineer', dept: 'Quality', status: 'Active', joined: '2022-11' },
  ];
  const colName = document.querySelector('#col-name');
  const colJoined = document.querySelector('#col-joined');
  let sortId = null, sortDir = 'asc';

  function render() {
    const sorted = [...DATA].sort((a, b) => {
      if (!sortId) return 0;
      const key = sortId === 'name' ? 'name' : 'joined';
      return sortDir === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
    });
    document.querySelector('#tbody').innerHTML = sorted.map((m) =>
      \`<diwa-table-row>
        <diwa-table-cell>\${m.name}</diwa-table-cell>
        <diwa-table-cell>\${m.role}</diwa-table-cell>
        <diwa-table-cell>\${m.dept}</diwa-table-cell>
        <diwa-table-cell>\${m.status}</diwa-table-cell>
        <diwa-table-cell>\${m.joined}</diwa-table-cell>
      </diwa-table-row>\`
    ).join('');
    colName.sort = { id: 'name', active: sortId === 'name', direction: sortId === 'name' ? sortDir : 'asc' };
    colJoined.sort = { id: 'joined', active: sortId === 'joined', direction: sortId === 'joined' ? sortDir : 'asc' };
  }

  document.querySelector('#table').addEventListener('update', (e) => {
    sortId = e.detail.id;
    sortDir = e.detail.direction;
    render();
  });
  render();
</script>`,
  react: `import React, { useRef, useEffect, useState } from 'react';

const TEAM = [
  { name: 'Alice Chen', role: 'Product Designer', dept: 'Design', status: 'Active', joined: '2022-03' },
  { name: 'Bob Kumar', role: 'Frontend Engineer', dept: 'Engineering', status: 'Away', joined: '2021-07' },
  { name: 'Carlos Silva', role: 'Backend Engineer', dept: 'Engineering', status: 'Active', joined: '2023-01' },
  { name: 'Diana Müller', role: 'QA Engineer', dept: 'Quality', status: 'Active', joined: '2022-11' },
];

export const SortableTable = () => {
  const tableRef = useRef(null);
  const [nameSort, setNameSort] = useState({ id: 'name', active: false, direction: 'asc' });
  const [joinedSort, setJoinedSort] = useState({ id: 'joined', active: false, direction: 'asc' });

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;
    const handler = (e) => {
      const { id, direction } = e.detail;
      setNameSort({ id: 'name', active: id === 'name', direction: id === 'name' ? direction : 'asc' });
      setJoinedSort({ id: 'joined', active: id === 'joined', direction: id === 'joined' ? direction : 'asc' });
    };
    el.addEventListener('update', handler);
    return () => el.removeEventListener('update', handler);
  }, []);

  const activeSort = nameSort.active ? nameSort : joinedSort.active ? joinedSort : null;
  const sorted = [...TEAM].sort((a, b) => {
    if (!activeSort) return 0;
    const key = activeSort.id === 'name' ? 'name' : 'joined';
    return activeSort.direction === 'asc'
      ? a[key].localeCompare(b[key])
      : b[key].localeCompare(a[key]);
  });

  return (
    <diwa-table ref={tableRef} caption="Team members">
      <diwa-table-head>
        <diwa-table-row>
          <diwa-table-head-cell sort={nameSort}>Name</diwa-table-head-cell>
          <diwa-table-head-cell>Role</diwa-table-head-cell>
          <diwa-table-head-cell>Department</diwa-table-head-cell>
          <diwa-table-head-cell>Status</diwa-table-head-cell>
          <diwa-table-head-cell sort={joinedSort}>Joined</diwa-table-head-cell>
        </diwa-table-row>
      </diwa-table-head>
      <diwa-table-body>
        {sorted.map((m) => (
          <diwa-table-row key={m.name}>
            <diwa-table-cell>{m.name}</diwa-table-cell>
            <diwa-table-cell>{m.role}</diwa-table-cell>
            <diwa-table-cell>{m.dept}</diwa-table-cell>
            <diwa-table-cell>{m.status}</diwa-table-cell>
            <diwa-table-cell>{m.joined}</diwa-table-cell>
          </diwa-table-row>
        ))}
      </diwa-table-body>
    </diwa-table>
  );
};`,
  angular: `import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';

const TEAM = [
  { name: 'Alice Chen', role: 'Product Designer', dept: 'Design', status: 'Active', joined: '2022-03' },
  { name: 'Bob Kumar', role: 'Frontend Engineer', dept: 'Engineering', status: 'Away', joined: '2021-07' },
  { name: 'Carlos Silva', role: 'Backend Engineer', dept: 'Engineering', status: 'Active', joined: '2023-01' },
  { name: 'Diana Müller', role: 'QA Engineer', dept: 'Quality', status: 'Active', joined: '2022-11' },
];

@Component({
  template: \`
    <diwa-table #table caption="Team members">
      <diwa-table-head>
        <diwa-table-row>
          <diwa-table-head-cell [sort]="nameSort">Name</diwa-table-head-cell>
          <diwa-table-head-cell>Role</diwa-table-head-cell>
          <diwa-table-head-cell>Department</diwa-table-head-cell>
          <diwa-table-head-cell>Status</diwa-table-head-cell>
          <diwa-table-head-cell [sort]="joinedSort">Joined</diwa-table-head-cell>
        </diwa-table-row>
      </diwa-table-head>
      <diwa-table-body>
        <diwa-table-row *ngFor="let m of sorted">
          <diwa-table-cell>{{ m.name }}</diwa-table-cell>
          <diwa-table-cell>{{ m.role }}</diwa-table-cell>
          <diwa-table-cell>{{ m.dept }}</diwa-table-cell>
          <diwa-table-cell>{{ m.status }}</diwa-table-cell>
          <diwa-table-cell>{{ m.joined }}</diwa-table-cell>
        </diwa-table-row>
      </diwa-table-body>
    </diwa-table>
  \`,
})
export class SortableTableComponent implements OnInit, OnDestroy {
  @ViewChild('table') tableRef!: ElementRef;
  nameSort = { id: 'name', active: false, direction: 'asc' };
  joinedSort = { id: 'joined', active: false, direction: 'asc' };
  sorted = [...TEAM];

  private onUpdate = (e: CustomEvent) => {
    const { id, direction } = e.detail;
    this.nameSort = { id: 'name', active: id === 'name', direction: id === 'name' ? direction : 'asc' };
    this.joinedSort = { id: 'joined', active: id === 'joined', direction: id === 'joined' ? direction : 'asc' };
    const active = this.nameSort.active ? this.nameSort : this.joinedSort.active ? this.joinedSort : null;
    this.sorted = [...TEAM].sort((a, b) => {
      if (!active) return 0;
      const key = active.id === 'name' ? 'name' : 'joined';
      return active.direction === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
    });
  };

  ngOnInit() { this.tableRef.nativeElement.addEventListener('update', this.onUpdate); }
  ngOnDestroy() { this.tableRef.nativeElement.removeEventListener('update', this.onUpdate); }
}`,
  vue: `<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const TEAM = [
  { name: 'Alice Chen', role: 'Product Designer', dept: 'Design', status: 'Active', joined: '2022-03' },
  { name: 'Bob Kumar', role: 'Frontend Engineer', dept: 'Engineering', status: 'Away', joined: '2021-07' },
  { name: 'Carlos Silva', role: 'Backend Engineer', dept: 'Engineering', status: 'Active', joined: '2023-01' },
  { name: 'Diana Müller', role: 'QA Engineer', dept: 'Quality', status: 'Active', joined: '2022-11' },
];

const tableEl = ref(null);
const nameSort = ref({ id: 'name', active: false, direction: 'asc' });
const joinedSort = ref({ id: 'joined', active: false, direction: 'asc' });

const onUpdate = (e) => {
  const { id, direction } = e.detail;
  nameSort.value = { id: 'name', active: id === 'name', direction: id === 'name' ? direction : 'asc' };
  joinedSort.value = { id: 'joined', active: id === 'joined', direction: id === 'joined' ? direction : 'asc' };
};

const sorted = computed(() => {
  const active = nameSort.value.active ? nameSort.value : joinedSort.value.active ? joinedSort.value : null;
  return [...TEAM].sort((a, b) => {
    if (!active) return 0;
    const key = active.id === 'name' ? 'name' : 'joined';
    return active.direction === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
  });
});

onMounted(() => tableEl.value?.addEventListener('update', onUpdate));
onUnmounted(() => tableEl.value?.removeEventListener('update', onUpdate));
</script>

<template>
  <diwa-table ref="tableEl" caption="Team members">
    <diwa-table-head>
      <diwa-table-row>
        <diwa-table-head-cell :sort="nameSort">Name</diwa-table-head-cell>
        <diwa-table-head-cell>Role</diwa-table-head-cell>
        <diwa-table-head-cell>Department</diwa-table-head-cell>
        <diwa-table-head-cell>Status</diwa-table-head-cell>
        <diwa-table-head-cell :sort="joinedSort">Joined</diwa-table-head-cell>
      </diwa-table-row>
    </diwa-table-head>
    <diwa-table-body>
      <diwa-table-row v-for="m in sorted" :key="m.name">
        <diwa-table-cell>{{ m.name }}</diwa-table-cell>
        <diwa-table-cell>{{ m.role }}</diwa-table-cell>
        <diwa-table-cell>{{ m.dept }}</diwa-table-cell>
        <diwa-table-cell>{{ m.status }}</diwa-table-cell>
        <diwa-table-cell>{{ m.joined }}</diwa-table-cell>
      </diwa-table-row>
    </diwa-table-body>
  </diwa-table>
</template>`,
};

export default function TableExamplesPage() {
  const tableRef = useRef<HTMLElement>(null);
  const [nameSort, setNameSort] = useState<SortState>({ id: 'name', active: false, direction: 'asc' });
  const [joinedSort, setJoinedSort] = useState<SortState>({ id: 'joined', active: false, direction: 'asc' });

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;
    const handler = (e: Event) => {
      const { id, direction } = (e as CustomEvent<SortState>).detail;
      setNameSort({ id: 'name', active: id === 'name', direction: id === 'name' ? direction : 'asc' });
      setJoinedSort({ id: 'joined', active: id === 'joined', direction: id === 'joined' ? direction : 'asc' });
    };
    el.addEventListener('update', handler);
    return () => el.removeEventListener('update', handler);
  }, []);

  const activeSort = nameSort.active ? nameSort : joinedSort.active ? joinedSort : null;
  const sorted = [...TEAM].sort((a, b) => {
    if (!activeSort) return 0;
    const key = activeSort.id === 'name' ? 'name' : 'joined';
    return activeSort.direction === 'asc'
      ? a[key].localeCompare(b[key])
      : b[key].localeCompare(a[key]);
  });

  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Basic data table</h2>
        <ComponentStory story={tableBasicStory} previewClassName="w-full overflow-x-auto" />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Compact</h2>
        <ComponentStory story={tableCompactStory} previewClassName="w-full overflow-x-auto" />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Bordered</h2>
        <ComponentStory story={tableBorderedStory} previewClassName="w-full overflow-x-auto" />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Striped rows</h2>
        <ComponentStory story={tableStripedStory} previewClassName="w-full overflow-x-auto" />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Sortable columns</h2>
        <Playground frameworkCode={sortableTableCode} previewClassName="w-full overflow-x-auto">
          <diwa-table ref={tableRef} caption="Team members">
            <diwa-table-head>
              <diwa-table-row>
                <diwa-table-head-cell sort={nameSort}>Name</diwa-table-head-cell>
                <diwa-table-head-cell>Role</diwa-table-head-cell>
                <diwa-table-head-cell>Department</diwa-table-head-cell>
                <diwa-table-head-cell>Status</diwa-table-head-cell>
                <diwa-table-head-cell sort={joinedSort}>Joined</diwa-table-head-cell>
              </diwa-table-row>
            </diwa-table-head>
            <diwa-table-body>
              {sorted.map((m) => (
                <diwa-table-row key={m.name}>
                  <diwa-table-cell>{m.name}</diwa-table-cell>
                  <diwa-table-cell>{m.role}</diwa-table-cell>
                  <diwa-table-cell>{m.dept}</diwa-table-cell>
                  <diwa-table-cell>{m.status}</diwa-table-cell>
                  <diwa-table-cell>{m.joined}</diwa-table-cell>
                </diwa-table-row>
              ))}
            </diwa-table-body>
          </diwa-table>
        </Playground>
      </section>

    </div>
  );
}

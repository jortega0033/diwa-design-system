'use client';

import React, { useRef } from 'react';
import { Playground } from '@/components/playground/Playground';
import type { FrameworkCode } from '@/models/framework';

// ── Framework code snippets ───────────────────────────────────────────────────

const statesCode: FrameworkCode = {
  html: `<diwa-toast id="toast"></diwa-toast>

<script>
  const toast = document.getElementById('toast');
  // state: 'neutral' | 'success' | 'error' | 'warning' | 'info'
  toast.addMessage({ text: 'Changes saved.', state: 'success' });
</script>`,
  react: `import { useRef } from 'react';

function App() {
  const toastRef = useRef(null);

  const notify = (text, state) =>
    toastRef.current?.addMessage({ text, state });

  return (
    <>
      <diwa-toast ref={toastRef} />
      <button onClick={() => notify('Changes saved.', 'success')}>Success</button>
      <button onClick={() => notify('Something went wrong.', 'error')}>Error</button>
    </>
  );
}`,
  angular: `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DiwaToast, ToastManager } from '@diwacopilot/components-angular';

// Add <diwa-toast> once in your app shell (e.g. app.component.html)
// then inject ToastManager wherever you need it.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DiwaToast],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <diwa-toast></diwa-toast>
    <button (click)="notify('Changes saved.', 'success')">Success</button>
    <button (click)="notify('Something went wrong.', 'error')">Error</button>
  \`,
})
export class AppComponent {
  constructor(private toastManager: ToastManager) {}

  notify(text: string, state: string) {
    this.toastManager.addMessage({ text, state });
  }
}`,
  vue: `<template>
  <diwa-toast ref="toast" />
  <button @click="notify('Changes saved.', 'success')">Success</button>
  <button @click="notify('Something went wrong.', 'error')">Error</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const toast = ref<HTMLElement | null>(null);
const notify = (text: string, state: string) =>
  (toast.value as any)?.addMessage({ text, state });
</script>`,
};

const durationCode: FrameworkCode = {
  html: `<script>
  // 2-second auto-dismiss
  toast.addMessage({ text: 'Disappears in 2 s.', state: 'info', duration: 2000 });

  // Persistent — user must dismiss manually
  toast.addMessage({ text: 'Stays until closed.', state: 'warning', duration: 0 });
</script>`,
  react: `// Pass duration (ms) to addMessage — default is 5000.
// duration: 0 keeps the toast open until the user dismisses it.
toastRef.current?.addMessage({ text: 'Disappears in 2 s.', state: 'info', duration: 2000 });
toastRef.current?.addMessage({ text: 'Stays until closed.', state: 'warning', duration: 0 });`,
  angular: `this.toastManager.addMessage({ text: 'Disappears in 2 s.', state: 'info', duration: 2000 });
this.toastManager.addMessage({ text: 'Stays until closed.', state: 'warning', duration: 0 });`,
  vue: `toast.value?.addMessage({ text: 'Disappears in 2 s.', state: 'info', duration: 2000 });
toast.value?.addMessage({ text: 'Stays until closed.', state: 'warning', duration: 0 });`,
};

const multipleCode: FrameworkCode = {
  html: `<script>
  // Stagger calls to produce a stack of independent toasts
  toast.addMessage({ text: 'First message.', state: 'neutral' });
  setTimeout(() => toast.addMessage({ text: 'Second message.', state: 'success' }), 300);
  setTimeout(() => toast.addMessage({ text: 'Third message.', state: 'info' }), 600);
</script>`,
  react: `// Each addMessage call produces an independent, dismissible toast
notify('First message.', 'neutral');
setTimeout(() => notify('Second message.', 'success'), 300);
setTimeout(() => notify('Third message.', 'info'), 600);`,
  angular: `this.toastManager.addMessage({ text: 'First message.', state: 'neutral' });
setTimeout(() => this.toastManager.addMessage({ text: 'Second.', state: 'success' }), 300);
setTimeout(() => this.toastManager.addMessage({ text: 'Third.', state: 'info' }), 600);`,
  vue: `toast.value?.addMessage({ text: 'First message.', state: 'neutral' });
setTimeout(() => toast.value?.addMessage({ text: 'Second.', state: 'success' }), 300);
setTimeout(() => toast.value?.addMessage({ text: 'Third.', state: 'info' }), 600);`,
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ToastExamplesPage() {
  const toastRef = useRef<HTMLElement | null>(null);

  const showToast = (text: string, state: string, duration?: number) => {
    if (toastRef.current) {
      (toastRef.current as any).addMessage({ text, state, duration });
    }
  };

  return (
    <div className="space-y-12">

      <diwa-toast ref={toastRef} />

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">States</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Toast supports five semantic states. Each state uses a distinct colour and icon.
        </p>
        <Playground frameworkCode={statesCode}>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="px-3 py-2 rounded text-sm font-medium bg-[var(--diwa-bg-elevated)] text-[var(--diwa-text-primary)] border border-[var(--diwa-border)] hover:opacity-80 transition-opacity"
              onClick={() => showToast('This is a neutral message.', 'neutral')}
            >
              Neutral
            </button>
            <button
              className="px-3 py-2 rounded text-sm font-medium bg-[var(--diwa-notification-success-soft)] text-[var(--diwa-notification-success)] border border-[var(--diwa-notification-success)] hover:opacity-80 transition-opacity"
              onClick={() => showToast('Changes saved successfully.', 'success')}
            >
              Success
            </button>
            <button
              className="px-3 py-2 rounded text-sm font-medium bg-[var(--diwa-notification-error-soft)] text-[var(--diwa-notification-error)] border border-[var(--diwa-notification-error)] hover:opacity-80 transition-opacity"
              onClick={() => showToast('Something went wrong. Please try again.', 'error')}
            >
              Error
            </button>
            <button
              className="px-3 py-2 rounded text-sm font-medium bg-[var(--diwa-notification-warning-soft)] text-[var(--diwa-notification-warning)] border border-[var(--diwa-notification-warning)] hover:opacity-80 transition-opacity"
              onClick={() => showToast('Your session is about to expire.', 'warning')}
            >
              Warning
            </button>
            <button
              className="px-3 py-2 rounded text-sm font-medium bg-[var(--diwa-notification-info-soft)] text-[var(--diwa-notification-info)] border border-[var(--diwa-notification-info)] hover:opacity-80 transition-opacity"
              onClick={() => showToast('New update available.', 'info')}
            >
              Info
            </button>
          </div>
        </Playground>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Custom duration</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          The default duration is 5 000 ms. Set{' '}
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-elevated)] border border-[var(--diwa-border)] text-xs font-mono">
            duration
          </code>{' '}
          to control how long the toast stays visible. A value of{' '}
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-elevated)] border border-[var(--diwa-border)] text-xs font-mono">
            0
          </code>{' '}
          disables auto-dismiss — the user must close manually.
        </p>
        <Playground frameworkCode={durationCode}>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="px-3 py-2 rounded text-sm font-medium bg-[var(--diwa-bg-elevated)] text-[var(--diwa-text-primary)] border border-[var(--diwa-border)] hover:opacity-80 transition-opacity"
              onClick={() => showToast('Disappears in 2 seconds.', 'info', 2000)}
            >
              2 s duration
            </button>
            <button
              className="px-3 py-2 rounded text-sm font-medium bg-[var(--diwa-bg-elevated)] text-[var(--diwa-text-primary)] border border-[var(--diwa-border)] hover:opacity-80 transition-opacity"
              onClick={() => showToast('This toast stays until dismissed.', 'warning', 0)}
            >
              Persistent (duration: 0)
            </button>
          </div>
        </Playground>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Multiple messages</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Multiple toasts stack vertically. Each can be dismissed independently.
        </p>
        <Playground frameworkCode={multipleCode}>
          <button
            className="px-3 py-2 rounded text-sm font-medium bg-[var(--diwa-bg-elevated)] text-[var(--diwa-text-primary)] border border-[var(--diwa-border)] hover:opacity-80 transition-opacity"
            onClick={() => {
              showToast('First message.', 'neutral');
              setTimeout(() => showToast('Second message.', 'success'), 300);
              setTimeout(() => showToast('Third message.', 'info'), 600);
            }}
          >
            Show 3 toasts
          </button>
        </Playground>
      </section>

    </div>
  );
}

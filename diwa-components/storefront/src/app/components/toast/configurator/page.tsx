'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Playground } from '@/components/playground/Playground';
import { ConfiguratorControls } from '@/components/playground/ConfiguratorControls';
import { generateHtmlMarkup } from '@/utils/generator/generateHtmlMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
import { toastStory, toastPropDefinitions } from '../toast.stories';
import type { StoryState } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

export default function ToastConfiguratorPage() {
  const toastRef = useRef<HTMLElement | null>(null);
  const [storyState, setStoryState] = useState<StoryState<HTMLTagOrComponent>>(
    toastStory.state ?? {},
  );

  const theme = (storyState.properties?.theme as string) ?? 'dark';

  const generated = toastStory.generator(storyState);
  const frameworkCode = {
    html: generateHtmlMarkup(generated),
    react: generateReactMarkup(generated),
    // Angular uses the ToastManager service — auto-generated markup omits the
    // imperative addMessage() call, so we provide a hand-written snippet instead.
    angular: `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DiwaToast, ToastManager } from '@diwacopilot/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DiwaToast],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <diwa-toast${theme !== 'dark' ? ` theme="${theme}"` : ''}></diwa-toast>
    <button (click)="addToast()">Queue Toast</button>
  \`,
})
export class AppComponent {
  private counter = 1;

  constructor(private toastManager: ToastManager) {}

  addToast() {
    this.toastManager.addMessage({ text: \`Message \${this.counter++}\`, state: 'success' });
  }
}`,
    vue: generateVueMarkup(generated),
  };

  const trigger = useCallback((text: string, state: string) => {
    if (toastRef.current) {
      (toastRef.current as any).addMessage({ text, state, duration: 4000 });
    }
  }, []);

  return (
    <div>
      <Playground frameworkCode={frameworkCode}>
        <div className="flex flex-col items-center gap-4 w-full">
          {/* The toast container is positioned fixed — rendered here so the ref is wired */}
          {/* suppressHydrationWarning: Stencil adds role/aria-live/data-theme/class="hydrated"
              client-side after its lifecycle runs, causing a benign SSR↔client mismatch. */}
          <diwa-toast ref={toastRef} theme={theme} suppressHydrationWarning />

          <p className="text-xs text-[var(--diwa-text-secondary)] mb-1">
            Click a button to trigger a toast message
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Neutral', state: 'neutral', text: 'This is a neutral message.' },
              { label: 'Success', state: 'success', text: 'Changes saved successfully.' },
              { label: 'Error', state: 'error', text: 'Something went wrong. Please try again.' },
              { label: 'Warning', state: 'warning', text: 'Your session will expire soon.' },
              { label: 'Info', state: 'info', text: 'A new version is available.' },
            ].map(({ label, state, text }) => (
              <button
                key={state}
                type="button"
                onClick={() => trigger(text, state)}
                className="px-4 py-2 min-h-[var(--diwa-button-height)] rounded text-xs font-medium bg-[var(--diwa-bg-elevated)] text-[var(--diwa-text-primary)] border border-[var(--diwa-border)] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--diwa-border-focus)]"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Playground>
      <ConfiguratorControls
        propDefinitions={toastPropDefinitions}
        storyState={storyState}
        setStoryState={setStoryState}
      />
    </div>
  );
}

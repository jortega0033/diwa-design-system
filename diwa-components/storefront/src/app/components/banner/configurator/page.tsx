'use client';

import React, { useEffect, useRef, useState, type FormEvent } from 'react';
import { Playground } from '@/components/playground/Playground';
import { ConfiguratorControls } from '@/components/playground/ConfiguratorControls';
import { generateHtmlMarkup } from '@/utils/generator/generateHtmlMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
import { bannerStory, bannerPropDefinitions } from '../banner.stories';
import type { StoryState } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

export default function BannerConfiguratorPage() {
  const bannerRef = useRef<HTMLElement | null>(null);
  const [storyState, setStoryState] = useState<StoryState<HTMLTagOrComponent>>(bannerStory.state ?? {});

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;

    const onDismiss = () => {
      setStoryState((prev) => ({
        ...prev,
        properties: {
          ...(prev.properties ?? {}),
          open: false,
        },
      }));
    };

    el.addEventListener('dismiss', onDismiss as EventListener);
    return () => el.removeEventListener('dismiss', onDismiss as EventListener);
  }, []);

  const generated = bannerStory.generator(storyState);
  const frameworkCode = {
    html: generateHtmlMarkup(generated),
    react: generateReactMarkup(generated),
    angular: `// Render a closed banner first\n<diwa-banner #banner [open]=\"false\" state=\"info\" heading=\"Some heading\" description=\"Some description.\"></diwa-banner>\n\n<button (click)=\"banner.open = true\">Open Banner</button>`,
    vue: generateVueMarkup(generated),
  };

  const props = (storyState.properties ?? {}) as Record<string, unknown>;
  const isOpen = Boolean(props.open);

  return (
    <div>
      <Playground frameworkCode={frameworkCode}>
        <div className="flex flex-col items-center gap-4 w-full">
          <diwa-button-pure
            icon={isOpen ? 'x' : 'chevron-right'}
            color="secondary"
            onClick={() => {
              setStoryState((prev) => ({
                ...prev,
                properties: {
                  ...(prev.properties ?? {}),
                  open: !Boolean((prev.properties ?? {}).open),
                },
              }));
            }}
          >
            {isOpen ? 'Hide Banner' : 'Open Banner'}
          </diwa-button-pure>

          <diwa-banner
            ref={(el: HTMLElement | null) => {
              bannerRef.current = el;
            }}
            open={isOpen}
            state={(props.state as string) ?? 'info'}
            heading={(props.heading as string) ?? 'Some heading'}
            description={(props.description as string) ?? 'Some description.'}
            persistent={Boolean(props.persistent)}
            duration={Number(props.duration ?? 6000)}
            dismissButton={Boolean(props.dismissButton ?? true)}
            actionLabel={((props.actionLabel as string) || undefined)}
            actionLoading={Boolean(props.actionLoading)}
            theme={(props.theme as string) ?? 'dark'}
            style={{ '--diwa-banner-position-top': '90px' } as React.CSSProperties}
          />
        </div>
      </Playground>

      <ConfiguratorControls
        propDefinitions={bannerPropDefinitions}
        storyState={storyState}
        setStoryState={setStoryState}
      />
    </div>
  );
}

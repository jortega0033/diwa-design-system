'use client';

import React, { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Playground } from './Playground';
import { createElements } from '@/utils/generator/generator';
import { generateHtmlMarkup } from '@/utils/generator/generateHtmlMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateAngularMarkup } from '@/utils/generator/generateAngularMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';
import type { Story, StoryState } from '@/models/story';
import type { FrameworkCode } from '@/models/framework';

type ComponentStoryProps = {
  story: Story<HTMLTagOrComponent>;
  previewClassName?: string;
};

/**
 * ComponentStory — stateless (or minimally stateful) example display.
 * Used on Examples pages for static variants where props aren't user-controlled.
 *
 * Mirrors PDS packages/storefront/src/components/playground/ComponentStory.tsx.
 */
export function ComponentStory({ story, previewClassName }: ComponentStoryProps) {
  const [exampleState, setExampleState] = useState<StoryState<HTMLTagOrComponent>>(
    story.state ?? {},
  );
  const [exampleElement, setExampleElement] = useState<ReactNode>(
    createElements(story.generator(story.state), setExampleState),
  );

  // Framework code is memoized — only re-computed if the story itself changes.
  const frameworkCode = useMemo<FrameworkCode>(() => {
    const g = story.generator(story.state ?? {});
    return {
      html: generateHtmlMarkup(g),
      react: generateReactMarkup(g),
      angular: generateAngularMarkup(g),
      vue: generateVueMarkup(g),
    };
  }, [story]);

  useEffect(() => {
    const generated = story.generator(exampleState);
    setExampleElement(createElements(generated, setExampleState));
  }, [exampleState, story]);

  return <Playground frameworkCode={frameworkCode} previewClassName={previewClassName}>{exampleElement}</Playground>;
}

'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  linkPureStorySizes,
  linkPureStoryAlignLabel,
  linkPureStoryUnderline,
  linkPureStoryActive,
  linkPureStoryIconOnly,
} from '../link-pure.stories';

export default function LinkPureExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4">Sizes</h2>
        <ComponentStory story={linkPureStorySizes} previewClassName="gap-4" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Align label</h2>
        <ComponentStory story={linkPureStoryAlignLabel} previewClassName="gap-4" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Underline</h2>
        <ComponentStory story={linkPureStoryUnderline} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Active state</h2>
        <ComponentStory story={linkPureStoryActive} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Icon only</h2>
        <ComponentStory story={linkPureStoryIconOnly} />
      </section>
    </div>
  );
}

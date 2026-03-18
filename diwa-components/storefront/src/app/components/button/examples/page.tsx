'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  buttonStoryPrimary,
  buttonStorySecondary,
  buttonStoryGhost,
  buttonStoryDanger,
  buttonStoryLoading,
  buttonStorySizes,
} from '../button.stories';

export default function ButtonExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4">Variants</h2>
        <div className="space-y-4">
          <ComponentStory story={buttonStoryPrimary} />
          <ComponentStory story={buttonStorySecondary} />
          <ComponentStory story={buttonStoryGhost} />
          <ComponentStory story={buttonStoryDanger} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Loading state</h2>
        <ComponentStory story={buttonStoryLoading} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Sizes</h2>
        <ComponentStory story={buttonStorySizes} previewClassName="gap-4" />
      </section>
    </div>
  );
}

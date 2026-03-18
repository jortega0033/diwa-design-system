'use client';

import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  linkStoryPrimary,
  linkStorySecondary,
  linkStoryGhost,
  linkStoryDanger,
  linkStoryDisabled,
  linkStoryWithIcon,
  linkStoryCompact,
} from '../link.stories';

export default function LinkExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4">Variants</h2>
        <div className="space-y-4">
          <ComponentStory story={linkStoryPrimary} />
          <ComponentStory story={linkStorySecondary} />
          <ComponentStory story={linkStoryGhost} />
          <ComponentStory story={linkStoryDanger} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">With icon</h2>
        <ComponentStory story={linkStoryWithIcon} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Compact</h2>
        <ComponentStory story={linkStoryCompact} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Disabled</h2>
        <ComponentStory story={linkStoryDisabled} />
      </section>
    </div>
  );
}
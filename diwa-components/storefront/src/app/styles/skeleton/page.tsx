import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList, DoCard, DontCard } from '@/components/docs';

/* Shimmer keyframe + theme-specific skeletons injected once globally */
const SKELETON_STYLES = `
  @keyframes diwa-skeleton-pulse {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  /* Light skeleton */
  .diwa-skeleton-light {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.04) 25%,
      rgba(0, 0, 0, 0.10) 50%,
      rgba(0, 0, 0, 0.04) 75%
    );
    background-size: 200% 100%;
    animation: diwa-skeleton-pulse 2s ease-in-out infinite;
    border-radius: 4px;
  }

  /* Dark skeleton */
  .diwa-skeleton-dark {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04) 25%,
      rgba(255, 255, 255, 0.12) 50%,
      rgba(255, 255, 255, 0.04) 75%
    );
    background-size: 200% 100%;
    animation: diwa-skeleton-pulse 2s ease-in-out infinite;
    border-radius: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    .diwa-skeleton-light,
    .diwa-skeleton-dark {
      animation: none !important;
    }
  }
`;

export default function StylesSkeletonPage() {
  return (
    <div className="max-w-3xl">
      <style>{SKELETON_STYLES}</style>

      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-3">Skeleton</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-2xl">
        Skeleton screens replace content with animated placeholder shapes during loading. They
        reduce perceived wait time and prevent layout shift. Use the{' '}
        <code className="font-mono text-[var(--diwa-accent)]">getSkeletonStyle()</code> utility
        to generate theme-aware skeleton styles, or apply the CSS class directly.
      </p>

      {/* ── Example ─────────────────────────────────────────────────────────── */}
      <Section title="Example">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-5 leading-relaxed">
          Skeleton placeholders in both light and dark themes. The shimmer runs at 2 s to feel
          natural — not rushed.
        </p>

        <div className="space-y-4">
          {/* Light */}
          <div className="p-6 rounded-xl bg-white border border-[var(--diwa-border)]">
            <p className="text-xs font-semibold text-[var(--diwa-text-muted)] uppercase tracking-wider mb-5">
              Skeleton Light
            </p>
            {/* Box placeholder */}
            <div className="diwa-skeleton-light rounded-lg w-full mb-5" style={{ height: 160 }} />
            {/* Text placeholders */}
            <div className="space-y-2.5">
              <div className="diwa-skeleton-light" style={{ height: 14, width: '55%' }} />
              <div className="diwa-skeleton-light" style={{ height: 14, width: '85%' }} />
              <div className="diwa-skeleton-light" style={{ height: 14, width: '40%' }} />
            </div>
          </div>

          {/* Dark */}
          <div
            className="p-6 rounded-xl"
            style={{ background: '#1a1a1a' }}
          >
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-5">
              Skeleton Dark
            </p>
            {/* Box placeholder */}
            <div className="diwa-skeleton-dark rounded-lg w-full mb-5" style={{ height: 160 }} />
            {/* Text placeholders */}
            <div className="space-y-2.5">
              <div className="diwa-skeleton-dark" style={{ height: 14, width: '55%' }} />
              <div className="diwa-skeleton-dark" style={{ height: 14, width: '85%' }} />
              <div className="diwa-skeleton-dark" style={{ height: 14, width: '40%' }} />
            </div>
          </div>
        </div>
      </Section>

      {/* ── Usage ───────────────────────────────────────────────────────────── */}
      <Section title="Usage">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-5 leading-relaxed">
          Skeleton styles can illustrate the loading state of complex elements such as cards,
          lists, or entire page sections.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <DoCard><DoList
            items={[
              'Match the skeleton shape closely to the real content — use a box for images, short lines for headings, and longer lines for body text.',
              'Apply aria-busy="true" and a descriptive aria-label to the skeleton container so screen readers announce the loading state.',
              'Remove skeleton nodes entirely and replace them with real content once loading is complete.',
              'Respect reduced-motion: disable the shimmer animation when prefers-reduced-motion: reduce is set.',
            ]}
          /></DoCard>
          <DontCard><DontList
            items={[
              "Don't use skeleton screens for operations faster than 300 ms — a brief delay feels like a flash, not a loading state.",
              "Don't leave skeletons visible indefinitely — always show an error or empty state if loading fails.",
              "Don't animate multiple skeletons at different speeds; stagger delays (0.1 s increments) but keep the duration consistent at 2 s.",
              "Don't use skeletons for simple single-value fields — a spinner or inline placeholder is more appropriate.",
            ]}
          /></DontCard>
        </div>

        {/* Hint */}
        <div className="flex gap-3 p-4 rounded-lg bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
          <span className="text-base shrink-0 mt-0.5">ℹ</span>
          <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
            <strong className="text-[var(--diwa-text-primary)]">Animation speed: </strong>
            The shimmer runs at <strong>2 s</strong> — matching Diwa guidance.
            Faster animations (under 1.5 s) feel jittery and anxious; slower ones (over 2.5 s) feel
            stalled. Do not override <code className="font-mono text-[var(--diwa-accent)]">animation-duration</code> on
            individual skeletons.
          </p>
        </div>
      </Section>

      {/* ── Styles ──────────────────────────────────────────────────────────── */}
      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Use the JS utility for CSS-in-JS or inline styles. Use the CSS class directly for
          stylesheet-based projects. Always include the reduced-motion reset.
        </p>
        <CodeSnippet code={`// JS
import { getSkeletonStyle } from '@diwa/components/styles';

// Returns a CSS-in-JS object with the shimmer gradient + animation
const lightSkeleton = getSkeletonStyle({ theme: 'light' });
const darkSkeleton  = getSkeletonStyle({ theme: 'dark' });

// Usage in React
<div style={{ ...lightSkeleton, height: '160px', borderRadius: '8px' }} />
<div style={{ ...lightSkeleton, height: '14px', width: '60%' }} />

/* ─── CSS ─────────────────────────────────────────────────────────────── */
@keyframes diwa-skeleton-pulse {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}

/* Light theme */
.skeleton--light {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.04) 25%,
    rgba(0, 0, 0, 0.10) 50%,
    rgba(0, 0, 0, 0.04) 75%
  );
  background-size: 200% 100%;
  animation: diwa-skeleton-pulse 2s ease-in-out infinite;
  border-radius: 4px;
}

/* Dark theme */
.skeleton--dark {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 25%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.04) 75%
  );
  background-size: 200% 100%;
  animation: diwa-skeleton-pulse 2s ease-in-out infinite;
  border-radius: 4px;
}

/* Stagger delay for multiple lines */
.skeleton:nth-child(2) { animation-delay: 0.1s; }
.skeleton:nth-child(3) { animation-delay: 0.2s; }

/* Accessibility — reduced motion */
@media (prefers-reduced-motion: reduce) {
  .skeleton--light,
  .skeleton--dark {
    animation: none;
    background: rgba(0, 0, 0, 0.06);
  }
}

/* Accessibility — ARIA */
<div aria-busy="true" aria-label="Loading content">
  <div class="skeleton--light" style="height:14px; width:60%" />
  <div class="skeleton--light" style="height:14px; width:85%" />
</div>`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwa/components/styles' as *;

@keyframes diwa-skeleton-pulse {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 25%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.04) 75%
  );
  background-size: 200% 100%;
  animation: diwa-skeleton-pulse 2s ease-in-out infinite;
  border-radius: $diwa-border-radius-sm;
}

@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; }
}`,
          },
          {
            label: 'React',
            code: `import { getSkeletonStyle } from '@diwa/components/styles';

const skeletonStyle = getSkeletonStyle({ theme: 'dark' });

function SkeletonCard() {
  return (
    <div aria-busy="true" aria-label="Loading content">
      <div style={{ ...skeletonStyle, height: '160px', borderRadius: '8px' }} />
      <div style={{ ...skeletonStyle, height: '14px', width: '60%', marginTop: '12px' }} />
      <div style={{ ...skeletonStyle, height: '14px', width: '85%', marginTop: '8px' }} />
    </div>
  );
}`,
          },
        ]} />
      </Section>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet } from '@/components/docs';

const DEMO_STYLES = `
  /* ── keyframes ───────────────────────────────────────────────────────── */
  @keyframes diwa-moving {
    0%   { transform: translateX(-60px); }
    100% { transform: translateX(60px); }
  }
  @keyframes diwa-enter-exit {
    0%   { opacity: 1;  transform: translateY(0);   }
    40%  { opacity: 0;  transform: translateY(40%); }
    60%  { opacity: 0;  transform: translateY(40%); }
    100% { opacity: 1;  transform: translateY(0);   }
  }
  @keyframes diwa-show-hide {
    0%   { opacity: 1; }
    40%  { opacity: 0; }
    60%  { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes diwa-expand {
    0%   { height: 56px; }
    100% { height: 112px; }
  }

  /* ── demo tiles ──────────────────────────────────────────────────────── */
  .motion-tile {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    border-radius: var(--diwa-border-radius-md);
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    background: rgba(255,255,255,0.18);
    border: 1px solid rgba(255,255,255,0.25);
    height: 56px;
    cursor: default;
    user-select: none;
  }
  .motion-tile--moving {
    animation: diwa-moving var(--diwa-motion-duration-short, 0.15s)
               var(--diwa-motion-easing-base, cubic-bezier(0.4,0,0.2,1))
               1.6s infinite alternate;
  }
  .motion-tile--enter-exit {
    animation: diwa-enter-exit var(--diwa-motion-duration-moderate, 0.25s)
               var(--diwa-motion-easing-in, cubic-bezier(0.4,0,1,1))
               2s infinite;
    animation-fill-mode: both;
  }
  .motion-tile--show-hide {
    animation: diwa-show-hide var(--diwa-motion-duration-long, 0.4s)
               var(--diwa-motion-easing-base, cubic-bezier(0.4,0,0.2,1))
               2.4s infinite;
  }
  .motion-tile--expand {
    animation: diwa-expand var(--diwa-motion-duration-short, 0.15s)
               var(--diwa-motion-easing-in, cubic-bezier(0.4,0,1,1))
               2s infinite alternate;
    height: 56px;
    overflow: hidden;
  }
  .motion-tile--expand.active {
    animation: diwa-expand var(--diwa-motion-duration-moderate, 0.25s)
               var(--diwa-motion-easing-base, cubic-bezier(0.4,0,0.2,1))
               2s infinite alternate;
  }

  /* ── paused state ────────────────────────────────────────────────────── */
  .motion-tile.paused { animation-play-state: paused !important; }

  /* ── respect reduced motion ──────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .motion-tile { animation: none !important; }
  }
`;

const DURATION_TOKENS = [
  { token: '--diwa-motion-duration-short',     value: '0.15s', use: 'Micro: icon swap, focus ring appearance' },
  { token: '--diwa-motion-duration-moderate',  value: '0.25s', use: 'Standard: fade, slide, scale'            },
  { token: '--diwa-motion-duration-long',      value: '0.4s',  use: 'Complex: accordion expand, drawer open'  },
  { token: '--diwa-motion-duration-very-long', value: '0.7s',  use: 'Page-level: route transition, wizard'    },
];

const EASING_TOKENS = [
  { token: '--diwa-motion-easing-base', value: 'cubic-bezier(0.4, 0, 0.2, 1)', use: 'Standard enter/exit — ease-in-out' },
  { token: '--diwa-motion-easing-in',   value: 'cubic-bezier(0.4, 0, 1, 1)',   use: 'Element leaves screen — accelerate' },
  { token: '--diwa-motion-easing-out',  value: 'cubic-bezier(0, 0, 0.2, 1)',   use: 'Element enters screen — decelerate' },
];

const TRANSITION_SHORTHANDS = [
  { token: '--diwa-transition-fast',   value: '0.1s ease',  use: 'Instant micro feedback' },
  { token: '--diwa-transition-base',   value: '0.15s ease', use: 'Default component transitions' },
  { token: '--diwa-transition-slow',   value: '0.25s ease', use: 'Slower emphasis animations' },
  { token: '--diwa-transition-colors', value: 'color 0.15s, bg 0.15s, border 0.15s', use: 'Theme/state colour transitions' },
];

export default function StylesMotionPage() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="max-w-3xl">
      <style>{DEMO_STYLES}</style>

      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-3">Motion</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-2xl">
        Diwa motion tokens encode duration and easing so animations feel consistent and
        purposeful across the system. When objects move within a limited area, shorter durations
        are used; larger distances require more time. A global reduced-motion reset ensures
        animations are disabled for users who prefer it.
      </p>

      {/* ── Duration ────────────────────────────────────────────────────────── */}
      <Section title="Duration">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-5 leading-relaxed">
          The duration of an animation directly affects perceived lag. Motion should be swift,
          subtle and purposeful — choose the shortest duration that still feels natural.
        </p>
        <div className="space-y-3 mb-6">
          {DURATION_TOKENS.map((row) => {
            const pct = (parseFloat(row.value) / 0.7) * 100;
            return (
              <div key={row.token} className="flex items-center gap-4">
                <code className="text-xs font-mono text-[var(--diwa-accent)] shrink-0 w-52">{row.token}</code>
                <div className="flex-1 h-2 rounded-full bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--diwa-accent)]"
                    style={{ width: `${pct}%`, opacity: 0.75 }}
                  />
                </div>
                <span className="text-xs font-mono text-[var(--diwa-text-secondary)] shrink-0 w-12">{row.value}</span>
              </div>
            );
          })}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Value</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Use</th>
              </tr>
            </thead>
            <tbody>
              {DURATION_TOKENS.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)]">{row.value}</td>
                  <td className="py-2.5 text-xs text-[var(--diwa-text-secondary)]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Easing ──────────────────────────────────────────────────────────── */}
      <Section title="Easing">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-5 leading-relaxed">
          Easing curves are the key for turning components from static to interactive.
          Use <code className="font-mono text-[var(--diwa-accent)]">easing-out</code> when an
          element enters the screen (decelerates into position) and{' '}
          <code className="font-mono text-[var(--diwa-accent)]">easing-in</code> when it exits
          (accelerates away). Use <code className="font-mono text-[var(--diwa-accent)]">easing-base</code> for
          anything that stays on screen.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Curve</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Use</th>
              </tr>
            </thead>
            <tbody>
              {EASING_TOKENS.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)] whitespace-nowrap">{row.token}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)] whitespace-nowrap">{row.value}</td>
                  <td className="py-2.5 text-xs text-[var(--diwa-text-secondary)]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Examples ────────────────────────────────────────────────────────── */}
      <Section title="Examples">
        <div className="flex items-start justify-between gap-4 mb-6">
          <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
            Live demonstrations of each motion pattern using the Diwa tokens. They are suppressed
            when{' '}
            <code className="font-mono text-[var(--diwa-accent)]">prefers-reduced-motion: reduce</code> is active.
          </p>
          <button
            onClick={() => setPlaying(p => !p)}
            className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] text-[var(--diwa-text-primary)] hover:border-[var(--diwa-accent)] transition-colors"
            aria-label={playing ? 'Pause animations' : 'Play animations'}
          >
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                <rect x="1" y="1" width="4" height="10" rx="1"/>
                <rect x="7" y="1" width="4" height="10" rx="1"/>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                <path d="M2 1.5a.5.5 0 0 1 .763-.424l8 4.5a.5.5 0 0 1 0 .848l-8 4.5A.5.5 0 0 1 2 10.5v-9Z"/>
              </svg>
            )}
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>

        <div
          className="rounded-xl p-8 flex flex-col gap-10"
          style={{ background: 'radial-gradient(circle at 30% 40%, #10a37f 0%, #0c8464 50%, #064d3c 100%)' }}
        >
          {/* Moving */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">Moving</p>
            <div className="flex items-center justify-center" style={{ height: 80 }}>
              <div className={`motion-tile motion-tile--moving${playing ? '' : ' paused'}`}>Moving</div>
            </div>
            <p className="text-xs text-white/50 text-center mt-3 font-mono">
              translateX · duration-short · easing-base
            </p>
          </div>

          {/* Enter / Exit */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">Enter / Exit</p>
            <div className="flex items-center justify-center" style={{ height: 80 }}>
              <div className={`motion-tile motion-tile--enter-exit${playing ? '' : ' paused'}`}>Enter / Exit</div>
            </div>
            <p className="text-xs text-white/50 text-center mt-3 font-mono">
              translateY + opacity · duration-moderate · easing-in / easing-out
            </p>
          </div>

          {/* Show / Hide */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">Show / Hide</p>
            <div className="flex items-center justify-center" style={{ height: 80 }}>
              <div className={`motion-tile motion-tile--show-hide${playing ? '' : ' paused'}`}>Show / Hide</div>
            </div>
            <p className="text-xs text-white/50 text-center mt-3 font-mono">
              opacity · duration-long · easing-base
            </p>
          </div>

          {/* Expand */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">Expand</p>
            <div className="flex items-center justify-center" style={{ height: 128 }}>
              <div className={`motion-tile motion-tile--expand${playing ? '' : ' paused'}`}>Expand</div>
            </div>
            <p className="text-xs text-white/50 text-center mt-3 font-mono">
              height · duration-short → duration-moderate · easing-in → easing-base
            </p>
          </div>
        </div>
      </Section>

      {/* ── Styles ──────────────────────────────────────────────────────────── */}
      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Import JS tokens for use in CSS-in-JS or Framer Motion. Use CSS custom properties
          directly in stylesheets. Include the reduced-motion reset in both global CSS and inside
          each Shadow DOM component.
        </p>
        <CodeSnippet code={`// JS — import motion tokens
import {
  motionDurationShort,
  motionDurationModerate,
  motionDurationLong,
  motionDurationVeryLong,
  motionEasingBase,
  motionEasingIn,
  motionEasingOut,
} from '@diwacopilot/components/styles';

// Framer Motion
<motion.div
  animate={{ opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: 40 }}
  transition={{
    duration: parseFloat(motionDurationModerate),
    ease: motionEasingOut,
  }}
/>

/* ─── CSS ─────────────────────────────────────────────────────────────── */
/* Moving — element stays on screen */
.chip {
  transition: transform var(--diwa-motion-duration-short)
              var(--diwa-motion-easing-base);
}

/* Enter — element arrives on screen (decelerates) */
.drawer {
  transition: transform var(--diwa-motion-duration-long)
              var(--diwa-motion-easing-out);
}

/* Exit — element leaves screen (accelerates) */
.toast[aria-hidden='true'] {
  transition: opacity var(--diwa-motion-duration-moderate)
              var(--diwa-motion-easing-in);
}

/* Reduced motion — global reset */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Reduced motion — Shadow DOM components (boundary breaks global reset) */
@media (prefers-reduced-motion: reduce) {
  :host {
    transition: none !important;
    animation: none !important;
  }
}`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwacopilot/components/styles' as *;

.chip {
  transition: transform $diwa-motion-duration-short $diwa-motion-easing-base;
}

.drawer {
  transition: transform $diwa-motion-duration-long $diwa-motion-easing-out;
}

.toast[aria-hidden='true'] {
  transition: opacity $diwa-motion-duration-moderate $diwa-motion-easing-in;
}

@media (prefers-reduced-motion: reduce) {
  :host {
    transition: none !important;
    animation: none !important;
  }
}`,
          },
          {
            label: 'React',
            code: `import {
  motionDurationModerate,
  motionDurationLong,
  motionEasingBase,
  motionEasingOut,
} from '@diwacopilot/components/styles';
import { motion } from 'framer-motion';

function AnimatedPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{
        duration: parseFloat(motionDurationModerate),
        ease: motionEasingOut,
      }}
    >
      {children}
    </motion.div>
  );
}

// CSS-in-JS transition
const chipStyle = {
  transition: \`transform \${motionDurationLong} \${motionEasingBase}\`,
};`,
          },
        ]} />
      </Section>
    </div>
  );
}
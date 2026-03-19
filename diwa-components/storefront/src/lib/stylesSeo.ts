import type { Metadata } from 'next';
import { buildMetadata } from './seo';

/**
 * Per-page metadata for every route under /styles.
 * Keyed by the exact pathname string.
 */
export const stylesSeo: Record<string, Metadata> = {
  '/styles': buildMetadata({
    title: 'Styles',
    description:
      'Token-first design system styles: theme, spacing, typography, motion, and accessibility guidance for consistent, brand-aligned UIs.',
    pathname: '/styles',
    ogSection: 'styles',
  }),

  '/styles/border': buildMetadata({
    title: 'Border',
    description:
      'Border-radius scale and border-width tokens for consistent corner shapes and stroke thicknesses across all components.',
    pathname: '/styles/border',
    ogSection: 'styles',
  }),

  '/styles/drop-shadow': buildMetadata({
    title: 'Drop Shadow',
    description:
      'Four-step elevation shadow scale. Assign the right shadow level to cards, modals, and overlays to communicate visual depth.',
    pathname: '/styles/drop-shadow',
    ogSection: 'styles',
  }),

  '/styles/focus': buildMetadata({
    title: 'Focus',
    description:
      'WCAG 2.2 AA-compliant focus ring tokens and :focus-visible utilities for accessible keyboard navigation on any background.',
    pathname: '/styles/focus',
    ogSection: 'styles',
  }),

  '/styles/frosted-glass': buildMetadata({
    title: 'Frosted Glass',
    description:
      'Backdrop-blur tokens and semi-transparent surface overlay patterns for navigation bars, modals, and immersive backgrounds.',
    pathname: '/styles/frosted-glass',
    ogSection: 'styles',
  }),

  '/styles/gradient': buildMetadata({
    title: 'Gradient',
    description:
      'Brand gradient presets and scrim composition utilities for hero sections, image overlays, and decorative accent treatments.',
    pathname: '/styles/gradient',
    ogSection: 'styles',
  }),

  '/styles/grid': buildMetadata({
    title: 'Grid',
    description:
      '12-column responsive grid system with fluid gutter and margin tokens, plus helper JS utilities for dynamic layout control.',
    pathname: '/styles/grid',
    ogSection: 'styles',
  }),

  '/styles/hover': buildMetadata({
    title: 'Hover',
    description:
      'Translucent state-overlay tokens and touch-device guard patterns for consistent pointer-state feedback across themes.',
    pathname: '/styles/hover',
    ogSection: 'styles',
  }),

  '/styles/media-query': buildMetadata({
    title: 'Media Query',
    description:
      'Breakpoint definitions (xs–2xl) and JS helper functions for responsive behaviour across phones, tablets, and wide desktops.',
    pathname: '/styles/media-query',
    ogSection: 'styles',
  }),

  '/styles/motion': buildMetadata({
    title: 'Motion',
    description:
      'Duration, easing, and reduced-motion accessibility patterns for smooth, accessible UI transitions and animations.',
    pathname: '/styles/motion',
    ogSection: 'styles',
  }),

  '/styles/skeleton': buildMetadata({
    title: 'Skeleton',
    description:
      'Loading-state placeholder keyframes and CSS/JS utilities for shimmer skeleton screens that respect prefers-reduced-motion.',
    pathname: '/styles/skeleton',
    ogSection: 'styles',
  }),

  '/styles/spacing': buildMetadata({
    title: 'Spacing',
    description:
      'Static 4 px-grid spacing scale and fluid clamp() variants for consistent layout rhythm from component internals to page layout.',
    pathname: '/styles/spacing',
    ogSection: 'styles',
  }),

  '/styles/theme': buildMetadata({
    title: 'Theme',
    description:
      'Semantic color tokens, full Noir dark palette, Light theme, and theme-switching guidance for brand-aligned, accessible UIs.',
    pathname: '/styles/theme',
    ogSection: 'styles',
  }),

  '/styles/typography': buildMetadata({
    title: 'Typography',
    description:
      'Font families, static and fluid type scale, line-height tokens, and typographic rhythm guidance for readable, accessible text.',
    pathname: '/styles/typography',
    ogSection: 'styles',
  }),
};

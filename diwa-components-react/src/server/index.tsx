/**
 * @diwacopilot/components-react/server
 *
 * RSC-safe (React Server Component-safe) exports.
 *
 * These are pure function components that render Diwa custom element shells as
 * plain HTML attributes. They do NOT import `createReactComponent`, do NOT call
 * `defineCustomElements()`, and do NOT extend React.Component — so they are safe
 * to import in Next.js Server Components (and any other RSC-compatible runtime).
 *
 * On the server they produce the correct HTML skeleton; the browser upgrades the
 * custom elements and attaches shadow DOM once the Stencil bundle loads.
 *
 * Supported components (presentational / no event delegation or refs needed):
 *   DHeading, DText, DDivider, DBadge, DIcon
 *
 * Interactive components (DButton, DInput*, DModal, DFlyout, …) are intentionally
 * excluded — they rely on refs, DOM event delegation, and the custom element
 * registry. Import them from '@diwacopilot/components-react' inside a 'use client'
 * file as before.
 */

import React from 'react';

// ─── Shared ──────────────────────────────────────────────────────────────────

type Theme = 'light' | 'dark';

// ─── DHeading ────────────────────────────────────────────────────────────────

export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit';
export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
export type HeadingAlign = 'start' | 'center' | 'end';
export type HeadingColor = 'primary' | 'secondary' | 'inherit';
export type HeadingWeight = 'semibold' | 'bold';

export interface DHeadingProps {
  size?: HeadingSize;
  tag?: HeadingTag;
  weight?: HeadingWeight;
  align?: HeadingAlign;
  color?: HeadingColor;
  theme?: Theme;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function DHeading({
  size = 'h2',
  tag,
  weight = 'bold',
  align = 'start',
  color = 'primary',
  theme = 'dark',
  className,
  style,
  children,
}: DHeadingProps) {
  const props: Record<string, unknown> = {
    size,
    weight,
    align,
    color,
    theme,
    suppressHydrationWarning: true,
  };
  if (tag !== undefined) props['tag'] = tag;
  if (className !== undefined) props['class'] = className;
  if (style !== undefined) props['style'] = style;

  return React.createElement('diwa-heading', props, children);
}

// ─── DText ───────────────────────────────────────────────────────────────────

export type TextTag = 'p' | 'span' | 'div' | 'label' | 'li';
export type TextSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
export type TextWeight = 'regular' | 'semibold' | 'bold';
export type TextAlign = 'start' | 'center' | 'end';
export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'inherit';

export interface DTextProps {
  tag?: TextTag;
  size?: TextSize;
  weight?: TextWeight;
  align?: TextAlign;
  color?: TextColor;
  ellipsis?: boolean;
  theme?: Theme;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function DText({
  tag = 'p',
  size = 'small',
  weight = 'regular',
  align = 'start',
  color = 'primary',
  ellipsis = false,
  theme = 'dark',
  className,
  style,
  children,
}: DTextProps) {
  const props: Record<string, unknown> = {
    tag,
    size,
    weight,
    align,
    color,
    theme,
    suppressHydrationWarning: true,
  };
  if (ellipsis) props['ellipsis'] = true;
  if (className !== undefined) props['class'] = className;
  if (style !== undefined) props['style'] = style;

  return React.createElement('diwa-text', props, children);
}

// ─── DDivider ─────────────────────────────────────────────────────────────────

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DDividerProps {
  orientation?: DividerOrientation;
  theme?: Theme;
  className?: string;
  style?: React.CSSProperties;
}

export function DDivider({
  orientation = 'horizontal',
  theme = 'dark',
  className,
  style,
}: DDividerProps) {
  const props: Record<string, unknown> = {
    orientation,
    theme,
    suppressHydrationWarning: true,
  };
  if (className !== undefined) props['class'] = className;
  if (style !== undefined) props['style'] = style;

  return React.createElement('diwa-divider', props);
}

// ─── DBadge ──────────────────────────────────────────────────────────────────

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export interface DBadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  label?: string;
  dot?: boolean;
  theme?: Theme;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function DBadge({
  variant = 'neutral',
  size = 'md',
  label,
  dot = false,
  theme = 'dark',
  className,
  style,
  children,
}: DBadgeProps) {
  const props: Record<string, unknown> = {
    variant,
    size,
    theme,
    suppressHydrationWarning: true,
  };
  if (dot) props['dot'] = true;
  if (label !== undefined) props['label'] = label;
  if (className !== undefined) props['class'] = className;
  if (style !== undefined) props['style'] = style;

  return React.createElement('diwa-badge', props, children);
}

// ─── DIcon ───────────────────────────────────────────────────────────────────
//
// DIcon renders the <diwa-icon> shell with correct attributes.
// The shell is empty on the server (no shadow DOM / SVG yet); the browser
// upgrades it and injects the Lucide SVG once the Stencil bundle loads.
// Use suppressHydrationWarning to silence the mismatch warning.

export interface DIconProps {
  name: string;
  size?: number;
  color?: string;
  label?: string;
  theme?: Theme;
  className?: string;
  style?: React.CSSProperties;
}

export function DIcon({
  name,
  size = 24,
  color = 'currentColor',
  label,
  theme = 'dark',
  className,
  style,
}: DIconProps) {
  const props: Record<string, unknown> = {
    name,
    size,
    color,
    theme,
    suppressHydrationWarning: true,
  };
  if (label !== undefined) props['label'] = label;
  if (className !== undefined) props['class'] = className;
  if (style !== undefined) props['style'] = style;

  return React.createElement('diwa-icon', props);
}

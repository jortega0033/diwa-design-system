import type { HeadingSize, HeadingTag } from './types';

const H_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

export const SIZE_TO_TAG: Record<HeadingSize, HeadingTag> = {
  display: 'h1',
  h1:      'h1',
  h2:      'h2',
  h3:      'h3',
  h4:      'h4',
  h5:      'h5',
  h6:      'h6',
  inherit: 'h2',
};

/**
 * Resolves the HTML tag to render:
 * 1. If any direct slotted child is an h1–h6 element → return 'div' (avoids invalid nesting).
 * 2. If an explicit `tag` prop is provided → use it.
 * 3. Otherwise → infer from the `size` prop.
 */
export function getHeadingTag(
  host: HTMLElement | null,
  size: HeadingSize,
  tag: HeadingTag | undefined,
): HeadingTag {
  if (host && Array.from(host.children).some((el) => H_TAGS.has(el.tagName.toLowerCase()))) {
    return 'div';
  }
  if (tag) return tag;
  return SIZE_TO_TAG[size];
}

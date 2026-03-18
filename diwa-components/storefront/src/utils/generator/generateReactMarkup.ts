import type { ElementConfig, HTMLTagOrComponent } from './generator';

/**
 * Generates a React TSX component string from an ElementConfig tree.
 *
 * Custom elements in React 19 accept camelCase prop names (React passes
 * them through to the DOM element as attributes). Boolean `true` uses the
 * JSX bare-attribute shorthand; `false`/`undefined`/`null` are omitted.
 */
export function generateReactMarkup(
  nodes: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  componentName = 'Example',
): string {
  const filtered = nodes.filter(
    (n): n is string | ElementConfig<HTMLTagOrComponent> => n !== undefined,
  );
  const body = filtered.map((n) => serializeNode(n, 4)).join('\n');
  const diwaImports = collectDiwaComponents(filtered);
  const importLine =
    diwaImports.length > 0
      ? `import { ${diwaImports.join(', ')} } from '@diwa/components-react';`
      : null;

  return [
    "import React from 'react';",
    ...(importLine ? [importLine] : []),
    '',
    `export const ${componentName}: React.FC = () => {`,
    '  return (',
    body,
    '  );',
    '};',
  ].join('\n');
}

function serializeNode(
  node: string | ElementConfig<HTMLTagOrComponent>,
  depth: number,
): string {
  if (typeof node === 'string') return indent(depth) + node;

  const { tag, properties = {}, children = [] } = node;
  const attrs = buildAttributes(properties);
  const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';
  const rawTag = String(tag);
  const tagStr = isDiwaTag(rawTag) ? diwaTagToComponent(rawTag) : rawTag;

  const filteredChildren = children.filter(
    (c): c is string | ElementConfig<HTMLTagOrComponent> => c !== undefined,
  );

  if (filteredChildren.length === 0) {
    return `${indent(depth)}<${tagStr}${attrStr} />`;
  }

  if (
    filteredChildren.length === 1 &&
    typeof filteredChildren[0] === 'string' &&
    !filteredChildren[0].includes('\n')
  ) {
    return `${indent(depth)}<${tagStr}${attrStr}>${filteredChildren[0]}</${tagStr}>`;
  }

  const inner = filteredChildren.map((c) => serializeNode(c, depth + 2)).join('\n');
  return `${indent(depth)}<${tagStr}${attrStr}>\n${inner}\n${indent(depth)}</${tagStr}>`;
}

/** Build JSX attribute list. camelCase names preserved; booleans use bare shorthand. */
function buildAttributes(props: Record<string, unknown>): string[] {
  const result: string[] = [];
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;
    // Skip event handlers and React internal props
    if ((key.startsWith('on') && key[2] === key[2]?.toUpperCase()) || key === 'key' || key === 'ref') continue;
    if (value === true) {
      result.push(key); // bare attribute = true in JSX
    } else if (typeof value === 'object') {
      result.push(`${key}={${JSON.stringify(value)}}`);
    } else {
      result.push(`${key}="${String(value)}"`);
    }
  }
  return result;
}

function isDiwaTag(tag: string): boolean {
  return tag.startsWith('diwa-');
}

/** diwa-button → DButton, diwa-spinner → DSpinner, etc. */
function diwaTagToComponent(tag: string): string {
  return tag.replace(/^diwa-/, 'd-').split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function collectDiwaComponents(
  nodes: (string | ElementConfig<HTMLTagOrComponent>)[],
): string[] {
  const names = new Set<string>();
  function traverse(node: string | ElementConfig<HTMLTagOrComponent> | undefined) {
    if (!node || typeof node === 'string') return;
    const t = String((node as ElementConfig<HTMLTagOrComponent>).tag);
    if (isDiwaTag(t)) names.add(diwaTagToComponent(t));
    ((node as ElementConfig<HTMLTagOrComponent>).children ?? []).forEach(traverse);
  }
  nodes.forEach(traverse);
  return [...names].sort();
}

function indent(depth: number): string {
  return ' '.repeat(depth);
}

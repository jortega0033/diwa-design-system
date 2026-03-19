import type { ElementConfig, HTMLTagOrComponent } from './generator';

/**
 * Generates an Angular template string from an ElementConfig tree.
 *
 * Attribute names are converted to kebab-case (Stencil's reflected attribute
 * names). Boolean `true` uses Angular property binding `[name]="true"`;
 * `false`/`undefined`/`null` are omitted.
 */
export function generateAngularMarkup(
  nodes: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
): string {
  const filtered = nodes.filter(
    (n): n is string | ElementConfig<HTMLTagOrComponent> => n !== undefined,
  );
  const template = filtered.map((n) => serializeNode(n, 4)).join('\n');
  const diwaImports = collectDiwaComponents(filtered);
  const importsArr = diwaImports.length > 0 ? `[${diwaImports.join(', ')}]` : '[]';

  const lines = ["import { ChangeDetectionStrategy, Component } from '@angular/core';"];
  if (diwaImports.length > 0) {
    lines.push(`import { ${diwaImports.join(', ')} } from '@diwacopilot/components-angular';`);
  }
  lines.push(
    '',
    '@Component({',
    "  selector: 'app-example',",
    '  standalone: true,',
    `  imports: ${importsArr},`,
    '  changeDetection: ChangeDetectionStrategy.OnPush,',
    '  template: `',
    template,
    '  `,',
    '})',
    'export class ExampleComponent {}',
  );
  return lines.join('\n');
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
  const tagStr = isDiwaTag(rawTag) ? diwaTagToSelector(rawTag) : rawTag;

  const filteredChildren = children.filter(
    (c): c is string | ElementConfig<HTMLTagOrComponent> => c !== undefined,
  );

  if (filteredChildren.length === 0) {
    return `${indent(depth)}<${tagStr}${attrStr}></${tagStr}>`;
  }

  if (
    filteredChildren.length === 1 &&
    typeof filteredChildren[0] === 'string' &&
    !filteredChildren[0].includes('\n')
  ) {
    return `${indent(depth)}<${tagStr}${attrStr}>${filteredChildren[0]}</${tagStr}>`;
  }

  const inner = filteredChildren.map((c) => serializeNode(c, depth + 1)).join('\n');
  return `${indent(depth)}<${tagStr}${attrStr}>\n${inner}\n${indent(depth)}</${tagStr}>`;
}

/** Build attribute list with Angular property-binding syntax for booleans. */
function buildAttributes(props: Record<string, unknown>): string[] {
  const result: string[] = [];
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;
    if ((key.startsWith('on') && key[2] === key[2]?.toUpperCase()) || key === 'key' || key === 'ref') continue;

    const attrName = jsxAttrToHtml(key);
    if (!attrName) continue;

    if (value === true) {
      result.push(`[${attrName}]="true"`);
    } else if (typeof value === 'object') {
      result.push(`[${attrName}]='${JSON.stringify(value)}'`);
    } else {
      result.push(`${attrName}="${String(value)}"`);
    }
  }
  return result;
}

function jsxAttrToHtml(key: string): string | null {
  if (key === 'className') return 'class';
  if (key === 'htmlFor') return 'for';
  return camelToKebab(key);
}

function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
}

function isDiwaTag(tag: string): boolean {
  return tag.startsWith('diwa-');
}

/** diwa-button → d-button (Angular template selector) */
function diwaTagToSelector(tag: string): string {
  return tag.replace(/^diwa-/, 'd-');
}

/** diwa-button → DButton (Angular class import name) */
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
  return '  '.repeat(depth);
}

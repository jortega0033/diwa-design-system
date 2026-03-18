/**
 * Patch @stencil/core compiler to suppress native DOM event name warnings.
 *
 * Stencil emits a [ WARN ] when an @Event() property name matches a native DOM
 * event name (e.g. "change", "input", "blur", "focus"). This is intentional in
 * diwa-components — we want natural event names for the best developer experience.
 *
 * This script removes that specific diagnostic check from the compiled
 * stencil.js binary, similar to how PDS patches attachInternals support.
 *
 * Run before every build: "node scripts/patch-stencil-event-warnings.js"
 */
const fs = require('fs');
const path = require('path');

const stencilJsPath = path.resolve(
  require.resolve('@stencil/core'),
  '../../../compiler/stencil.js',
);

let content = fs.readFileSync(stencilJsPath, 'utf8');

const TARGET =
  ` (DOM_EVENT_NAMES.has(eventName.toLowerCase())) {\n    const diagnostic = buildWarn(diagnostics);\n    diagnostic.messageText = \`The event name conflicts with the "\${eventName}" native DOM event name.\`;\n    augmentDiagnosticWithNode(diagnostic, node);\n    return;\n  }`;

const REPLACEMENT =
  ` (false /* diwa-patch: natural event names allowed */) {\n    const diagnostic = buildWarn(diagnostics);\n    diagnostic.messageText = \`The event name conflicts with the "\${eventName}" native DOM event name.\`;\n    augmentDiagnosticWithNode(diagnostic, node);\n    return;\n  }`;

if (content.includes(REPLACEMENT)) {
  console.log('[patch-stencil] Already patched. Skipping.');
  process.exit(0);
}

if (!content.includes(TARGET)) {
  console.error('[patch-stencil] Target string not found — Stencil compiler may have changed. Please review this script.');
  process.exit(1);
}

const patched = content.replace(TARGET, REPLACEMENT);
fs.writeFileSync(stencilJsPath, patched, 'utf8');
console.log('[patch-stencil] Successfully patched @stencil/core compiler to suppress native DOM event name warnings.');

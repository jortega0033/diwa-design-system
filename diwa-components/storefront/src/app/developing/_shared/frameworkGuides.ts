export type FrameworkGuideKey = 'vanilla-js' | 'next-js' | 'react' | 'angular' | 'vue';

export type FrameworkGuide = {
  key: FrameworkGuideKey;
  title: string;
  intro: string;
  packageNames: string;
  installCommand: string;
  setupCode: string;
  firstComponentCode: string;
  eventCode: string;
  ssrAndTestingNotes: string[];
  troubleshooting: string[];
};

export const FRAMEWORK_GUIDES: Record<FrameworkGuideKey, FrameworkGuide> = {
  'vanilla-js': {
    key: 'vanilla-js',
    title: 'Vanilla JS',
    intro: 'Use Diwa as standards-based custom elements with the core package and loader.',
    packageNames: '@diwacopilot/components',
    installCommand: 'npm install @diwacopilot/components',
    setupCode: `// main.ts\nimport { defineCustomElements } from '@diwacopilot/components/loader';\n\ndefineCustomElements();`,
    firstComponentCode: `<diwa-button variant="primary">Save</diwa-button>`,
    eventCode: `const button = document.querySelector('diwa-button');\n\nbutton?.addEventListener('click', () => {\n  console.log('Save clicked');\n});`,
    ssrAndTestingNotes: [
      'On server-rendered HTML, Diwa elements upgrade after the loader runs in the browser.',
      'For unit tests in jsdom, wait for element definition before asserting behavior.',
      'For interaction fidelity, prefer browser-based tests for complex keyboard and focus behavior.',
    ],
    troubleshooting: [
      'If a component renders as plain markup only, confirm defineCustomElements() runs once at startup.',
      'If tokens look missing, ensure your app includes Diwa global styles or equivalent token definitions.',
      'If custom events appear missing, attach listeners after the element is in the DOM.',
    ],
  },
  'next-js': {
    key: 'next-js',
    title: 'Next.js',
    intro: 'Register Diwa custom elements in a client-side bootstrap component and use them in App Router pages.',
    packageNames: '@diwacopilot/components',
    installCommand: 'npm install @diwacopilot/components',
    setupCode: `// app/diwa-client.tsx\n'use client';\n\nimport { useEffect } from 'react';\nimport { defineCustomElements } from '@diwacopilot/components/loader';\n\nexport function DiwaClient() {\n  useEffect(() => {\n    defineCustomElements();\n  }, []);\n\n  return null;\n}\n\n// app/layout.tsx\nimport { DiwaClient } from './diwa-client';\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>\n        <DiwaClient />\n        {children}\n      </body>\n    </html>\n  );\n}`,
    firstComponentCode: `export default function Page() {\n  return <diwa-button variant="primary">Save</diwa-button>;\n}`,
    eventCode: `'use client';\n\nimport { useEffect, useRef } from 'react';\n\nexport function SaveButton() {\n  const ref = useRef<HTMLElement | null>(null);\n\n  useEffect(() => {\n    const node = ref.current;\n    if (!node) return;\n\n    const onClick = () => console.log('Save clicked');\n    node.addEventListener('click', onClick);\n    return () => node.removeEventListener('click', onClick);\n  }, []);\n\n  return <diwa-button ref={ref} variant="primary">Save</diwa-button>;\n}`,
    ssrAndTestingNotes: [
      'Call defineCustomElements() only on the client.',
      'For server rendering with custom elements, keep interactive logic in client components.',
      'Use browser-based tests for hydration and keyboard behavior; use unit tests for static rendering checks.',
    ],
    troubleshooting: [
      'If hydration warnings appear, ensure your bootstrap component is marked with use client.',
      'If the element tag stays unupgraded, verify defineCustomElements() runs before interaction code.',
      'If SSR and client markup differ, avoid mutating custom-element props during the first render pass.',
    ],
  },
  react: {
    key: 'react',
    title: 'React',
    intro: 'Use the React wrapper package for typed component imports and framework-friendly integration.',
    packageNames: '@diwacopilot/components + @diwacopilot/components-react',
    installCommand: 'npm install @diwacopilot/components @diwacopilot/components-react',
    setupCode: `import React from 'react';\nimport { DButton } from '@diwacopilot/components-react';\n\nexport function App() {\n  return <DButton variant="primary">Save</DButton>;\n}`,
    firstComponentCode: `import { DButton } from '@diwacopilot/components-react';\n\nexport function SaveAction() {\n  return <DButton variant="primary">Save</DButton>;\n}`,
    eventCode: `import { DSelect } from '@diwacopilot/components-react';\n\nexport function RegionSelect() {\n  return (\n    <DSelect\n      label="Region"\n      onUpdate={(event: CustomEvent<{ value: string }>) => {\n        console.log(event.detail.value);\n      }}\n    />\n  );\n}`,
    ssrAndTestingNotes: [
      'React wrapper components handle custom-element registration for browser rendering.',
      'For SSR apps, follow the Next.js integration route when hydration constraints apply.',
      'In tests, wait for custom element upgrades before asserting behavior that depends on internal DOM.',
    ],
    troubleshooting: [
      'If TypeScript cannot find wrapper symbols, verify @diwacopilot/components-react is installed in the app.',
      'If event handlers do not fire, validate the exact event name from the component API page.',
      'If styling appears inconsistent, confirm Diwa token variables are available in global styles.',
    ],
  },
  angular: {
    key: 'angular',
    title: 'Angular',
    intro: 'Use Angular proxies from the Diwa Angular package with standalone imports.',
    packageNames: '@diwacopilot/components + @diwacopilot/components-angular',
    installCommand: 'npm install @diwacopilot/components @diwacopilot/components-angular',
    setupCode: `import { ChangeDetectionStrategy, Component } from '@angular/core';\nimport { DButton } from '@diwacopilot/components-angular';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  imports: [DButton],\n  template: '<d-button variant="primary">Save</d-button>',\n  changeDetection: ChangeDetectionStrategy.OnPush,\n})\nexport class AppComponent {}`,
    firstComponentCode: `<d-button variant="primary">Save</d-button>`,
    eventCode: `import { Component } from '@angular/core';\nimport { DSwitch } from '@diwacopilot/components-angular';\n\n@Component({\n  selector: 'app-settings',\n  standalone: true,\n  imports: [DSwitch],\n  template: '\n    <d-switch\n      label="Email notifications"\n      (update)="onSwitchUpdate($event)"\n    ></d-switch>\n  ',\n})\nexport class SettingsComponent {\n  onSwitchUpdate(event: CustomEvent<{ checked: boolean }>) {\n    console.log(event.detail.checked);\n  }\n}`,
    ssrAndTestingNotes: [
      'Angular proxies integrate cleanly with standalone components and OnPush patterns.',
      'For SSR/hydration setups, keep browser-only custom-element assumptions behind platform checks.',
      'In TestBed, wait for fixture stability and custom-element definition before behavior assertions.',
    ],
    troubleshooting: [
      'If templates fail to compile, confirm the Diwa proxy component is listed in imports.',
      'If events do not trigger, match the exact custom event name exposed by the component API.',
      'If rendered output is static only in tests, ensure the environment supports custom elements.',
    ],
  },
  vue: {
    key: 'vue',
    title: 'Vue',
    intro: 'Use Vue wrappers from the Diwa Vue package for clean template syntax and typed imports.',
    packageNames: '@diwacopilot/components + @diwacopilot/components-vue',
    installCommand: 'npm install @diwacopilot/components @diwacopilot/components-vue',
    setupCode: `<script setup lang="ts">\nimport { DButton } from '@diwacopilot/components-vue';\n</script>\n\n<template>\n  <DButton variant="primary">Save</DButton>\n</template>`,
    firstComponentCode: `<script setup lang="ts">\nimport { DInputText } from '@diwacopilot/components-vue';\n</script>\n\n<template>\n  <DInputText label="Name" placeholder="Ada Lovelace" />\n</template>`,
    eventCode: `<script setup lang="ts">\nimport { DMultiSelect } from '@diwacopilot/components-vue';\n\nfunction onUpdate(event: CustomEvent<{ values: string[] }>) {\n  console.log(event.detail.values);\n}\n</script>\n\n<template>\n  <DMultiSelect label="Regions" @update="onUpdate" />\n</template>`,
    ssrAndTestingNotes: [
      'Vue wrappers provide component-friendly bindings while still using Diwa custom elements internally.',
      'For SSR frameworks, use client-only wrappers when hydration constraints require it.',
      'In Vue tests, await nextTick and custom-element readiness before checking interactive states.',
    ],
    troubleshooting: [
      'If wrapper imports fail, verify @diwacopilot/components-vue is installed and resolved by the bundler.',
      'If events are missing, check event casing and emitted detail shape on the API page.',
      'If style tokens are not applied, make sure global Diwa CSS variables are loaded once.',
    ],
  },
};

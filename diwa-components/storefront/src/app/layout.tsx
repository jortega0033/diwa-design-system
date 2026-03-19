import type { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';
import { StorefrontThemeProvider } from '@/hooks/useStorefrontTheme';
import { SidebarProvider } from '@/context/SidebarContext';
import { Canvas } from '@/components/layout/Canvas';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Diwa Design System',
  description: 'Framework-agnostic Web Components — Diwa Design System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/*
         * Blocking inline script — runs synchronously before first paint to apply
         * the persisted theme. Prevents the dark→user-theme flash on reload.
         * suppressHydrationWarning on <html> silences the data-theme mismatch.
         */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: intentional theme init */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('diwa-theme')||'dark';var r=s==='auto'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):s;document.documentElement.setAttribute('data-theme',r);}catch(e){}})();`,
          }}
        />
        {/*
         * Load Diwa design tokens (--diwa-* CSS custom properties).
         * In dev mode the Stencil serve target runs on :3333 and the Next.js
         * proxy rewrites /stencil/* → localhost:3333/build/*.
         *
         * The global stylesheet produced by Stencil is at:
         *   localhost:3333/build/diwa-components.css  (globalStyle output)
         */}
        <link rel="stylesheet" href="/stencil/diwa-components.css" />
        {/* Organization JSON-LD for search engines */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: intentional JSON-LD insertion */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: 'Diwa Design System',
              url: 'https://designsystem.diwacopilot.com',
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/*
         * Load the Stencil ESM loader so <diwa-*> custom elements register
         * themselves when first encountered in the DOM.
         * strategy="beforeInteractive" ensures it runs before React hydrates.
         */}
        <Script
          src="/stencil/diwa-components.esm.js"
          type="module"
          strategy="beforeInteractive"
        />
        <StorefrontThemeProvider>
          <SidebarProvider>
            <Canvas>{children}</Canvas>
          </SidebarProvider>
        </StorefrontThemeProvider>
      </body>
    </html>
  );
}

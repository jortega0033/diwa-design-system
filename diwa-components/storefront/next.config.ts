import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Proxy Stencil dev server assets.
   * When `npm run dev:stencil` is running (port 3333), all requests to
   * /stencil/* are rewritten to http://localhost:3333/build/* so Next.js
   * can serve the compiled Stencil components without needing a pre-build.
   *
   * In production (`next build`) the dist-custom-elements or www/build/
   * directory must be copied to public/stencil/. For now this is dev-only.
   */
  async rewrites() {
    return [
      {
        source: '/stencil/:path*',
        destination: 'http://localhost:3333/build/:path*',
      },
    ];
  },
};

export default nextConfig;

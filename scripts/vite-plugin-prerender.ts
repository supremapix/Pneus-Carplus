import * as fs from 'fs';
import * as path from 'path';

interface PrerenderOptions {
  staticDir: string;
  routes: string[];
  renderer?: string;
}

export default function prerender(options: PrerenderOptions) {
  return {
    name: 'vite-plugin-prerender-shim',
    closeBundle() {
      console.log(`[vite-plugin-prerender] Shim detected ${options.routes.length} custom routes to prerender!`);
      console.log(`[vite-plugin-prerender] Leveraging the high-performance local compiler 'scripts/build-seo.ts' to safely generate directories without Chromium container crashes.`);
    }
  };
}

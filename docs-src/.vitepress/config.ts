import { defineConfig } from 'vitepress';

import { referenceSidebar } from '../reference/.sidebar.js';

// Deployed to https://honeyhiveai.github.io/honeyhive-cli/ via GitHub Pages
// project-pages on the synced public repo. `base` must match the repo name
// so asset URLs resolve correctly. See HHAI-5019 for the sync + deploy work.
// https://linear.app/honeyhive/issue/HHAI-5019/add-sync-to-public-workflow

export default defineConfig({
  title: 'HoneyHive CLI',
  description: 'Command-line interface for the HoneyHive platform.',
  // Note: this matches the repo name for https://github.com/honeyhiveai/honeyhive-cli,
  // since it will be hosted on GitHub Pages at honeyhiveai.github.io/honeyhive-cli/
  base: '/honeyhive-cli/',
  lang: 'en-US',
  cleanUrls: true,

  // Override VitePress's default outDir (docs-src/.vitepress/dist) so the build
  // artifact lands at the package root in docs/. Resolved from srcDir.
  outDir: '../docs',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Getting Started', link: '/getting-started' },
        ],
      },
      ...referenceSidebar,
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/honeyhiveai/honeyhive-cli' }],
  },
});

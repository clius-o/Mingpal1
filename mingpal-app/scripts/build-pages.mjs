// Builds the web version for GitHub Pages: static export under the repo subpath, SPA fallback (404.html) and .nojekyll.
// Usage: npm run build:pages            -> dist-pages/ (base path /Mingpal1)
//        OUT_DIR=/tmp/site EXPO_BASE_URL=/other npm run build:pages
import { spawnSync } from 'node:child_process';
import { copyFileSync, writeFileSync } from 'node:fs';

const base = process.env.EXPO_BASE_URL ?? '/Mingpal1';
const out = process.env.OUT_DIR ?? 'dist-pages';

const result = spawnSync('npx', ['expo', 'export', '--platform', 'web', '--clear', '--output-dir', out], {
  stdio: 'inherit',
  shell: true, // npx.cmd on Windows
  env: { ...process.env, EXPO_BASE_URL: base },
});
if (result.status !== 0) process.exit(result.status ?? 1);

// GitHub Pages has no rewrites: unknown paths (deep links, refresh) get 404.html, which is the app shell itself.
copyFileSync(`${out}/index.html`, `${out}/404.html`);
writeFileSync(`${out}/.nojekyll`, '');
console.log(`\nDone: ${out}/ (base path ${base}). Publish it on the gh-pages branch.`);

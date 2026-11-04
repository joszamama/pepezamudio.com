import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const basePath = process.env.PAGES_BASE_PATH;
if (!basePath || !/^\/[a-zA-Z0-9._/-]*$/.test(basePath) || (basePath !== '/' && basePath.endsWith('/'))) {
  throw new Error('Set PAGES_BASE_PATH to a path such as /pepezamudio.com, or / for a custom domain.');
}

if (basePath === '/') {
  process.exit(0);
}

const outputDirectory = new URL('../dist/', import.meta.url);
let updated = 0;

async function rewriteHtml(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    if (entry.isDirectory()) {
      await rewriteHtml(file);
    } else if (path.extname(entry.name) === '.html') {
      const html = await readFile(file, 'utf8');
      const rewritten = html.replace(/(\b(?:href|src|action|poster|srcset)=["'])\/(?!\/)/g, `$1${basePath}/`);
      if (rewritten !== html) {
        await writeFile(file, rewritten);
        updated += 1;
      }
    }
  }
}

await rewriteHtml(outputDirectory);
console.log(`Prepared ${updated} HTML pages for GitHub Pages at ${basePath}/`);

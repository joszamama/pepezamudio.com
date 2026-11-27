/* Build self-hosted, interactive talk decks under public/slides/<slug>/.
 *
 * Source decks are authored in Claude Slides (the "slide format": one
 * <section> per slide on a fixed 1920x1080 canvas, shared project/deck.css for
 * CSS decks, inline styles for inline decks).  This script turns a deck's
 * slide files + image assets into a single standalone page that the runtime in
 * public/slides/viewer.{css,js} drives — no external libraries, no claude.ai.
 *
 * The slide sources + image assets are NOT committed (they live in the private
 * Claude artifacts).  Point SRC at a folder holding, per deck:
 *     <srcSlides>/<id>.html     one <section> each
 *     <srcDeckJson>             deck.json (gives slide order)
 *     <srcDeckCss>              project/deck.css   (CSS decks only)
 *     <srcAssets>/<id>.<ext>    the /_blob/<id> images
 * and re-run `node scripts/build-slide-decks.mjs`.  See scripts/slides/README.md.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_ROOT = join(repoRoot, 'public', 'slides');

// Where the fetched Claude Slides sources live (override with SLIDES_SRC).
const SRC = process.env.SLIDES_SRC ||
  '/private/tmp/claude-501/-Users-c01joza-Library-Application-Support-Claude-scratch-workspaces-6286f6fe-71a5-4422-bc38-c8713ca0c0b6-c6149804-1603-4f93-b51f-04861a6d8cfc-scratch-2026-11-27-9208e8/1e16dfe9-6168-4dd4-8f18-c28732d5f0cc/scratchpad';

const ARTIFACTS = join(SRC, 'artifact-files');
const BUILD = join(SRC, 'slides-build');

const FONTS = {
  hackea: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Montserrat:ital,wght@0,400..800;1,400..800&family=Roboto+Mono:wght@400;700&display=swap',
  compas: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Kaushan+Script&family=Montserrat:ital,wght@0,400..800;1,400..800&display=swap',
};

const DECKS = [
  {
    slug: 'hackea-tu-software',
    lang: 'es',
    title: 'Hackea tu software',
    description: 'Taller práctico de fuzzing — ETSII, Universidad de Sevilla.',
    fonts: FONTS.hackea,
    artifactDir: join(ARTIFACTS, '0a2218ab-5319-4a08-b69d-579e5e5ba2a1', 'project'),
    assetsDir: join(BUILD, 'hackea-assets'),
    hasDeckCss: true,
  },
  {
    slug: 'compas-feature-focused-test-generation',
    lang: 'en',
    title: 'Compás: Feature-Focused Test Generation',
    description: 'Conference talk — ASE 2026, Munich.',
    fonts: FONTS.compas,
    artifactDir: join(ARTIFACTS, 'bdcc3b33-a9d2-4a39-8a19-d0ebac9efcc8', 'project'),
    assetsDir: join(BUILD, 'compas-assets'),
    hasDeckCss: false,
  },
];

function escapeSrcdoc(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function buildAssetMap(assetsDir) {
  const map = {};
  for (const name of readdirSync(assetsDir)) {
    const id = name.replace(/\.[^.]+$/, '');
    map[id] = name;
  }
  return map;
}

function transformSlide(html, { assetMap, isFirst, slug }) {
  let out = html;

  // 1. Drop speaker notes — they are presenter-only and must not be published.
  out = out.replace(/<aside>[\s\S]*?<\/aside>/g, '');

  // 2. Point /_blob/<id> at the local asset copy.
  out = out.replace(/\/_blob\/([a-f0-9]{32})/g, (m, id) => {
    if (!assetMap[id]) { console.warn(`  ! ${slug}: missing asset ${id}`); return m; }
    return 'assets/' + assetMap[id];
  });

  // 3. Inline-deck click steps -> fragment attributes the engine understands.
  out = out.replace(/\sdata-build-in="([a-z]+)\s+(\d+)(?:\s+[a-z]+)?"/g,
    (m, kind, idx) => ` data-fragment-index="${idx}" data-rbin="${kind}"`);
  out = out.replace(/\sdata-build-out="([a-z]+)\s+(\d+)"/g,
    (m, kind, idx) => ` data-rbout="${kind}" data-rbout-index="${idx}"`);

  // 4. Live <x-embed> mini-pages -> sandboxed iframes (keep position/size attrs).
  out = out.replace(/<x-embed\b([^>]*)>([\s\S]*?)<\/x-embed>/g,
    (m, attrs, inner) =>
      `<iframe class="rb-embed" scrolling="no" sandbox="allow-scripts"${attrs} srcdoc="${escapeSrcdoc(inner)}"></iframe>`);

  // 5. Tag the top <section> as a slide (merge with any existing class).
  const cls = 'rb-slide' + (isFirst ? ' rb-active' : '');
  if (/<section\b[^>]*\bclass="/.test(out)) {
    out = out.replace(/(<section\b[^>]*\bclass=")/, `$1${cls} `);
  } else {
    out = out.replace(/<section\b/, `<section class="${cls}"`);
  }

  // Safety: no script should survive outside an iframe srcdoc.
  const stray = out.replace(/srcdoc="[\s\S]*?"/g, '');
  if (/<script/i.test(stray)) console.warn(`  ! ${slug}: stray <script> outside an embed`);

  return out.trim();
}

function pageHtml(deck, sections) {
  const deckCssLink = deck.hasDeckCss ? '\n  <link rel="stylesheet" href="deck.css">' : '';
  return `<!doctype html>
<html lang="${deck.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${deck.title} — Pepe Zamudio</title>
  <meta name="description" content="${deck.description}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${deck.fonts}" rel="stylesheet">${deckCssLink}
  <link rel="stylesheet" href="../viewer.css">
</head>
<body>
  <div class="rb-stage">
    <div class="rb-deck" id="deck">
${sections}
    </div>
  </div>
  <div class="rb-progress"><i id="rb-bar"></i></div>
  <nav class="rb-ui" aria-label="Slide navigation">
    <button class="rb-btn rb-prev" type="button" aria-label="Previous slide">&#8249;</button>
    <div class="rb-count"><span id="rb-cur">1</span> / <span id="rb-total">0</span></div>
    <button class="rb-btn rb-next" type="button" aria-label="Next slide">&#8250;</button>
    <button class="rb-btn rb-full" type="button" aria-label="Toggle fullscreen">&#9974;</button>
  </nav>
  <div class="rb-hint">Use &#8592; &#8594; or swipe &middot; F for fullscreen</div>
  <noscript><p style="position:fixed;inset:0;display:grid;place-items:center;color:#cdd6d2;font:600 18px system-ui;text-align:center;padding:24px">This deck needs JavaScript to play.</p></noscript>
  <script src="../viewer.js"></script>
</body>
</html>
`;
}

function buildDeck(deck) {
  const order = JSON.parse(readFileSync(join(deck.artifactDir, 'deck.json'), 'utf8')).order;
  const assetMap = buildAssetMap(deck.assetsDir);
  const slidesDir = join(deck.artifactDir, 'slides');

  const sections = order.map((id, i) => {
    const file = join(slidesDir, id + '.html');
    if (!existsSync(file)) { console.warn(`  ! ${deck.slug}: missing slide ${id}`); return ''; }
    return transformSlide(readFileSync(file, 'utf8'), { assetMap, isFirst: i === 0, slug: deck.slug });
  }).filter(Boolean).join('\n');

  const outDir = join(OUT_ROOT, deck.slug);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(join(outDir, 'assets'), { recursive: true });

  for (const name of readdirSync(deck.assetsDir)) {
    copyFileSync(join(deck.assetsDir, name), join(outDir, 'assets', name));
  }
  if (deck.hasDeckCss) {
    copyFileSync(join(deck.artifactDir, 'deck.css'), join(outDir, 'deck.css'));
  }
  writeFileSync(join(outDir, 'index.html'), pageHtml(deck, sections));

  console.log(`  ✓ ${deck.slug}: ${order.length} slides, ${readdirSync(deck.assetsDir).length} assets`);
}

console.log('Building talk decks →', OUT_ROOT);
for (const deck of DECKS) buildDeck(deck);
console.log('Done.');

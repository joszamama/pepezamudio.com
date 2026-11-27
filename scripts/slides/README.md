# Talk decks (`/slides/`)

The decks served at `public/slides/<slug>/index.html` are the **official
self-contained HTML exports** of my Claude Slides decks — one file each, with
images and the slide renderer inlined (fonts load from Google Fonts, like the
rest of the site). They play with full fidelity and depend on nothing from
claude.ai at view time.

| Deck | Slug | Claude artifact |
| --- | --- | --- |
| Compás: Feature-Focused Test Generation (ASE 2026) | `compas-feature-focused-test-generation` | `https://claude.ai/artifact/QSMCX5Yb2nPJ7N3HG5GK6f` |
| Hackea tu software (workshop) | `hackea-tu-software` | `https://claude.ai/artifact/2FaLa8bU4o4QJNxB4Hbx8Y` |

The listing page is `src/pages/slides/index.astro` (+ the Spanish
`src/pages/es/slides/index.astro`), linked from the `Slides` nav entry.

## Speaker notes are stripped

The raw export keeps each slide's presenter notes in a `data-speaker-notes`
attribute (reachable from the viewer's notes view and visible in the page
source). Those are presenter-only, so they are removed before the file is
committed.

## Updating a deck

1. In Claude, open the deck and export it to HTML (Share → Export → HTML).
2. Strip the speaker notes and write it into place — from the repo root:

   ```sh
   node -e 'const fs=require("fs");
   const src=process.argv[1], dst=process.argv[2];
   let h=fs.readFileSync(src,"utf8").replace(/\sdata-speaker-notes="[^"]*"/g,"");
   fs.writeFileSync(dst,h);
   console.log("wrote",dst,(h.length/1048576).toFixed(2)+"MB");' \
     "/path/to/Exported Deck.html" \
     public/slides/<slug>/index.html
   ```

3. `npm run build`, then check `/slides/<slug>/` in a browser.

(If you want to keep the notes public, drop the `.replace(...)` call.)

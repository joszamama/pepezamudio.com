# Talk decks (`/slides/`)

The interactive decks served under `public/slides/<slug>/` are **generated** from
my Claude Slides decks by [`scripts/build-slide-decks.mjs`](../build-slide-decks.mjs).
Each one is a single standalone page driven by the shared runtime in
`public/slides/viewer.css` and `public/slides/viewer.js` — no external libraries,
nothing loaded from claude.ai at view time (fonts come from Google Fonts, like the
rest of the site).

## What's committed

- `public/slides/viewer.css`, `public/slides/viewer.js` — the shared deck viewer
  (fixed 1920×1080 canvas scaled to fit, step-through builds, keyboard / swipe /
  click navigation, deep links via `#<n>`, and polyfills for the `<x-shape>`,
  `<x-icon>`, `<x-connector>` and `<x-embed>` elements the slides use).
- `public/slides/<slug>/index.html` + `assets/` (+ `deck.css` for CSS decks) —
  the generated decks.
- `src/pages/slides/index.astro` + `src/pages/es/slides/index.astro` — the
  listing page linked from the nav.

Speaker notes (`<aside>` blocks) are **stripped** during the build — they are
presenter-only and not published.

## Source decks (not committed)

The raw slide files and image assets live in the private Claude artifacts, so they
are not in the repo:

| Deck | Slug | Claude artifact |
| --- | --- | --- |
| Compás: Feature-Focused Test Generation (ASE 2026) | `compas-feature-focused-test-generation` | `https://claude.ai/artifact/QSMCX5Yb2nPJ7N3HG5GK6f` |
| Hackea tu software (workshop) | `hackea-tu-software` | `https://claude.ai/artifact/2FaLa8bU4o4QJNxB4Hbx8Y` |

## Regenerating a deck

1. Fetch the deck's sources into one folder (this is what the build expects under
   `$SLIDES_SRC`, default: the folder the originals were pulled into):

   ```
   <SLIDES_SRC>/
     artifact-files/<artifact-id>/project/deck.json
     artifact-files/<artifact-id>/project/deck.css        # CSS decks only
     artifact-files/<artifact-id>/project/slides/<id>.html
     slides-build/<deck>-assets/<id>.<ext>                # the /_blob/<id> images
   ```

   (The slide `.html` files are read with the Claude Artifact tool's `read`; image
   assets are read one id at a time as `path`.)

2. Point the build at that folder and run it:

   ```
   SLIDES_SRC=/path/to/sources node scripts/build-slide-decks.mjs
   ```

   The artifact ids, asset folders and font links are configured in the `DECKS`
   array at the top of `scripts/build-slide-decks.mjs`.

3. `npm run build` and check `/slides/` and each `/slides/<slug>/`.

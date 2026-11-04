# Pepe Zamudio

Source for [pepezamudio.com](https://pepezamudio.com), a personal site for research, software, and writing. Built with [Astro](https://astro.build/) and deployed through GitHub Pages.

## Run locally

```sh
npm ci
npm run dev
```

Run `npm run build:pages` to build the static site as it appears on GitHub Pages.

## Edit content

- English blog posts are Markdown files in `src/content/posts/`; Spanish versions with matching filenames are in `src/content/posts-es/`.
- Publications, projects, contributions, and impact records are in `src/lib/data.js`.
- Talk locations and events are in `src/lib/talks.js`.
- Shareable paper PDFs are in `public/papers/`.
- Page layouts and components are in `src/pages/` and `src/components/`.
- English pages use the root URLs; Spanish pages live under `src/pages/es/` and are published at `/es/`. Keep both versions' page titles and descriptions updated when editing shared content.

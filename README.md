# GCP Professional Data Engineer Study Guide

Bilingual (English / Spanish) study platform for the **Google Cloud Professional Data Engineer** certification, built with Docusaurus.

## Local setup

```bash
npm install
```

## Running the site

### Bilingual preview (recommended)

```bash
npm run start
```

Builds both locales and serves the result on `http://localhost:3000` (also reachable from your LAN because the host is `0.0.0.0`). Use the globe icon in the navbar to switch between **English** and **Español**; the current page is preserved.

`npm run preview` is an alias for the same command.

### Development servers

Docusaurus can only compile **one locale at a time** in development. That is why the language switcher cannot work on a hot-reload dev server: the other locale's routes do not exist in that dev build. Use `npm run start` / `npm run preview` to test bilingual switching.

```bash
npm run dev       # English dev server on http://localhost:3000
npm run dev:es    # Spanish dev server on http://localhost:3001/es/
```

## Production build

```bash
npm run build
```

Generates `build/` (English) and `build/es/` (Spanish).

## Project structure

- `docs/` — English study content (22 documents)
- `i18n/es/docusaurus-plugin-content-docs/current/` — Spanish translations (same paths and doc IDs)
- `i18n/es/docusaurus-theme-classic/` — navbar, footer, and theme translations
- `i18n/es/code.json` — Spanish UI strings
- `sidebars.js` — curriculum sidebar
- `src/pages/index.js` — bilingual homepage

## Translation conventions

- Lesson prose, headings, tables, and practice explanations are translated.
- Code blocks (SQL, Python, Bash, JSON, Mermaid) are kept exactly as written.
- Google Cloud product names, tool names, roles, and technical identifiers stay in English.

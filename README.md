# Ahmad Azimi — Engineering Console

A multi-page personal portfolio site with an "Engineering Console" design language:
dark GitHub-inspired palette, IDE-style navigation, monospace metadata, and a small
site-navigation console widget. Static-site friendly — no backend, no database, no CMS.

## Stack

- **React 19** + **TypeScript** (strict) + **Vite**
- **Material UI** theming (`src/app/theme.ts`) with design tokens mirrored in `src/styles/global.css`
- **React Router** with route-level code splitting (`src/app/router.tsx`)
- **Lucide React** icons (GitHub/LinkedIn marks are inlined SVGs)
- Local **Inter** + **JetBrains Mono** via Fontsource (no external font requests)
- Structured TypeScript content models (`src/data/*`), no markdown dependency required

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check (`tsc -b`) + production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Strict TypeScript check only |
| `npm run lint` | ESLint over the whole project |
| `npm test` | Headless-Chrome smoke test: every route, filters, navigation, résumé PDF, console widget, mobile drawer, 404, internal links, console errors |
| `npm run test:visual` | Rendering checks: design tokens, fonts, sticky header, keyboard skip link, print styles, asset resolution |
| `npm run resume:pdf` | Regenerates `public/assets/resume.pdf` from the production build (requires Chrome) |

`npm test` and `npm run test:visual` need a Chrome/Chromium binary. They use
`/usr/bin/google-chrome` by default; override with `CHROME_PATH=/path/to/chrome`.

## Content editing

All copy lives in `src/data/` — presentation components never hardcode text:

| File | Contains |
| --- | --- |
| `site.ts` | Identity, navigation, hero/approach/CTA copy, about narrative, **contact channels** |
| `skills.ts` | Capability cards (homepage) + skill groups (About/résumé) |
| `experience.ts` | Verified employment timeline (add older roles here) |
| `projects.ts` | Project index, categories, and full case-study content blocks |
| `notes.ts` | Engineering note topics (currently marked drafts) |
| `types.ts` | Shared typed models |

### Placeholders to fill before publishing

1. **Email** and **LinkedIn** — `contactChannels` in `src/data/site.ts`. They currently render
   as clearly marked placeholders (not clickable). Set a real `href` and the card becomes a
   working link automatically.
2. **Education, languages, certifications, earlier employment** — `resumePlaceholders` in
   `src/data/site.ts` marks these sections as awaiting verified information; replace them with
   real records when available.
3. **`site.baseUrl`** — set to the production origin (e.g. `https://example.com`) if you want
   absolute URLs anywhere; `og:image` can then be added in `index.html` (there is no image
   asset today, on purpose — no fabricated branding).
4. **Note publication dates** — `notes.ts` entries are drafts with `publishedOn: null`; fill in
   real dates only when an article actually exists.

Verified facts already baked in: GitHub profile `github.com/aziimii`, the Sherafat project
stack (checked against the repository), and the Ghasdak Peyk Shahr role as supplied.

## Running the résumé PDF

```bash
npm run build && npm run resume:pdf
```

This serves `dist/`, opens `/resume` in headless Chrome with **print media** applied
(navigation hidden, monochrome text), writes `public/assets/resume.pdf`, and copies it into
`dist/assets/resume.pdf`. The résumé page checks for the file at runtime and only renders the
download button when the asset actually exists. Re-run this after any change to résumé content.

## Deployment (static hosting)

The build output is a plain static site in `dist/`. Because the site is a single-page app,
the host must serve `index.html` for unknown paths so deep links like
`/projects/sherafat-gold-platform` work on refresh.

**Already included:**

- `public/_redirects` → `/* /index.html 200` (Netlify, Cloudflare Pages)
- `public/404.html` → SPA fallback for hosts that serve a custom 404 page (GitHub Pages)

**Generic static host / S3 / any server:** upload everything in `dist/` and configure a
rewrite of unknown paths to `/index.html`.

**Nginx:**

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/portfolio/dist;
    index index.html;

    # hashed build assets: cache aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback so deep links survive a refresh
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**GitHub Pages:** `404.html` handles the fallback, but note it briefly rewrites the URL
through the shell. Any rewrite-rule host (Netlify, Vercel, Cloudflare Pages, nginx) is the
smoother option.

No domain name is assumed anywhere in the configuration.

## Project structure

```
src/
  main.tsx              # app entry: fonts, theme, router
  app/
    router.tsx          # routes + lazy-loaded pages
    theme.ts            # MUI theme / design tokens
  components/
    layout/             # AppLayout (shell), Footer
    navigation/         # IDE-style responsive TopNav
    projects/           # ProjectCard, ProjectFilters
    terminal/           # site-navigation console widget
    common/             # PageHeader, ContentBlocks, TagList, Stack, AppIcon
  pages/                # Home, About, Projects, ProjectDetails, Resume, Notes,
                        # NoteDetails, Contact, NotFound
  data/                 # all editable content (typed)
  hooks/                # useDocumentTitle, scroll/reduced-motion
  styles/               # global tokens, print styles
scripts/
  smoke.mjs             # end-to-end smoke test
  visual-check.mjs      # rendering/print verification
  generate-resume-pdf.mjs
public/
  assets/resume.pdf     # generated, text-based, ATS-friendly
  favicon.svg, site.webmanifest, 404.html, _redirects
```

## Quality notes

- Semantic landmarks (`header`/`main`/`footer`/`nav`), skip link, visible focus rings,
  accessible names on every control, `aria-current` active route, `lang="en"`.
- Unique `<h1>` per page, unique document titles and meta descriptions per route,
  Open Graph/Twitter tags updated per route.
- `prefers-reduced-motion` disables animation globally.
- Print CSS strips navigation, backgrounds, and decorative colour for a clean résumé PDF.
- No fabricated metrics, customers, repositories, or contact details anywhere in the content.
# aziimii.ir

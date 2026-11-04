# Handoff — Peichi Lin Portfolio (v2)

Quick brief so a fresh session (or a new account) can continue. The code, git
history, and media are all on disk at `/Users/peichi/Claude/Portfolio` and
pushed to GitHub `peiii7/portfolio` (branch `main`).

## Stack
- React 18 + Vite + TypeScript, Tailwind v4 (`@tailwindcss/vite`), React Router v6.
- framer-motion; GSAP 3 (ScrollTrigger, Draggable, InertiaPlugin, SplitText).
- Dev server: `npm run dev` (port 5173, see `.claude/launch.json` → `portfolio-vite`).
  Build: `npm run build` → `dist/`. Figma file key `jp87CiDbsjx7MViAzzRWFr`.
- Deploy: Vercel, config in `vercel.json` (Vite + SPA rewrite). A password gate
  lives in `password.html` + `middleware.js` + `api/auth.js` (keeps the site
  out of search while unfinished). Confirm the repo is linked in the Vercel
  dashboard so pushes to `main` auto-deploy.

## Routes / pages (`src/pages`)
- `Home.tsx` → `HomeCarousel.tsx`: diagonal "bulge" carousel of the 4 projects.
  Click the centred card to open it; "Selected Works" watermark sits behind the
  cards in 3D.
- `About.tsx`: scaled 1440 hero canvas, draggable photo (grab cursor on hover),
  fade-in, "what shapes me" black→white one-way latch, matcha coffee CTA.
- `Playground.tsx`: scattered dithered stickers (draggable, inertia+snap), scroll
  white→black transition on the 2nd screen, detail modal (video/YouTube hero +
  3-image showcase, zh/en copy).
- `CaseStudy.tsx` (`/work/:slug`): left anchor nav w/ scroll-spy; outcome figs
  and hero support images, video (.mp4/.webm/.mov) and `{ en, zh }` lang pairs.

## Data (`src/data`)
- `projects.ts` — 4 home projects (slugs: fubon-life, ctbc-bank,
  tea-island-tea-stories, xnfun-app). `caseStudies.ts` — long-form case studies.
  `playground.ts` — 5 playground works, each with `zh` copy + `gallery`.

## Media
- Framer-hash images live in `images/` (imported in data files).
- Fubon/CTBC case-study video+images in `public/case/{fubon,ctbc}/` (referenced
  by `/case/...` path strings). Fubon hero = video; CTBC O1 uses zh/en `.webm`.
- To pull a project's media from Framer: open
  `https://peichidesign.framer.website/work/<slug>`, grab images/video in order,
  map to the matching outcome/showcase slots.

## Custom cursor (`src/components/HoverCursor.tsx`)
- Global glowing spin cursor (cyan `#BEF3FE`). `useHoverCursor()(name, theme, color)`
  shows a name pill on hover (home cards, playground stickers, pager, Contact me).
- `/work/*` uses the native cursor. `useCursorSuppress()(true/false)` hides the
  spin cursor to show a native cursor (used by the draggable About photo = grab).

## Done
- All 4 case studies + 4/5 playground works have real media.
- Modal aligned to Figma 303-1040; grid fills any width; home click fixed;
  About fade-in + grab cursor; Contact me hover feedback + "Let's go!" cursor.

## TODO
- **裙子底下有… (Under the Skirt)** playground work still on a placeholder — needs media.
- `public/case/fubon/o1.mov` is 23 MB — compress to webm/mp4.
- Case study / About English copy is partial in places.
- Optional: squash git history to a single v2 commit (destructive force-push).
- Mobile: vertical-stack layouts for the scaled 1440 canvases could be refined.

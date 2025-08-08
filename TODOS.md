## BelajarShalatApp — Step-by-Step Implementation Plan (TODOS)

This plan is sequenced, incremental, and Windows PowerShell friendly. Complete phases in order; each phase has a clear definition of done (DoD).

Conventions
- Package manager: npm (Node 18+)
- Paths use forward slashes; all paths relative to project root

---

## Phase 0 — Project bootstrap

- [x] Ensure Node.js 18+ is installed
- [x] Initialize repository and Vite React + TS scaffold

```powershell
npm create vite@latest . -- --template react-ts
npm install
git init
git add -A
git commit -m "chore: scaffold Vite React TS"
```

DoD
- [x] App runs locally at `http://localhost:5173`

---

## Phase 1 — Base dependencies and structure

- [x] Install core deps

```powershell
npm install react-router-dom classnames react-swipeable
npm install -D vite-plugin-pwa workbox-window
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier
```

- [ ] Create base directories

```text
src/
  assets/
  components/
  data/
  pages/
  routes/
  state/
  styles/
  utils/
  sw/
public/
  illustrations/
  icons/
```

DoD
- [x] Repo contains the directories above and dependencies installed

---

## Phase 2 — Styling foundation

- [x] Add global styles and CSS variables

Create `src/styles/global.css` with base typography, layout, and variables. Wire into `src/main.tsx`:

```ts
import "./styles/global.css";
```

- [ ] Implement dark mode variables and `data-theme="dark"` support on `html`

DoD
- [x] Visible base typography and light/dark theming via toggling `data-theme`

---

## Phase 3 — Routing and App shell

- [ ] Create `src/routes/index.tsx` with React Router setup
- [ ] Create pages: `HomePage`, `SlidePage`, `SettingsPage`
- [ ] Update `src/App.tsx` to provide layout and router outlet
- [ ] Add header with app title and theme toggle placeholder

DoD
- [ ] Navigating between `/`, `/slides/sample`, `/settings` works

---

## Phase 4 — Data model and sample content

- [ ] Define content types in `src/utils/contentTypes.ts`
  - `ContentItem`, `ContentVariation`, `Penjelasan`
- [ ] Add `src/data/toc.json` (order of slides)
- [ ] Add `src/data/bacaan/` with sample JSON (e.g., `ruku_1.json`)
- [ ] Implement loader helpers in `src/utils/contentLoader.ts`
  - load TOC
  - load content by id

DoD
- [ ] `SlidePage` can load and render sample content id from route

---

## Phase 5 — Preferences state (Context)

- [ ] Implement `src/state/PreferencesContext.tsx`
  - state: `showArab`, `showLatin`, `showTerjemahan`, `fontSize: 'small'|'medium'|'large'`, `defaultVariation: 'pendek'|'panjang'`, `theme: 'light'|'dark'|'system'`
  - reducer + actions
  - persistence: hydrate from `localStorage`, debounce writes
- [ ] Provide context at `App` root

DoD
- [ ] Values persist across reloads and drive UI toggles

---

## Phase 6 — Core UI components

- [ ] `components/Slide.tsx` — renders fields conditionally and handles variation selection
- [ ] `components/ToggleGroup.tsx` — show/hide Arab/Latin/Terjemahan
- [ ] `components/FontSizePicker.tsx`
- [ ] `components/CategoryChips.tsx`
- [ ] `components/Illustration.tsx` — responsive image with lazy loading
- [ ] `components/InfoPanel.tsx` — expandable penjelasan + dalil
- [ ] `components/NavControls.tsx` — prev/next buttons

DoD
- [ ] Slide shows correct fields based on preferences; navigation buttons work

---

## Phase 7 — Slide navigation & gestures

- [ ] Use `react-swipeable` in `SlidePage` to support left/right swipe
- [ ] Keyboard left/right support for desktop
- [ ] Keep URL in sync with current slide id

DoD
- [ ] Swipe and keyboard navigate between slides; direct link to `/slides/:id` works

---

## Phase 8 — PWA (manifest + service worker)

- [ ] Create `public/manifest.webmanifest` with app name, colors, start_url, display, icons
- [ ] Add icons in `public/icons/` (192, 512, maskable)
- [ ] Configure `vite-plugin-pwa` in `vite.config.ts` using `injectManifest` or `generateSW`
  - Precache app shell (HTML, JS, CSS)
  - Precache `src/data/**` JSON and `public/illustrations/**`
  - Runtime caching: Cache First for images; Stale-While-Revalidate or Cache First for JSON
- [ ] Register SW using `workbox-window` in `src/main.tsx`; show in-app update prompt when a new SW is ready

Example (PowerShell, install icons tool optional):
```powershell
# if you want to generate PWA icons from a source PNG
npm install -D pwa-asset-generator
npx pwa-asset-generator .\public\icons\source.png .\public\icons --background "#ffffff" --type png
```

DoD
- [ ] Installable PWA; offline after first load; update prompt appears on new build

---

## Phase 9 — Content & assets preparation

- [ ] Populate real JSON content for the full prayer sequence
- [ ] Place illustrations in `public/illustrations/` (webp/png), compressed
- [ ] Maintain cache size within ~10–20MB
- [ ] Add a small script or documented command to compress images

Example compression via `squoosh-cli` (optional):
```powershell
npm install -D @squoosh/cli
npx squoosh-cli --webp auto -d .\public\illustrations .\public\illustrations\*.png
```

DoD
- [ ] All content present; app works fully offline with acceptable cache size

---

## Phase 10 — Settings and Home enhancements

- [ ] Home: Start button (first slide), TOC list, quick toggles
- [ ] Settings: full controls for toggles, font size, default variation, theme
- [ ] Category filter (optional) in TOC

DoD
- [ ] Users can control all preferences and navigate quickly to any slide

---

## Phase 11 — Accessibility and RTL correctness

- [ ] Ensure Arabic blocks render with `dir="rtl"`; Indonesian remains `ltr`
- [ ] Semantic roles and keyboard navigation for toggles and panels
- [ ] Contrast and font-size scale meet WCAG AA

DoD
- [ ] Basic screen reader flow works; Arabic text direction and selection are correct

---

## Phase 12 — Performance and quality

- [ ] Route-level code splitting and lazy imports
- [ ] Preload critical fonts or prefer system font stack
- [ ] Avoid unnecessary re-renders; memoize where beneficial
- [ ] Optimize images (responsive sizes if needed)

DoD
- [ ] Lighthouse PWA score 90+, performance 90+ on mid-range device

---

## Phase 13 — Testing

- [ ] Unit tests: `Slide`, `ToggleGroup`, `PreferencesContext`
- [ ] Integration tests: routing and preference persistence
- [ ] Optional e2e with Playwright: navigation, offline behavior, update prompt

PowerShell test scripts
```powershell
"test": "vitest --environment=jsdom",
"test:ui": "vitest --ui --environment=jsdom",
```

DoD
- [ ] Test suite passes locally; key flows covered

---

## Phase 14 — Deployment

- [ ] Add SPA fallback on host (Vercel/Netlify config)
- [ ] Build and deploy

```powershell
npm run build
# Vercel
npx vercel --prod
# or Netlify
npx netlify deploy --dir=dist --prod
```

DoD
- [ ] Deployed URL works online and as installable PWA; offline verified

---

## Phase 15 — Release checklist

- [ ] All critical content present and proofread
- [ ] Cache behaviors verified after version bump and update prompt
- [ ] Works on Android Chrome and desktop Chrome/Edge; iOS Safari basic support
- [ ] README updated with usage, offline notes, and attribution if any

---

## Backlog / Nice-to-haves

- [ ] IndexedDB store for content versioning
- [ ] In-app search across bacaan
- [ ] Print-friendly layout for slides
- [ ] Optional content packs (e.g., additional variations)



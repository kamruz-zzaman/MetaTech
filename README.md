# MetaTech

A responsive marketing site built from a Figma design for the "Senior Frontend Engineer" technical assessment — React frontend, Express backend, no CMS, no database, content served as static JSON.

The backend lives in a separate sibling repository: **[MetaTech-Server](https://github.com/kamruz-zzaman/MetaTech-Server)**.

## Tech stack

**Frontend**

- React 19 + Vite, React Compiler (`babel-plugin-react-compiler`) enabled
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Plain JavaScript (no TypeScript) — see [Assumptions](#assumptions)
- React Context for state management (see [Architecture](#architecture) below)

**Backend**

- Node.js + Express, static JSON responses — see the [server README](https://github.com/kamruz-zzaman/MetaTech-Server) for details

## Setup

You need both repos running — the frontend fetches all of its content from the backend on load; nothing is hardcoded.

```bash
# 1. Backend
git clone https://github.com/kamruz-zzaman/MetaTech-Mock-Backend.git
cd MetaTech-Server
npm install
npm run dev              # http://localhost:4000

# 2. Frontend (separate terminal)
git clone https://github.com/kamruz-zzaman/MetaTech.git
cd MetaTech
pnpm install              # or npm/yarn
pnpm dev                  # http://localhost:5173
```

The frontend reads its API base URL from `VITE_API_BASE_URL`, defaulting to `http://localhost:4000/api` if unset — no `.env` needed for local dev against the default backend port.

Other scripts: `pnpm build` (production build), `pnpm preview` (serve the build locally), `pnpm lint`.

## Architecture

Every section of the page is its own component under `src/sections/`, each independently fetching its own slice of content and rendering its own loading/error state — a slow or failed request in one section never blocks the others.

- **`SiteDataProvider`** (`src/context/SiteDataContext.jsx`) fires all 8 section requests in parallel on mount and stores each as `{ status, data, error }`.
- **`useSection(key)`** (`src/hooks/useSection.js`) is how a component reads its slice — e.g. `useSection("home")` in Hero.jsx.
- **`src/api/client.js`** is the one place that knows the API base URL and does the actual `fetch`.

This is the project's use of **React Context**: not for a single global blob of state, but as the seam between "one fetch per section" and "many components," so no section component needs to know how or when data is fetched — only how to render its own `status`.

Local interactive state (the Solutions tab switcher, the Showcase carousel index, the mobile nav toggle) is plain `useState` in the component that owns it — lifting that into Context would've been unnecessary indirection for state nothing else needs.

## Project structure

```
src/
  api/client.js              fetch wrapper, reads VITE_API_BASE_URL
  context/                   SiteDataContext (provider) + siteDataContext (the context object)
  hooks/useSection.js        the hook every section uses to read its data
  components/                Container, HighlightedText, LoadingState, ErrorState — shared across sections
  sections/                  one component per page section (Header, Hero, TrustedBy, WeAre, Solutions,
                             Values, Showcase, TechStack, Footer), each: fetch → loading/error → render
  assets/                    images, logos, and the hand-picked SVG vectors used as CSS masks
  index.css                  Tailwind import, design tokens (@theme), and the few effects that need
                             real CSS (marquee keyframes, gradient wordmark mask, notch mask)
```

Path alias: `@/` maps to `src/` (configured in `vite.config.js` + `jsconfig.json`) — e.g. `@/components/Container.jsx` instead of `../../components/Container.jsx`.

## Assumptions

Called out here rather than silently guessed, since a few real content/design gaps came up against the actual Figma file:

- **Solutions tabs 2 & 3** ("Custom Software", "Tech Staffing"): the Figma file only has real copy for the first tab ("Data + AI"). The other two tabs' heading/description are placeholder copy I wrote in the same voice — the tab-switching mechanism itself is fully real and functional.
- **Showcase carousel**: only one real product mockup exists in the design (AmICredible). The carousel supports N slides properly (sliding animation, dot navigation, autoplay), but the other two slides are placeholder products (PulseMetrics, LedgerFlow) reusing the same device screenshot, since no other mockup image exists to show.
- **Mobile vs. desktop content order**: two spots (the Trusted-by logo grid, and the Footer's social links) have the _same_ items in a genuinely different order between the Figma mobile and desktop frames. Rather than hardcode two orderings for identical content, I kept one canonical order and let it reflow responsively.
- **Values cards**: desktop shows card titles only (no body copy exists in that frame at all); mobile shows title + a full description. That's not a bug — it's what the Figma file actually contains at each breakpoint, replicated as-is.
- **Hero image notch**: the cutout at the top of the hero image is a real vector shape (an SVG boolean subtract) in Figma, reproduced here via a CSS `mask-image` using the actual exported SVG rather than an approximation.

## Future improvements

- TypeScript — the assessment calls out "proper TypeScript typing" under code quality; this was a deliberate scope/time tradeoff (see conversation with reviewer), not an oversight.
- Unit tests (React Testing Library) for the interactive components — Solutions tabs, Showcase carousel, mobile nav.
- Real distinct product screenshots for Showcase slides 2 and 3.
- Deploy both repos (Vercel for the frontend, Render/Railway for the API) and point `VITE_API_BASE_URL` at the live backend.
- Basic e2e smoke test (Playwright) covering the golden path across both breakpoints.

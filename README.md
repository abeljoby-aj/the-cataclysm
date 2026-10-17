# THE CATACLYSM — official site (OxCode)

Next.js 16 + TypeScript + React Three Fiber. Statically exported.

## Commands (Node >= 20.9)

    npm install
    npm run dev        # http://localhost:3000
    npm run typecheck
    npm run build      # static site in out/
    npm start          # serves out/ locally (npx serve)

## Deploy (Cloudflare Pages)

Build command `npm run build`, output directory `out`.

## Structure

- `config/event.ts` — all event facts, prize pool, schedule, contacts, map, registration URL, challenge domains (single source of truth).
- `config/experience.ts` — quality tiers (high/low), palette, effect knobs.
- `lib/shaders.ts`, `lib/geometry.ts` — procedural GLSL and geometry.
- `lib/stage.ts` — opening-sequence timeline and click pulse.
- `components/experience/` — 3D scene; `components/sections/` — page sections; `components/interface/` — nav, countdown, registration link.

## Notes

- Mobile/low-power devices use the low tier (no post-processing, fewer particles).
- `prefers-reduced-motion` skips the intro; without WebGL a CSS fallback is shown. `?webgl=off` forces the fallback.
- Challenge domains are tentative and labelled as expected.
- Artwork is original and not affiliated with Marvel or Disney.

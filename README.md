# THE CATACLYSM — official site (OxCode)

Next.js 16 + TypeScript + React Three Fiber. Statically exported.

## Commands (Node >= 20.9)

    npm install
    npm run dev        # http://localhost:3000
    npm run typecheck
    npm run build      # static site in out/
    npm start          # serves out/ locally (npx serve)

## Browser testing (Playwright)

One-time browser installation after `npm install`:

    npx playwright install chromium

Run browser tests:

    npm run test:e2e          # builds production export, then tests
    npm run test:e2e:built    # tests an existing, current out/ export
    npm run test:e2e:ui       # interactive test runner; build first
    npm run test:e2e:report   # opens the most recent HTML report

`playwright.config.ts` starts and stops a local static server on `127.0.0.1:4175`. Tests cover six Chromium viewport configurations (1366×768, 1920×1080, 768×1024, 390×844, 360×800, and 844×390), prize/sponsor content, loaded logos, navigation, overflow, the team calculator, the KonfHub link destination, and the prize FAQ. Responsive content tests use reduced motion and the WebGL fallback. The full WebGL opening is checked once on desktop. External KonfHub checkout is not exercised.

Screenshots are saved under `test-results/`; failed tests retain traces. The HTML report is written to `playwright-report/`. These generated files are ignored by Git. On PowerShell installations that block `npm.ps1`, use `npm.cmd` and `npx.cmd` for the commands above.

## Deploy (Cloudflare Pages)

Build command `npm run build`, output directory `out`.

## Structure

- `config/event.ts` — all event facts, ₹30,000 cash prize pool, ₹60,000–₹70,000 estimated additional sponsor benefits, sponsors/reward breakdowns, schedule, contacts, map, registration URL, challenge domains (single source of truth).
- `config/experience.ts` — quality tiers (high/low), palette, effect knobs.
- `lib/shaders.ts`, `lib/geometry.ts` — procedural GLSL and geometry.
- `lib/stage.ts` — opening-sequence timeline and click pulse.
- `components/experience/` — 3D scene; `components/sections/` — page sections; `components/interface/` — nav, countdown, registration link.

## Notes

- Mobile/low-power devices use the low tier (no post-processing, fewer particles).
- `prefers-reduced-motion` skips the intro; without WebGL a CSS fallback is shown. `?webgl=off` forces the fallback.
- Challenge domains are tentative and labelled as expected.
- Artwork is original and not affiliated with Marvel or Disney.
- Prizes and sponsor sections appear directly after the hero/ticker. CyberDefenders and ThunderCipher logos are stored in `public/assets/sponsors/`; the CyberDefenders artwork was exported from the supplied PSD. Sponsor benefits include Pro access, TC-VAPT exam vouchers, and participant discounts, and are labelled separately from cash prizes.
- Rewards are grouped by recipient, without sponsor attribution: one free TC-VAPT voucher per member of the top 3 teams (12 vouchers total across all three teams), one Pro training subscription per top-three team for its highest-scoring member (3, 2, and 1 months respectively), and 66% off the TC-VAPT exam for all registered participants. Sponsor names and logos appear only in Our Sponsors; the home-page rewards badge has been removed.

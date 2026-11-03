# THE CATACLYSM — CURRENT PROJECT CONTEXT AND CREATIVE BRIEF

Last updated: 3 November 2026 (Asia/Kolkata).

## CURRENT IMPLEMENTATION — READ FIRST

This repository already contains a multi-file Next.js application. Work from the current implementation and the user's requested scope. The creative brief below records the original ambition; its exploratory effects and proposed components are not claims about implemented functionality or instructions to restart the project on every task.

This update reflects local source files, not independent verification of organizer information or the live deployment. `config/event.ts` is the application's source of truth for event content. Keep this document aligned with that file when facts change.

### Stack and commands

- Node.js >=20.9; npm with `package-lock.json`.
- Declared dependency ranges: Next.js ^16.4.2, React/React DOM ^19.3.1, Three.js ^0.186.1, React Three Fiber ^9.8.2, Drei ^10.7.9, React Three Postprocessing ^3.2.0, Postprocessing ^6.39.5, GSAP ^3.15.0, and TypeScript ^5.9.3. The lockfile records resolved versions.
- `npm install` installs dependencies; `npm run dev` starts Next.js development; `npm run typecheck` runs TypeScript; `npm run build` exports the site to `out/`; `npm start` serves that export through `npx serve out`.
- Browser QA uses `@playwright/test` with Chromium and `http-server`. Run `npx playwright install chromium` once, then `npm run test:e2e` to build and test, or `npm run test:e2e:built` for an existing current export. `npm run test:e2e:ui` opens the interactive runner; `npm run test:e2e:report` opens the HTML report. The test server uses `127.0.0.1:4175` and stops after the run. In restricted Windows agent environments, the runner may need elevated process access to clean up its server; this is separate from browser installation.
- Before writing application code, follow `AGENTS.md` and read the relevant installed guides in `node_modules/next/dist/docs/`.

### Actual structure

| Location | Responsibility |
| --- | --- |
| `app/page.tsx` | Single-page section composition and skip link |
| `app/layout.tsx` | Metadata, viewport, fonts, global CSS, and no-JavaScript title visibility |
| `app/not-found.tsx` | Themed 404 with a home link |
| `app/globals.css` | Shared design tokens, section styles, responsive rules, and reduced-motion CSS |
| `components/sections/` | OpeningSequence, Ticker, PrizePool, Sponsors, ChallengeDomains, EventDetails, Schedule, RegistrationSection, Venue, Faq, Contact, Footer |
| `components/interface/` | Navigation, Countdown, RegistrationLink, and GSAP Reveal wrapper |
| `components/experience/` | ExperienceRoot, WorldCanvas, DimensionalBreach, ArmoredSilhouette, DebrisField, Atmosphere |
| `config/event.ts` | Event facts, cash prize pool, estimated sponsor benefits, sponsors, reward breakdowns, schedule, FAQs, contacts, challenge domains, map, branding, and registration URL |
| `config/experience.ts` | Graphics quality tiers, palette, and effect settings |
| `hooks/useDeviceProfile.ts` | WebGL detection, reduced-motion preference, and initial device quality selection |
| `lib/geometry.ts`, `lib/shaders.ts` | Procedural meshes, scratch texture, membrane and light-shaft shaders |
| `lib/stage.ts` | Shared scene state, intro timeline, and click pulses |
| `lib/time.ts`, `lib/random.ts` | IST formatting, event phases/countdown helpers, and seeded randomness |
| `public/assets/branding/` | OxCode and Multimedia Club JPG logos; `app/icon.jpg` supplies the app icon |
| `public/assets/sponsors/` | AMT PNG with tagline exported from the supplied PDF, CyberDefenders PNG exported from the supplied PSD, and ThunderCipher PNG from the supplied JPEG |
| `next.config.ts` | Static export, unoptimized images, strict mode, and Three.js transpilation |
| `wrangler.jsonc`, `src/index.ts` | Cloudflare Worker/static assets configuration and legacy-host redirect |
| `playwright.config.ts`, `tests/e2e/website.spec.ts` | Chromium viewport projects, production-export test server, browser checks, screenshots, and failure traces |

`node_modules/`, `.next/`, and `out/` are dependency/build output directories, not authored application source.

### Current design and page flow

The design uses near-black (`#050706`), emerald (`#35e08a`), gunmetal, muted green-gray, and pale core highlights. Syne supplies display typography, Manrope body text, and IBM Plex Mono technical labels. Metallic gradient titles, clipped-corner buttons, fine borders, technical grids, and oversized outline watermarks carry the visual identity.

The page order is: fixed navigation → opening hero → ticker → prizes and rewards → sponsors → expected challenge domains → event details/countdown → schedule → registration → venue/map → FAQ → contacts → footer. Navigation uses in-page anchors, including direct prize and sponsor links retained on narrow layouts.

Prizes and rewards use a warm gold accent (`#f2cd84`) to stand out from the emerald visual system. The prize section separates the ₹30,000 cash pool from ₹60,000–₹70,000 estimated additional non-cash rewards and discounts. It groups rewards by recipient: the top 3 teams and all registered participants. Our Sponsors features AMT as the main cash sponsor in a larger gold-bordered panel with its original logo/tagline on white, the supplied company description, and acknowledgment of its support for the cash pool. CyberDefenders and ThunderCipher remain in smaller name/logo cards below. The home section has no AMT badge, as requested. The former home-page rewards badge and sponsor ticker entries remain removed.

The hero contains a procedural fractured metallic aperture, an animated emerald shader membrane, a distant armored mask silhouette, instanced debris, dust, fog, and light shafts. High quality adds bloom, flash-driven chromatic aberration, noise, and vignette. The backdrop uses original geometry rather than a supplied character model.

Current interactions include a staged letter reveal, pointer camera parallax, scroll-based camera depth, pointer repulsion of debris, click/tap energy pulses, scroll-triggered section reveals, decorative domain hover effects, a 3/4-member fee calculator, native FAQ disclosures, telephone links, map links, and a phase-aware countdown. The intro stages are `dormant`, `awakening`, `breach`, `revelation`, and `exploration`. No audio system, custom cursor, or object-inspection UI is currently implemented.

### Graphics and accessibility behavior

| Setting | High | Low |
| --- | --- | --- |
| Device pixel ratio | 1–1.75 | 1–1.25 |
| Debris count | 120 | 48 |
| Dust count | 700 | 220 |
| Ring segments | 22 | 14 |
| Postprocessing / antialiasing | Enabled / enabled | Disabled / disabled |

The initial low tier is selected below 768px width or when reported CPU concurrency or device memory is <=4. Quality selection is not a continuous frame-rate adaptation system. The hero stops its render loop when outside the viewport. Reduced motion skips the intro and uses demand rendering; CSS disables animation/transitions and smooth scrolling. A CSS ring/glow fallback remains underneath the dynamically loaded canvas; `?webgl=off` forces that fallback.

Semantic sections, a skip link, visible focus styles, accessible labels, and essential HTML text are implemented. These source-level provisions still require browser validation.

### Registration: implemented behavior and outstanding requirement

The hero and navigation link to `#register`. The registration section's `RegistrationLink.tsx` opens the configured KonfHub URL in a new tab with `noopener noreferrer`. The calculator displays ₹1,200 for three members or ₹1,600 for four members as indicative totals.

The original brief's KonfHub widget requirement below remains outstanding: the current application does not load `https://widget.konfhub.com/widget.js` or instantiate button `btn_6fe625c090da`. Preserve this distinction when reporting implementation status. KonfHub handles registration and payments; there is no local registration form, backend, database, or payment system.

### Hosting and verification status

The site uses Next.js static export. The README documents Cloudflare Pages with build command `npm run build` and output directory `out`. The repository also includes a Cloudflare Worker named `the-cataclysm` serving `out/` through the `ASSETS` binding with `run_worker_first: true`. Its code returns a 301 redirect from `the-cataclysm.abeljobyaj.workers.dev` to `https://oxcode.org`, preserving path and query; other hosts use the asset binding. This describes repository configuration, not verified live routing.

The sponsor/prize update passed TypeScript checks and the production static-export build. The build required network access to download the existing Google Fonts. Playwright was subsequently installed and configured: 13 browser tests passed across six viewport configurations (1366×768, 1920×1080, 768×1024, 390×844, 360×800, and 844×390). Five duplicate WebGL checks are intentionally skipped; the full WebGL opening is tested once on desktop. The run completed successfully with process access outside the restricted Windows sandbox.

Browser checks verify prize/sponsor content, loaded logos, anchor navigation, content bounds/overflow, the team calculator, KonfHub link destination, the prize FAQ, and an error-free desktop WebGL title reveal. Desktop and mobile prize/sponsor screenshots were visually inspected. Responsive content checks use reduced motion and `?webgl=off`; they do not establish full mobile WebGL performance. Screenshots are stored in ignored `test-results/`, with the HTML report in ignored `playwright-report/`. Live KonfHub checkout and live deployment routing remain untested.

---

## ROLE: AN EXPERIMENTAL DIGITAL EXPERIENCE STUDIO

You are an elite creative technology studio hired to maintain and develop the official digital experience for **THE CATACLYSM**, an inter-college cybersecurity Capture the Flag (CTF) competition organized by OxCode × Multimedia Club.

You are simultaneously:

- An experimental digital art director.
- A world-class creative developer.
- A senior WebGL and Three.js engineer.
- A procedural graphics and shader specialist.
- A cinematic motion designer.
- A technical artist experienced in 3D environments, lighting, materials, particles, and environmental storytelling.
- A game-interface designer.
- A frontend architect.
- A performance engineer.
- A quality assurance engineer who inspects and tests the actual result.

Your assignment is to create an extraordinary interactive website that combines the scale of a cinematic superhero event, the atmosphere of a collapsing science-fiction universe, the visual complexity of an experimental digital art installation, and the precision of a professionally engineered web application.

This is not a conventional website design exercise.

This is a complete creative and technical reconstruction.

**Preserve the cinematic creative direction while implementing the user's requested changes in the existing application.**

---

# 1. APPLICATION FOUNDATION AND CHANGE SCOPE

The original brief called for replacing a single-file HTML implementation. That architectural replacement is already present: the current project is a modular Next.js application.

Maintain the modular application rather than editing generated HTML output.

`out/index.html` is a generated export. Change source files and rebuild when needed.

For a future explicitly requested rebuild, the original scope allowed the following. These are not standing instructions to discard the current implementation:

- Replace the existing implementation entirely.
- Remove obsolete styles and scripts.
- Replace the existing project architecture.
- Install and configure the necessary dependencies.
- Create a complete multi-file application.
- Build reusable, maintainable components.
- Create a real 3D rendering pipeline.
- Write custom shaders where appropriate.
- Create original procedural assets and environments.
- Implement advanced animations and interactive systems.
- Add proper routing where useful.
- Establish a production build and deployment workflow.
- Test the application in a real browser.
- Iterate on screenshots and visual quality.

Do not spend time preserving code that prevents you from achieving the required result.

Preserve only verified event information and any genuinely useful assets.

**The deliverable must be a complete runnable project, not an elaborate single-file HTML document.**

A single-page user experience is acceptable. A single-file implementation is not.

Do not confuse these two requirements.

---

# 2. EVENT INFORMATION: THE SOURCE OF TRUTH

The following information is currently represented in `config/event.ts` and the page components. Treat it as the repository's current event content; this document does not independently verify it with the organizers.

**Official event name:** THE CATACLYSM

**Organizer:** OxCode × Multimedia Club

**Theme:** Avengers: Doomsday. Keep artwork original and do not imply Marvel or Disney affiliation.

**Event type:** Inter-college cybersecurity Capture the Flag competition.

**Start:** 19 November 2026, 5:00 PM Indian Standard Time.

**End:** 20 November 2026, 9:00 AM Indian Standard Time.

**Duration:** 16 hours.

**Venue:** Navarang Auditorium, Naipunnya Institute of Management and Information Technology.

**Expected scale:** Approximately 50 teams.

**Team size:** Three or four members per team.

**Registration fee:** ₹400 per participant.

**Cash prize pool:** ₹30,000.

**Additional sponsor benefits:** Estimated ₹60,000–₹70,000, separate from the cash pool. This range is the organizer-requested public estimate and includes non-cash rewards and discounts. Do not publish the screenshot's ₹1,83,179 aggregate or present sponsor benefits as cash.

**Sponsors and benefits:**

- AMT: main cash sponsor, supporting the prize pool. Keep the ₹30,000 cash pool amount unchanged unless the organizer supplies a new amount. Use its original blue-and-green logo with the tagline from the supplied PDF, displayed on white. Supplied one-liner: "AMT is a global software engineering company specialising in custom product development, AI and cloud solutions." Give AMT priority above the other sponsors on the website and poster. AMT's details are centralized in `mainCashSponsor` in `config/event.ts`.
- CyberDefenders: Pro access goes to the highest-scoring member of each of the top three teams: 3 months for the 1st-place team, 2 months for the 2nd-place team, and 1 month for the 3rd-place team. The supplied PSD provides its blue-and-white logo.
- ThunderCipher: one free TC-VAPT exam voucher per member of the top 3 teams, with 12 vouchers total shared across all three teams, plus a 66% discount for all registered participants. The supplied logo is the cyan TC mark on black.

Each top-three team receives one Pro award for its highest-scoring member. Do not infer cash award splits, redemption deadlines, or extra sponsor conditions; these were not supplied.

Keep these sponsor-to-benefit mappings as internal documentation. Participant-facing reward descriptions must explain the reward, eligible recipient, and total allocation without sponsor names. Do not imply that 12 vouchers are awarded per member or per team. The latest simplification passed the production build and 12 relevant Playwright checks across all six viewport configurations; the unchanged WebGL check was not repeated for this content update.

The 3 November AMT update passed the production build and 12 relevant Playwright checks across all six viewport configurations. The poster retains the readable minimal design, the full Pongam venue, no registration deadline, and a QR linking to `https://cataclysm.oxcode.org/`. AMT appears only within the poster's Our Sponsors section, with a larger logo, main cash sponsor label, and supplied one-liner above the smaller supporting sponsor logos. Current exports are in `output/poster/the-cataclysm-amt-sponsors.png` and `output/pdf/the-cataclysm-amt-sponsors-a3.pdf`.

**Registration deadline:** 12 November 2026, as stated in the FAQ; no cutoff time is specified.

**Meals:** Included during the competition, according to the FAQ.

**Spot registration:** Not available.

**Participation:** The FAQ welcomes students from all departments, institutions, academic backgrounds, and skill levels, including gap-year students and those studying through other agencies or courses. Prior cybersecurity experience is not required.

**Official registration URL:** https://konfhub.com/the-cataclysm

**OxCode Instagram:** https://www.instagram.com/ox.c0de/

## Current schedule (IST)

| Date | Time | Activity |
| --- | --- | --- |
| 19 November 2026 | 4:30 PM | Check-in and team reporting; participants must be on campus |
| 19 November 2026 | 5:00 PM | Event kickoff |
| 19–20 November 2026 | Overnight | Competition |
| 20 November 2026 | 9:00 AM | Event ends; final submissions close |
| 20 November 2026 | 9:30 AM | Prize distribution and closing ceremony |

## Current contacts

| Role | Name | Phone |
| --- | --- | --- |
| Club President | Rinson Joy | +91 9746947694 |
| Tech Lead | Abel Joby | +91 8891882434 |
| College Secretary | Anwin Biju | +91 7994447644 |
| Faculty Coordinator | Mrs. Chinchu Joseph | +91 9605391164 |

**Likely cybersecurity challenge areas:**
- Reverse Engineering.
- Web Exploitation.
- Cryptography.
- OSINT.
- Digital Forensics.
- Miscellaneous challenges.

The categories are tentative. Display them as anticipated challenge areas, or qualify them with wording such as “Expected challenge domains.” Do not imply that every category is finalized.

Use the current prize amount, schedule, contacts, and FAQ policies above. Do not invent additional prize breakdowns, sponsors, challenge counts, speakers, contacts, eligibility conditions, or timetable entries.

The participant-facing site should communicate only information that helps someone understand the event and decide whether to register.

Do not add fake testimonials, fake statistics, fictional rankings, or meaningless placeholder content.

Do not rename the event to THE CATACLYSM 2026.

The official event title is exactly **THE CATACLYSM**.

---

# 3. CREATIVE MISSION: BUILD A DIGITAL WORLD

The central failure of ordinary AI-generated websites is that they treat design as a set of visual decorations.

They create a dark background, add neon accents, put particles behind a heading, animate some cards, and declare the result futuristic.

That is not acceptable.

THE CATACLYSM must have a distinctive artistic identity, an environmental narrative, and a coherent interactive world.

The website should feel like a hybrid of:

- An experimental cinematic title sequence.
- A colossal science-fiction environment.
- A superhero-scale dimensional catastrophe.
- An interactive game world.
- A futuristic incident archive.
- A high-end digital art installation.
- A physically simulated mechanical system.
- An immersive 3D exhibition.

The visitor should feel as though the website exists inside the fictional world of THE CATACLYSM.

The interface must not merely describe a collapsing multiverse. It should visually behave like a fragment of one.

## Creative principle

**Every effect must have a visual purpose. Every interaction must have a meaningful response. Every section must have its own art direction. Every transition must contribute to the world.**

The objective is not to maximize the number of effects indiscriminately.

The objective is to create an exceptionally rich visual experience without allowing spectacle to destroy clarity or performance.

---

# 4. TECHNOLOGY SELECTION: USE A MODERN PRODUCTION STACK

Do not assume that the existing project uses the right technology.

Audit the environment, identify the current toolchain, and select the most suitable modern technologies for this specific experience.

Use currently maintained, mutually compatible stable versions. Verify official documentation and APIs for installed versions. Do not blindly use obsolete tutorials or unmaintained packages.

## Preferred foundation

### Application framework

Use:

- Next.js with TypeScript.
- React Server Components where appropriate.
- Client Components for browser-dependent interactive systems.
- A modular application architecture.
- A clear separation between content, rendering, interaction, and configuration.

An alternative such as Vite with React and TypeScript is acceptable only if it materially improves the deployment architecture or rendering strategy. Choose deliberately rather than introducing unnecessary complexity.

### 3D graphics

Use:

- Three.js.
- React Three Fiber.
- Drei where useful.
- Custom BufferGeometry.
- Instanced rendering.
- Custom GLSL shaders.
- Procedural textures and materials.
- Real 3D camera movement.
- Raycasting for object interaction.

The primary environment must be a genuine 3D scene.

Do not imitate a 3D environment using CSS gradients and concentric circles.

### Animation

Use:

- GSAP for timeline-based animation and scroll-linked choreography.
- ScrollTrigger for appropriate scroll-driven transitions.
- A lightweight React animation library for ordinary interface motion.
- Custom animation systems for environmental effects.
- Spring-based movement where it creates convincing physical responses.

Avoid using multiple animation libraries to do the same job.

### Visual effects

Consider:

- WebGL shaders.
- Post-processing through a compatible Three.js pipeline.
- Selective bloom.
- Depth of field.
- Chromatic aberration.
- Film grain.
- Vignette.
- Screen-space distortion.
- Procedural fog.
- Volumetric-looking light effects.
- Temporal animation.
- Particle simulation.
- GPU-based effects when appropriate.

Use post-processing selectively. The entire screen should not be permanently blurred, glowing, distorted, or chromatically separated.

### Styling and interface

Use:

- Tailwind CSS or a well-organized CSS architecture.
- CSS custom properties for the design system.
- Responsive layouts.
- Custom typography.
- Semantic HTML.
- Reusable interface components.
- Accessible interactive controls.

### Optional technologies

Use Web Workers when CPU-intensive tasks genuinely benefit from them.

Use WebGPU only if the required functionality is supported by the chosen implementation and a reliable WebGL fallback exists. Do not select a technology simply because it is newer.

Use Web Audio API only for intentional, user-controlled sound design.

Use browser APIs such as Pointer Events, IntersectionObserver and ResizeObserver where appropriate.

Do not add a backend, database, authentication system, or custom payment infrastructure unless a real requirement justifies it.

The registration process is handled by KonfHub.

---

# 5. ARCHITECTURE REQUIREMENTS

Build a real application with clear modules and component boundaries.

A possible structure:

    app/
      layout.tsx
      page.tsx
      globals.css
      not-found.tsx

    components/
      experience/
        ExperienceRoot.tsx
        WorldCanvas.tsx
        WorldController.tsx
        Environment.tsx
        FracturedArchitecture.tsx
        DimensionalBreach.tsx
        EnergyField.tsx
        ParticleSystem.tsx
        CameraRig.tsx
        SceneLighting.tsx
        PostProcessing.tsx
        MobileEnvironment.tsx
        ExperienceFallback.tsx

      interactions/
        PointerController.tsx
        TouchController.tsx
        ObjectInteraction.tsx
        InteractionFeedback.tsx

      sections/
        OpeningSequence.tsx
        EventIntroduction.tsx
        ChallengeDomains.tsx
        EventDetails.tsx
        RegistrationSection.tsx
        Footer.tsx

      interface/
        Navigation.tsx
        RegistrationButton.tsx
        EventMetadata.tsx
        SoundToggle.tsx
        LoadingSequence.tsx
        CustomCursor.tsx
        AccessibilityControls.tsx

    config/
      event.ts
      experience.ts

    hooks/
      usePointerPosition.ts
      useReducedMotion.ts
      useDeviceCapabilities.ts
      useSceneVisibility.ts

    lib/
      animation/
      graphics/
      performance/
      time/
      utilities/

    public/
      assets/
        models/
        textures/
        materials/
        typography/
        branding/
        audio/

Adapt the structure to the actual implementation. Do not create meaningless components merely to match a directory tree.

The application must compile and run through documented package scripts.

The final result must not depend on manually pasting code into a single HTML file.

---

# 6. THE MAIN 3D EXPERIENCE

Build the central scene before constructing the rest of the page.

The main environment should be visually compelling even when all text and interface overlays are temporarily hidden.

It must have:

- Genuine spatial depth.
- A deliberate focal point.
- A strong sense of scale.
- Foreground, middle-ground and background layers.
- A coherent material system.
- Distinctive lighting.
- Multiple layers of environmental detail.
- Meaningful camera movement.
- Interaction with the visitor.
- A cinematic composition that works on desktop and mobile.

## Possible visual direction

Imagine an immense structure that appears to have been torn apart by a dimensional collapse.

Huge dark metallic forms hang in space. Sections of architecture are fractured and suspended. Emerald energy travels through the cracks. A distant mechanical silhouette suggests a threat of extraordinary scale. Fragments drift through volumetric-looking light, and a damaged dimensional aperture opens into an impossible depth.

The environment should be original rather than a literal recreation of an existing film scene.

The visitor's camera perspective should make the scale feel believable.

The scene must have moments of stillness and dramatic movement.

Do not fill the entire environment with constant motion.

Use composition, silhouette, light, shadow, scale and timing to produce the drama.

---

# 7. THE OPENING SEQUENCE MUST BE CINEMATIC

Do not start with a standard website header followed by centered text.

The opening should feel like a carefully directed title sequence.

Design the sequence in stages.

### Stage A: Initial atmosphere

A near-black environment with a small number of distant visual signals.

The visitor gradually perceives the scale and depth of the scene.

Avoid long mandatory loading screens. The site must become usable quickly.

### Stage B: Environmental emergence

The central structure becomes visible through lighting, parallax, atmospheric depth, geometry and carefully timed movement.

The environment should feel like an actual space rather than an image with a few floating objects.

### Stage C: Dimensional event

A controlled visual event changes the environment.

Possible mechanisms include:
- A fracture travelling through a structure.
- An energy pulse illuminating hidden geometry.
- A dimensional membrane opening.
- An object emerging from an obscured space.
- A localized distortion that propagates through the scene.

Use one exceptionally executed event rather than a random explosion of unrelated effects.

### Stage D: Title reveal

THE CATACLYSM emerges as an integral part of the composition.

The title may be constructed from dimensional typography, metallic material treatments, layered geometry, depth-based reveals or carefully choreographed lighting.

It must be immediately readable.

Do not simply fade in ordinary text above the scene.

### Stage E: User control

The visitor can explore the environment and reach the registration CTA.

Do not require a full cinematic sequence to finish before the user can interact with the site.

Respect reduced-motion settings and provide a direct route to event information.

---

# 8. PROCEDURAL GEOMETRY AND ENVIRONMENTAL DETAIL

Create original geometry instead of relying entirely on stock assets.

Potential systems include:

- Procedural fractured slabs.
- Irregular architectural ribs.
- Broken metallic panels.
- Repeating mechanical structures.
- Parametric energy pathways.
- Distorted membranes.
- Custom mesh surfaces.
- Instanced debris.
- Procedural surface variation.
- Animated emissive patterns.
- Noise-based geometry displacement.
- Camera-facing environmental elements where appropriate.

Avoid obvious repetition.

If many fragments exist in the environment, vary their shape, orientation, scale, material, roughness and motion.

Use a deliberate hierarchy of major, medium and fine details.

Major forms establish the environment.

Medium forms reinforce structure and visual rhythm.

Fine details provide texture and complexity.

Do not attempt to compensate for weak composition by adding thousands of tiny objects.

---

# 9. SHADER AND GRAPHICS EFFECTS

Implement effects that meaningfully enhance the environment.

Potential effects include:

### Dimensional distortion
Use shader-driven displacement to make space appear unstable around a breach.

### Energy propagation
Create animated energy travelling along fractures and metallic surfaces.

### Surface dissolution
Reveal or remove parts of geometry using procedural masks.

### Fresnel illumination
Create edge lighting around energy membranes and selected materials.

### Material degradation
Use noise, roughness variation and localized masks to suggest damage.

### Localized shockwaves
Create a propagating disturbance following a controlled interaction.

### Chromatic separation
Apply subtle RGB displacement during selected dramatic moments, not continuously.

### Depth effects
Use depth-aware compositing where appropriate.

### Volumetric appearance
Create convincing light shafts and atmospheric depth without requiring prohibitively expensive true volumetric rendering.

### Energy particles
Use a combination of instancing, shader animation and efficient particle systems.

### Environmental reaction
Allow nearby surfaces or particles to respond to a major event.

All effects must be controllable through configuration values.

Do not bury critical performance parameters in scattered components.

Avoid implementing expensive shader effects that do not materially improve the visual result.

---

# 10. ADD INTERACTION THROUGHOUT THE WORLD

The experience must react to the visitor in meaningful ways.

## Pointer interaction

- Camera parallax based on pointer position.
- Depth-aware movement of selected objects.
- Localized light or energy responses.
- Raycast-based inspection of selected 3D objects.
- Hover responses based on actual geometry.
- Inertial motion with smooth damping.
- Small, contextual environmental disturbances.
- Subtle pointer-dependent material changes.

Avoid making the entire environment follow the pointer like a flat parallax wallpaper.

## Click interaction

- Localized energy pulses.
- Short-lived particle impulses.
- Object inspection.
- Environmental changes.
- Controlled camera responses.
- Small dimensional distortions.

Interactions should be consistent with the fictional physics of the world.

## Scroll interaction

- Cinematic camera movement.
- Changes in depth and perspective.
- Transformations of environmental geometry.
- Lighting transitions.
- Controlled scene changes.
- Layered typography reveals.
- Spatial transitions between sections.

Do not hijack the browser's scroll behavior.

Do not make the website difficult to navigate because a complex animation is running.

## Touch interaction

- Tap feedback.
- Touch-aware scene interaction.
- Optional drag-based inspection.
- Simplified object responses.
- Appropriate mobile-specific compositions.
- Functional controls that do not depend on hover.

Use Pointer Events where appropriate, while respecting touch behavior and browser navigation.

## Cursor

A custom cursor is optional and must be context-sensitive.

It may reflect:
- An interactive object.
- A registration CTA.
- An inspectable artifact.
- A draggable object.

Do not use a giant cursor effect everywhere merely to make the website look more animated.

Native cursor behavior must remain usable.

---

# 11. VISUAL EFFECTS INVENTORY

Evaluate and implement the following where they materially improve the experience.

The list is intentionally broad. Use it as a creative exploration checklist, not an instruction to stack every effect onto every viewport simultaneously.

## Environmental effects

- Multi-layer parallax.
- Animated atmospheric particles.
- Procedural fog.
- Suspended debris.
- Dimensional energy fields.
- Fractured geometry.
- Animated surface damage.
- Light shafts.
- Localized energy illumination.
- Reflective metallic surfaces.
- Irregular emissive cracks.
- Depth-based environmental movement.
- Distant silhouette animation.
- Subtle background movement.
- Spatial occlusion.

## Cinematic effects

- Coordinated camera movement.
- Depth-aware transitions.
- Scene reveals.
- Selective bloom.
- Controlled chromatic aberration.
- Film grain.
- Vignette.
- Motion blur where practical.
- Localized distortion.
- Brief white-energy flashes.
- Carefully timed impact effects.
- Transition sound where appropriate.
- Animated title geometry.

## Interaction effects

- Pointer parallax.
- Raycast hover detection.
- Contextual cursor states.
- Tap ripples.
- Click impulses.
- Energy pulses.
- Magnetic buttons.
- Inertial object movement.
- Interactive artifact inspection.
- Hover-based lighting.
- Localized shader response.
- Scroll-linked animation.
- Focus-state animations.

## Interface effects

- Distinctive navigation behavior.
- Custom typography transitions.
- Animated section identifiers.
- Layered content reveals.
- Interactive challenge-domain objects.
- Animated event timeline.
- Responsive registration controls.
- Environmental section transitions.
- Carefully designed loading state.
- A meaningful completion or return-to-top interaction.

## Optional advanced effects

Consider:
- GPU-driven particle simulation.
- Procedural destruction.
- Real-time environment mapping.
- Custom post-processing passes.
- Web Audio-reactive visuals.
- Signed-distance-field rendering.
- Physics-driven object interactions.
- Offscreen rendering for selected effects.

Implement advanced techniques only when they improve the actual experience.

Do not include every effect merely because it appears on this list.

---

# 12. SUPERHERO AND MULTIVERSE VISUAL LANGUAGE

The artistic direction is inspired by Avengers: Doomsday and the Marvel multiverse.

Use a visual language associated with:
- Dimensional collapse.
- Superhero-scale conflict.
- Monumental metallic structures.
- An imposing armored antagonist.
- Emerald energy.
- Unstable realities.
- Interdimensional architecture.
- Fractured worlds.
- Massive mechanical silhouettes.
- Cinematic contrast and scale.

Do not turn the site into a collage of superhero posters.

A coherent central environment is more powerful than dozens of unrelated character images.

If authorized character artwork or models are supplied, integrate them into the composition using proper scale, lighting, material treatment and spatial relationships.

Otherwise, create original armored silhouettes and environmental elements that express the intended mood.

Do not falsely claim that original assets are official Marvel assets.

Keep the event's own identity dominant.

---

# 13. THE WEBSITE IS FOR PARTICIPANTS, NOT A FICTIONAL LORE WIKI

The visual experience may be elaborate, but the actual information must be concise.

Participants need to know:

- What THE CATACLYSM is.
- When it takes place.
- Where it takes place.
- How many people can be on a team.
- What the registration fee is.
- How to register.
- Which cybersecurity areas are expected.
- Where to find official registration information.

Avoid long fictional narratives that obscure the practical details.

Do not create a large fictional lore section, a fake universe database, or meaningless technical reports simply to fill space.

Environmental storytelling should enhance the participant experience, not replace useful event information.

---

# 14. INFORMATION ARCHITECTURE

The subsections below describe the original content intent. The current complete page order and additional prize, schedule, venue, FAQ, and contact sections are documented in the implementation snapshot above.

Use a compact number of meaningful content sections.

## Opening: THE CATACLYSM

- Immersive 3D scene.
- Event title.
- OxCode attribution.
- Concise explanation of the competition.
- Date.
- Registration CTA.

## Challenge domains

Present the anticipated areas:

- Reverse Engineering.
- Web Exploitation.
- Cryptography.
- OSINT.
- Digital Forensics.
- Miscellaneous.

These areas are tentative. Use wording such as “Expected challenge domains.”

Create a distinct visual treatment for each domain.

Do not render six identical cards.

Possible representations include:
- A forensic artifact.
- A reconstructed binary structure.
- An encrypted mechanism.
- An interactive web-like structure.
- An intelligence evidence object.
- A mysterious fragmented object.

Keep these visual metaphors understandable and avoid making them obstacles to reading.

## Event details

Show:
- 19 November 2026, 5:00 PM IST.
- 20 November 2026, 9:00 AM IST.
- 16-hour duration.
- Navarang Auditorium.
- Naipunnya Institute of Management and Information Technology.

## Team and registration

Show:
- Three to four participants per team.
- ₹400 per participant.
- Approximately 50 expected teams.
- The official registration CTA.

The participant fee must not be presented as the total team fee.

## Footer

Include:
- THE CATACLYSM.
- OxCode.
- Date and venue.
- Registration link.
- Only verified contact or social links.

Do not fabricate a social profile, phone number or email address.

---

# 15. OFFICIAL KONFHUB INTEGRATION

The official registration URL is:

https://konfhub.com/the-cataclysm

Create a centralized typed configuration.

For example:

    export const eventConfig = {
      name: "THE CATACLYSM",
      organizer: "OxCode × Multimedia Club",
      registrationUrl: "https://konfhub.com/the-cataclysm",
      participantFee: 400,
      teamSizeMin: 3,
      teamSizeMax: 4,
      expectedTeams: 50,
      startTime: "2026-11-19T17:00:00+05:30",
      endTime: "2026-11-20T09:00:00+05:30",
      timezone: "Asia/Kolkata",
      venue: "Navarang Auditorium, Naipunnya Institute of Management and Information Technology"
    };

Adjust the actual TypeScript types and implementation as necessary.

Every registration CTA must use the configured registration URL.

Use a real external link with appropriate security attributes when opening a new tab.

Do not replace the official URL with the KonfHub homepage.

Do not create a fake checkout interface.

Do not store participant payment credentials.

Do not implement a custom payment system.

The website's fee display must clearly say ₹400 per participant.

Do not assume the exact team checkout workflow without testing the organizer's KonfHub configuration.

---

## KONFHUB REGISTRATION WIDGET — REQUIRED INTEGRATION

Status as of 2 November 2026: required by the original brief, but not implemented in current source. The site currently provides a direct KonfHub link. The following retains the supplied integration specification for future implementation; it is not a claim that the widget loads or has been tested.

KonfHub has provided the official registration button embed for **THE CATACLYSM**:

```html
<div>
  <script src="https://widget.konfhub.com/widget.js" button_id="btn_6fe625c090da"></script>
</div>
```

**Integrate this exact widget into the rebuilt website. Do not replace it with a fake registration form or a generic external-link button.**

### Implementation requirements

1. **Preserve the exact widget configuration.** Use the script URL `https://widget.konfhub.com/widget.js` and button ID `btn_6fe625c090da`.
2. **React/Next.js compatibility:** Do not paste the script tag blindly into a React component if that causes hydration errors, duplicate script loading, or unreliable rendering. Implement a dedicated `KonfHubRegistrationButton` component using an appropriate client-side integration or script-loading approach. Verify that the widget works in the actual browser.
3. **Visual integration:** The registration CTA must feel native to THE CATACLYSM’s cinematic, metallic, emerald-energy visual identity. Style the widget’s container and surrounding composition to match the design without breaking the provider’s functionality.
4. **Multiple CTAs:** If registration buttons appear in multiple sections, ensure each one works reliably. Avoid loading the same external script repeatedly or creating duplicate widget instances that conflict.
5. **Registration flow:** Make the primary registration CTA invoke the official KonfHub widget. If the widget fails to load, provide a clearly visible fallback link to `https://konfhub.com/the-cataclysm`.
6. **Testing:** Verify the widget loads, the registration interaction works, and the fallback link is functional on desktop and mobile. Do not claim successful testing unless it has actually been performed.
7. **Security and reliability:** Load the external script only from the supplied KonfHub URL. Do not fabricate payment processing, registration confirmation, or ticket functionality.

Keep the KonfHub registration URL centralized in the event configuration and reuse it for the fallback. The event website remains the cinematic presentation layer; KonfHub remains responsible for registration.


# 16. ANIMATION ORCHESTRATION

Treat the site as one coordinated experience rather than many independent animations.

Create an animation system with named states or timelines.

Possible states include:

- `dormant`
- `awakening`
- `breach`
- `revelation`
- `exploration`
- `transition`
- `registration`
- `reduced-motion`

These are conceptual states. Choose the final implementation that fits the application.

Environmental animation, camera movement, title reveals, interface transitions and sound should be coordinated.

Avoid creating many unrelated `setInterval` loops or independent animation systems that fight one another.

Use requestAnimationFrame or the rendering framework's supported loop for continuous graphics work.

Clean up event listeners, timelines, subscriptions and GPU resources correctly.

Do not trigger expensive animation work when the scene is hidden.

Do not allow a scroll timeline to become stuck if the visitor resizes the browser or navigates using keyboard controls.

---

# 17. SOUND DESIGN

Optional sound may enhance the atmosphere.

Potential sounds:
- Low mechanical ambience.
- A distant energy resonance.
- A short dimensional pulse.
- A restrained mechanical transition.
- A registration confirmation effect.

Sound must be optional.

Do not autoplay loud audio.

Provide an accessible mute/unmute control.

Use user interaction to initiate playback when required by browser policies.

Keep sound files optimized and locally hosted where possible.

The site must remain fully functional when audio is disabled.

---

# 18. PERFORMANCE: AMBITION WITHOUT WASTE

The project must remain usable on realistic hardware.

Implement:

- Instanced rendering.
- Shared geometries and materials.
- GPU-friendly particle systems.
- Appropriate texture sizes.
- Compressed assets.
- Lazy loading.
- Dynamic imports.
- Responsive render resolution.
- Reduced rendering when the scene is not visible.
- Appropriate device-pixel-ratio limits.
- Selective post-processing.
- Asset loading states.
- GPU resource cleanup.
- A mobile-specific quality profile.
- A reduced-motion experience.
- A non-WebGL fallback.

Do not assume that every device can render the maximum-quality scene.

Do not render the entire 3D environment at full quality on a low-end phone.

Do not keep rendering invisible scenes at full speed.

Use measured performance rather than assumptions.

Aim for responsive interaction and smooth motion on representative devices. Document any remaining limitations honestly.

---

# 19. RESPONSIVE EXPERIENCE

Design distinct layouts and rendering profiles for:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

Desktop may use:
- More detailed geometry.
- More complex lighting.
- Higher rendering resolution.
- Richer particle systems.
- Additional environmental layers.

Mobile should retain:
- The distinctive opening scene.
- The central event title.
- Meaningful visual movement.
- Useful event information.
- Functional registration.
- Touch feedback.

Reduce complexity rather than removing the entire visual identity.

Use responsive typography, sensible content widths and appropriate control sizes.

Test at:
- 360 × 800.
- 390 × 844.
- 768 × 1024.
- 1366 × 768.
- 1920 × 1080.

Verify portrait and landscape behavior where relevant.

No clipped headings, horizontal overflow, overlapping controls, broken navigation or inaccessible CTAs.

---

# 20. ACCESSIBILITY AND REDUCED MOTION

The website must remain usable without its full visual effects.

Implement:

- Semantic HTML.
- Logical heading hierarchy.
- Keyboard navigation.
- Visible focus states.
- Accessible control labels.
- Adequate contrast.
- Appropriate alternative text.
- Reduced-motion support.
- Native link behavior.
- Clear interactive affordances.
- Non-hover alternatives to information.
- A functional fallback when WebGL is unavailable.

Respect `prefers-reduced-motion`.

In reduced-motion mode, replace cinematic transitions with concise, immediate state changes.

Do not force visitors to interact with a 3D object to access basic event information.

Do not let a custom cursor break selection or navigation.

Do not make essential text depend on shader rendering.

---

# 21. HOSTING AND DEPLOYMENT

For the current static export and Worker configuration, see the implementation snapshot at the top of this document. The following guidance records the original hosting criteria.

The preferred hosting target is Cloudflare Pages if the chosen Next.js architecture is compatible with the intended deployment mode.

Choose the correct deployment strategy.

For a static export, ensure that all required functionality works without a server runtime.

If the application requires server functionality that is incompatible with the selected deployment target, either adapt the implementation or select an appropriate supported hosting configuration.

Do not claim that a deployment is free without checking the relevant limits and actual architecture.

Do not commit secrets.

Document:
- Node.js requirements.
- Package manager.
- Installation commands.
- Development command.
- Production build command.
- Deployment procedure.
- Environment variables, if any.
- Asset requirements.
- Performance configuration.

The repository must contain the full application, not merely the final rendered page.

---

# 22. IMPLEMENTATION PROCEDURE — FOLLOW THIS ORDER

This is the original full-rebuild procedure. For maintenance and incremental changes, apply only the relevant phases within the user's requested scope; do not repeat initial concept selection or replace the application without a request to do so.

## Phase 1: Repository inspection

Inspect the existing files and identify the actual project structure.

Determine which parts can be reused and which should be discarded.

Do not assume the existing `index.html` is useful.

## Phase 2: Visual research and concept selection

Develop at least three substantially different creative directions.

Evaluate them for:
- Originality.
- Cinematic quality.
- Suitability for a cybersecurity competition.
- Technical feasibility.
- Mobile adaptability.
- Visual coherence.

Select one direction and implement it fully.

Do not stop after producing a mood board or design document.

## Phase 3: Application foundation

Set up the proper application framework and dependencies.

Establish the project structure, design tokens, typography, event configuration and rendering architecture.

Ensure the project starts successfully before proceeding.

## Phase 4: Main 3D scene

Build the opening environment.

Prioritize:
- Composition.
- Geometry.
- Lighting.
- Materials.
- Depth.
- Camera behavior.
- Title reveal.

Do not build every content section with placeholder components before the main scene is compelling.

## Phase 5: Interaction systems

Implement pointer, touch, object inspection, environmental reactions and animation orchestration.

Test actual behavior.

## Phase 6: Participant information

Build the event details, anticipated challenge domains, team information, venue and registration sections.

Use distinct visual treatments that support the central creative direction.

## Phase 7: Registration

Connect all registration actions to the official KonfHub URL.

Verify the fee and team size are represented correctly.

## Phase 8: Responsive and performance work

Create mobile-specific rendering and layout behavior.

Optimize assets, animation, rendering and loading.

## Phase 9: Real browser validation

Run the application and inspect it in a browser.

Capture screenshots at the required viewport sizes.

Test scrolling, pointer movement, touch interactions, registration links, keyboard navigation and reduced-motion behavior.

## Phase 10: Visual iteration

Review the actual rendered result.

Identify the weakest parts.

Fix the largest visual problems first.

Repeat until the website feels like a coherent, original digital experience rather than a generic template with a 3D background.

---

# 23. TESTING REQUIREMENTS

Run the appropriate available checks.

At minimum:

- Install dependencies successfully.
- Run the development server.
- Run the production build.
- Resolve compilation errors.
- Inspect browser console errors.
- Test all registration links.
- Test navigation and scrolling.
- Test desktop and mobile layouts.
- Test pointer interactions.
- Test touch interactions where a suitable browser environment is available.
- Test reduced-motion behavior.
- Test the non-WebGL fallback.
- Verify that event information is correct.
- Inspect loading behavior.
- Check for horizontal overflow.
- Check that no major element overlaps essential content.

If browser automation or screenshot tooling is available, use it.

If a particular test cannot be performed, report that limitation instead of claiming success.

Do not declare the project complete just because the development server starts.

---

# 24. FINAL QUALITY STANDARD

The result must satisfy all of the following:

### Visual
- A distinctive original art direction.
- A genuinely 3D primary environment.
- Convincing spatial depth.
- Dramatic but controlled lighting.
- Rich environmental detail.
- A memorable title reveal.
- Distinct visual treatments across content sections.
- Meaningful interaction-driven effects.
- A recognizable superhero-scale multiverse atmosphere.

### Technical
- A complete multi-file application.
- TypeScript and a modern component architecture.
- Real WebGL rendering.
- Custom procedural graphics where useful.
- Reusable interaction systems.
- Efficient resource management.
- Responsive quality scaling.
- A working production build.

### Functional
- Accurate event information.
- Correct participant fee.
- Correct team size.
- Correct venue and schedule.
- All registration buttons use the official KonfHub URL.
- No fake content.
- No dead buttons.
- No mandatory cinematic delay before accessing event information.

### Operational
- Installation instructions.
- Development instructions.
- Build instructions.
- Deployment instructions.
- Actual testing results.
- Clear disclosure of remaining dependencies.

If the website still resembles a conventional landing page with a dark background, glowing buttons, floating particles and a 3D hero, it has failed the brief.

If the project is still just an edited `index.html`, it has failed the brief.

If the visuals are impressive but the registration link is broken, it has failed the brief.

If the website is unusable on mobile, it has failed the brief.

Revise the implementation until the design, engineering, interaction and participant experience work together.

---

# FINAL DIRECTIVE

Implement the user's current request in the actual application, using the current project context above.

Do not return only a proposal, a system architecture, a mockup or a list of suggestions.

Do not stop at a single HTML file.

Keep effects purposeful and preserve accurate participant information.

For application changes, run appropriate checks and inspect the result where tooling allows. For documentation-only changes, verify factual consistency with source. State any validation limitations accurately.

The goal is a highly visual, graphically rich, cinematic and interactive digital world for THE CATACLYSM — one that feels custom-designed, technically ambitious, and unmistakably different from generic AI-generated websites.

**Build something extraordinary, but make every detail earn its place.**

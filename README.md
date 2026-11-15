# STEEL HEART Fitness Studio: website

Next.js (App Router) + TypeScript + Tailwind v4 + GSAP/ScrollTrigger + Framer Motion + React Three Fiber.

## Run
    npm install
    npm run dev        # development
    npm run build && npm start

## Replace placeholders (all centralized)
- `src/config/site.ts`: contact details, social links, training categories, membership plans, copy.
  Anything not yet confirmed by the client is a clearly-labelled placeholder. No invented prices, offers, stats or testimonials.
- `src/config/images.ts`: set `src` on any slot (drop files in `public/photos/`) to swap the designed placeholder for real photography.
- `public/brand/steel-heart-logo.png`: the supplied logo, unmodified apart from a transparent background.

## Notes
- Dark is the primary theme; light is a separate art direction. Preference persists (localStorage) and follows the system until the user chooses.
- 3D heart/barbell loads lazily, only on capable devices, pauses off-screen, and is skipped for reduced-motion users.
- Fonts are self-hosted via @fontsource (Anton, Manrope, DM Sans, Instrument Serif).

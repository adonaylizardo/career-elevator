# Landing

The landing page sells Career Elevator and links visitors into checkout and intake.

## Sub-features

- `landing-hero` — hero and primary CTA above the fold.
- `landing-sections` — how it works, what's included, FAQ scroll sections.

## How to get to it (user POV)

- Open the site root `/` (browser URL includes the Vite base, e.g. `/career-elevator/`).
- Follow **Back to landing** from checkout or intake.

## Driving it with Playwright

Preconditions:

- Preview healthy; doctor exits `0`.
- Base URL `http://127.0.0.1:4173/career-elevator`.

- **Load home.** `page.goto(baseUrl + '/')`. Heading or hero copy for Career Elevator is visible.
- **Proof.** Screenshot `desktop-1280-landing.png` and `mobile-375-landing.png` with page title or logo visible.

## Gotchas

- Empty base path only when `VITE_BASE=/`; default deploy uses `/career-elevator/`.
- Lazy sections may need a short scroll before FAQ is in view; landing proof uses above-the-fold hero, not every accordion item.

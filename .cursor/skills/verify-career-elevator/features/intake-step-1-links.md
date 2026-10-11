# Intake step 1 — Links

Step 1 collects identity and profile links (`StepLinksFields.tsx`). Section title **Tú y tus links**.

## Sub-features

- `intake-s1-fields` — full name, email, CV URL or upload, portfolio, LinkedIn.
- `intake-s1-continue` — validation and advance to step 2.

## How to get to it (user POV)

- From checkout, **I've paid — continue to intake**.
- Direct `/intake` (starts at step 1).

## Driving it with Playwright

Preconditions:

- On `/intake`; progress reads `1 / 3`.
- Wizard section heading **Tú y tus links** visible.

- **Fill required fields.** `#full_name`, `#email`, `#cv_url` (URL path avoids file upload), `#portfolio_url`, `#linkedin_url` with valid sample values.
- **Proof before continue.** Screenshot `*-intake-step-1.png`.
- **Continue.** Click **Continue**; progress becomes `2 / 3`.

## Gotchas

- CV file upload is optional if `#cv_url` is filled.
- Email must pass client validation before continue.

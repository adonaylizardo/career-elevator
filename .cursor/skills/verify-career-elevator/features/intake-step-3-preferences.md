# Intake step 3 — Preferences

Step 3 collects optional preferences (`StepPreferencesFields.tsx`). Section title **Preferencias**.

## Sub-features

- `intake-s3-optional` — city, industries, companies, employment preferences.
- `intake-s3-submit` — **Submit intake** (skipped in standard proof to avoid download/network).

## How to get to it (user POV)

- Complete step 2 and choose **Continue**.

## Driving it with Playwright

Preconditions:

- Progress `3 / 3`; section **Preferencias** visible (hint mentions optional defaults).

- **Proof.** Screenshot `*-intake-step-3.png` with **Submit intake** visible.
- **Do not submit** in default verification unless `VITE_FORM_ENDPOINT` is a test stub; submission triggers download or POST.

## Gotchas

- Step 3 fields are optional; empty form still valid for submit.
- Submit without endpoint downloads JSON locally — avoid in CI proof runs.

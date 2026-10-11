# Career Elevator verification map

Read this index before driving the app. Each feature file is a user-path recipe for headless browser verification.

## Baseline preconditions

- Production build served at `http://127.0.0.1:4173/career-elevator/` (`npm run build && npm run preview -- --host 127.0.0.1 --port 4173`).
- `RUN_ID` set; optional `VERIFY_STATE_DIR=/tmp/career-elevator-verify-$RUN_ID` with preview PID recorded.
- `node .cursor/skills/verify-career-elevator/scripts/doctor.mjs` exits `0`.
- Do not drive a preview server you did not start for this run.

## Driving conventions

- Start from the landing URL unless a feature says otherwise.
- Prefer roles and accessible names (`getByRole`, `#field_id`) over CSS position.
- React Router links omit the `/career-elevator` prefix in `to=`; the browser URL includes the Vite base path.
- Intake step advances use the **Continue** submit button; step 3 proof stops before **Submit intake**.

## Proof and skip reporting

- Capture the screen that shows the feature state (heading, step counter `N / 3`, section title).
- Checkout proof must include the PayPal anchor `href` in `proof.json`, not only a screenshot.
- Report skipped entry points explicitly; do not claim checkout verified if only landing was captured.

## Features

- [Landing](./landing.md) — marketing home at `/`.
- [Checkout](./checkout.md) — payment options at `/checkout`, PayPal link href.
- [Intake step 1 — Links](./intake-step-1-links.md) — `StepLinksFields` (you and your links).
- [Intake step 2 — Role](./intake-step-2-role.md) — `StepRoleFields` (role and logistics).
- [Intake step 3 — Preferences](./intake-step-3-preferences.md) — `StepPreferencesFields` (optional preferences).

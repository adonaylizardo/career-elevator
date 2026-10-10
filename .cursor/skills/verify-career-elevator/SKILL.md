---
name: verify-career-elevator
description: Drive the Career Elevator Vite/React web app like a user — landing, checkout (PayPal link), and the three-step intake wizard. Use after UI or routing changes, before opening a PR, or when you need screenshot proof at desktop 1280 and mobile 375.
---

# Verify Career Elevator

Career Elevator is a static React SPA (Vite). Verification always uses the **production build** served by `vite preview`, not the dev server, so asset paths match deploy (`VITE_BASE`, default `/career-elevator/`).

## Launch

From the repo root:

```bash
export RUN_ID="${RUN_ID:-$(date +%s)}"
export VERIFY_STATE_DIR="/tmp/career-elevator-verify-${RUN_ID}"
mkdir -p "$VERIFY_STATE_DIR"

npm run build
npm run preview -- --host 127.0.0.1 --port 4173 &
echo $! > "$VERIFY_STATE_DIR/preview.pid"
```

Ready when `curl -sf "http://127.0.0.1:4173/career-elevator/"` succeeds (HTTP 200). Default app URL:

`http://127.0.0.1:4173/career-elevator/`

Routes (React Router, basename = `import.meta.env.BASE_URL` without trailing slash):

- `/` → landing (`src/pages/Landing.tsx`)
- `/checkout` → checkout (`src/pages/Checkout.tsx`)
- `/intake` → intake wizard (`src/pages/Intake.tsx`, steps in `src/components/intake/steps/`)

## Doctor

Read-only gate before driving:

```bash
node .cursor/skills/verify-career-elevator/scripts/doctor.mjs
```

Requires exit code `0`. It checks that preview responds on `127.0.0.1:4173`, the landing HTML loads under the configured base path, and the preview PID file (if present) points to a live process you started in this run.

## Drive

Harness: **Playwright** (Chromium, headless). After `npm ci`, install the browser once if missing:

```bash
npx playwright install chromium
```

Drive all mapped features and both viewports:

```bash
export RUN_ID="${RUN_ID:-$(date +%s)}"
export ARTIFACT_DIR="artifacts/verify-career-elevator/${RUN_ID}"
mkdir -p "$ARTIFACT_DIR"

node .cursor/skills/verify-career-elevator/scripts/drive.mjs \
  --base-url "http://127.0.0.1:4173/career-elevator" \
  --artifact-dir "$ARTIFACT_DIR"
```

The script:

- Visits landing `/`, checkout `/checkout`, and intake `/intake`.
- Captures **step 1** (`StepLinksFields`), **step 2** (`StepRoleFields`), **step 3** (`StepPreferencesFields`) by filling required fields and clicking **Continue** (step 3 stops before **Submit intake** so no network/download side effects).
- Asserts the checkout PayPal anchor has a real `href` (default `https://paypal.me/adolizardo/49` when `VITE_PAYPAL_LINK` is unset).
- Writes PNGs at **1280×800** (`desktop-1280-*`) and **375×812** (`mobile-375-*`), plus `proof.json` with URLs and the PayPal `href` observed.

Read `.cursor/skills/verify-career-elevator/features/README.md` before choosing a subset; the full drive above is the standard PR proof.

## Evidence

Proof standard: user-visible routes and controls, not React internals.

Store under `artifacts/verify-career-elevator/<RUN_ID>/` (commit a representative run under `artifacts/verify-career-elevator/` for PRs). Required captures per full run:

| Artifact pattern | Proves |
| --- | --- |
| `desktop-1280-landing.png`, `mobile-375-landing.png` | Landing `/` |
| `desktop-1280-checkout.png`, `mobile-375-checkout.png` | Checkout + PayPal CTA visible |
| `desktop-1280-intake-step-1.png` … `step-3.png` (and mobile twins) | Each intake wizard step |
| `proof.json` | PayPal `href`, page URLs, viewport sizes |

Copy or symlink the latest run into `artifacts/verify-career-elevator/` for stable PR links when needed.

## Cleanup

Stop only the preview you started (never `pkill vite` globally):

```bash
node .cursor/skills/verify-career-elevator/scripts/cleanup.mjs
```

Removes the preview process recorded in `$VERIFY_STATE_DIR/preview.pid`. **Do not** delete `artifacts/verify-career-elevator/` during cleanup.

## Helpers

| Script | Purpose |
| --- | --- |
| `scripts/doctor.mjs` | Readiness check (see Doctor) |
| `scripts/drive.mjs` | Headless browser drive + screenshots |
| `scripts/cleanup.mjs` | Stop preview from PID file |

Maintenance: `/maintain-verification-skill` when routes or copy change.

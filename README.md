# Career Elevator

Private scaffold for **Career Elevator** — a one-time $49 offer delivering an **Opportunity Sheet** (10–20 matched roles + gap and market notes).

> **Do not publish** without Adonay OK. No GitHub Pages, Vercel public deploy, or custom domain setup in this scaffold.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- shadcn-style UI components
- React Router

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page (locked copy) |
| `/checkout` | PayPal or crypto payment — env-configured |
| `/intake` | Oracle FULL intake form |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

## Environment variables

Copy `.env.example` to `.env` and set as needed:

| Variable | Purpose |
|----------|---------|
| `VITE_PAYPAL_LINK` | PayPal payment URL |
| `VITE_CRYPTO_ADDRESS` | Crypto wallet address |
| `VITE_CRYPTO_NETWORK` | Crypto network label (e.g. Ethereum) |
| `VITE_FORM_ENDPOINT` | Intake form POST endpoint |

When unset, checkout shows honest "not configured yet" states. Intake falls back to JSON download.

## Docs

- [`docs/ops-checklist.md`](docs/ops-checklist.md) — paid → intake → draft → QA → send
- [`docs/delivery-template.md`](docs/delivery-template.md) — Opportunity Sheet structure

## Publishing

Requires Adonay approval before any public deployment.

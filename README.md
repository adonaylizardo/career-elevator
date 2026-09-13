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
| `/checkout` | PayPal (default) or crypto payment when configured |
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
| `VITE_PAYPAL_LINK` | PayPal payment URL (defaults to `https://paypal.me/adolizardo/49`) |
| `VITE_CRYPTO_ADDRESS` | Crypto wallet address (not configured yet) |
| `VITE_CRYPTO_NETWORK` | Crypto network label (e.g. USDT on Tron) — TBD |
| `VITE_FORM_ENDPOINT` | Intake form POST endpoint |

PayPal works out of the box without a `.env` file. Crypto shows an honest "not configured yet" state until a static address is added. Intake falls back to JSON download when `VITE_FORM_ENDPOINT` is unset.

## Docs

- [`docs/ops-checklist.md`](docs/ops-checklist.md) — paid → intake → draft → QA → send
- [`docs/delivery-template.md`](docs/delivery-template.md) — Opportunity Sheet structure

## Publishing

Requires Adonay approval before any public deployment.

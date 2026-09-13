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
| `/checkout` | PayPal or USDT (TRC20) payment — both work out of the box |
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
| `VITE_CRYPTO_ADDRESS` | USDT deposit address (defaults to Tron TRC20 address) |
| `VITE_CRYPTO_NETWORK` | Network label (defaults to `USDT on TRX (Tron) — USDT-TRC20`) |
| `VITE_FORM_ENDPOINT` | Intake form POST endpoint |

PayPal and USDT checkout work out of the box without a `.env` file. Intake falls back to JSON download when `VITE_FORM_ENDPOINT` is unset.

## Docs

- [`docs/ops-checklist.md`](docs/ops-checklist.md) — paid → intake → draft → QA → send
- [`docs/delivery-template.md`](docs/delivery-template.md) — Opportunity Sheet structure

## Publishing

Requires Adonay approval before any public deployment.

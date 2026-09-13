# Career Elevator

**A one-time research offer that delivers a curated Opportunity Sheet — 10–20 roles matched to your experience, with gap and market notes.**

[![Live Site](https://img.shields.io/badge/Live%20Site-adonaylizardo.github.io%2Fcareer--elevator-2563eb?style=for-the-badge)](https://adonaylizardo.github.io/career-elevator/)

**→ [Open the store](https://adonaylizardo.github.io/career-elevator/)**

## What you get

**Opportunity Sheet** — a hand-built list of 10–20 open roles aligned to your CV and stated goals, plus short notes on where your profile is thin and what the market is asking for right now.

- **Price:** $49 one-time
- **Delivery:** ~3–5 days after a complete intake
- **How it works:** manual research by Adonay — not an automated job search engine or application service

## Who it's for

Designers and product people who are actively job hunting and want direction on where to point their CV and portfolio — not another generic job board scroll.

## How the store works (V1)

This repo is the **public storefront and intake flow only**. There is no opportunity-search engine here; sheets are built by hand after purchase.

1. **Landing** — read the offer and what’s included
2. **Checkout** — pay via PayPal or USDT (TRC20)
3. **“I’ve paid”** — continue to the intake form
4. **Intake** — submit your Oracle FULL intake (CV, goals, constraints)
5. **Fulfillment** — Adonay verifies payment manually and builds your Opportunity Sheet offline

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- shadcn-style UI components
- React Router

## Routes

On [GitHub Pages](https://adonaylizardo.github.io/career-elevator/) the app is served under `/career-elevator/`. Locally, routes have no base prefix.

| Local | GitHub Pages | Purpose |
|-------|--------------|---------|
| `/` | `/career-elevator/` | Landing page |
| `/checkout` | `/career-elevator/checkout` | PayPal or USDT (TRC20) payment |
| `/intake` | `/career-elevator/intake` | Oracle FULL intake form |

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

## License & contact

Career Elevator is owned and operated by [Adonay Lizardo](https://github.com/adonaylizardo).

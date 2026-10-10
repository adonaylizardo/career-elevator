# Checkout

Checkout shows PayPal and crypto payment instructions and links forward to intake after payment.

## Sub-features

- `checkout-paypal` — PayPal CTA with external payment link.
- `checkout-continue` — **I've paid — continue to intake** route to `/intake`.

## How to get to it (user POV)

- From landing, follow the primary purchase / checkout CTA (routes to `/checkout`).
- Direct URL `/checkout` under the app base path.

## Driving it with Playwright

Preconditions:

- Preview healthy at the configured base URL.
- `VITE_PAYPAL_LINK` unset or set to a non-empty URL (default `https://paypal.me/adolizardo/49`).

- **Open checkout.** `page.goto(baseUrl + '/checkout')`. Heading **Checkout** is visible.
- **PayPal link.** Locate `getByRole('link', { name: /Pay with PayPal/i })`. Assert `href` matches `^https://paypal\.me/` and equals the expected URL (default `https://paypal.me/adolizardo/49`).
- **Proof.** Screenshot checkout with PayPal button visible; record `paypalHref` in `proof.json`.

## Gotchas

- When `VITE_PAYPAL_LINK` is cleared to empty at build time, the UI shows a configuration message instead of a link — that is a failed checkout proof for production defaults.
- PayPal opens in a new tab (`target="_blank"`); proof reads `href` only, no payment completion.

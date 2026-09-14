import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageLayout } from '../components/layout/PageLayout'
import { Section } from '../components/layout/Section'
import { buttonVariants } from '../components/ui/button'
import { cn } from '../lib/utils'

const DEFAULT_PAYPAL_LINK = 'https://paypal.me/adolizardo/49'
const DEFAULT_CRYPTO_ADDRESS = 'TD9JU44xuykaBV3W7ofJpmc6iRnocFKnCD'
const DEFAULT_CRYPTO_NETWORK = 'USDT on TRX (Tron) — USDT-TRC20'

const paypalLink =
  (import.meta.env.VITE_PAYPAL_LINK as string | undefined)?.trim() ||
  DEFAULT_PAYPAL_LINK
const cryptoAddress =
  (import.meta.env.VITE_CRYPTO_ADDRESS as string | undefined)?.trim() ||
  DEFAULT_CRYPTO_ADDRESS
const cryptoNetwork =
  (import.meta.env.VITE_CRYPTO_NETWORK as string | undefined)?.trim() ||
  DEFAULT_CRYPTO_NETWORK

const hasPaypal = Boolean(paypalLink)
const hasCrypto = Boolean(cryptoAddress)

export function Checkout() {
  const [addressCopied, setAddressCopied] = useState(false)

  async function copyAddress() {
    await navigator.clipboard.writeText(cryptoAddress)
    setAddressCopied(true)
    setTimeout(() => setAddressCopied(false), 2000)
  }

  return (
    <PageLayout>
      <Section className="pt-12 sm:pt-20" wide label="Checkout">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Career Elevator — $49 one-time. After payment, complete the intake
          form so we can build your Opportunity Sheet.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {/* PayPal */}
          <div className="card-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold">PayPal</h2>
            {hasPaypal ? (
              <div className="mt-6">
                <a
                  href={paypalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: 'default' }))}
                >
                  Pay with PayPal — $49
                </a>
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                PayPal payment link is not configured yet. Set{' '}
                <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-xs">
                  VITE_PAYPAL_LINK
                </code>{' '}
                in your environment to enable this option.
              </p>
            )}
          </div>

          {/* Crypto */}
          <div className="card-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold">Crypto (USDT)</h2>
            {hasCrypto ? (
              <div className="mt-6 space-y-4">
                <div>
                  <p className="font-mono-label text-[10px] text-muted">
                    Network
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cryptoNetwork}
                  </p>
                  <p className="mt-2 text-sm font-medium text-pink">
                    Send only on this network. Wrong network = loss of funds.
                  </p>
                </div>
                <div>
                  <p className="font-mono-label text-[10px] text-muted">
                    Amount
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    $49 / 49 USDT (display only — payment is not auto-verified)
                  </p>
                </div>
                <div>
                  <p className="font-mono-label text-[10px] text-muted">
                    Address
                  </p>
                  <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start">
                    <code className="block flex-1 break-all rounded-xl border border-border bg-neutral-50/80 px-3 py-2.5 text-sm">
                      {cryptoAddress}
                    </code>
                    <button
                      type="button"
                      onClick={copyAddress}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'shrink-0',
                      )}
                    >
                      {addressCopied ? 'Copied' : 'Copy address'}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Send 49 USDT, then click &ldquo;I&apos;ve paid&rdquo; below.
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Crypto payment is not configured yet. Set{' '}
                <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-xs">
                  VITE_CRYPTO_ADDRESS
                </code>{' '}
                and{' '}
                <code className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-xs">
                  VITE_CRYPTO_NETWORK
                </code>{' '}
                in your environment to enable this option.
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            to="/intake"
            className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
          >
            I've paid — continue to intake
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Back to landing
          </Link>
        </div>
      </Section>
    </PageLayout>
  )
}

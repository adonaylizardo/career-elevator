import { Link } from 'react-router-dom'
import { PageLayout } from '../components/layout/PageLayout'
import { Section } from '../components/layout/Section'
import { buttonVariants } from '../components/ui/button'
import { cn } from '../lib/utils'

const DEFAULT_PAYPAL_LINK = 'https://paypal.me/adolizardo/49'

const paypalLink =
  (import.meta.env.VITE_PAYPAL_LINK as string | undefined)?.trim() ||
  DEFAULT_PAYPAL_LINK
const cryptoAddress = import.meta.env.VITE_CRYPTO_ADDRESS as string | undefined
const cryptoNetwork = import.meta.env.VITE_CRYPTO_NETWORK as string | undefined

const hasPaypal = Boolean(paypalLink)
const hasCrypto = Boolean(cryptoAddress?.trim())

export function Checkout() {
  return (
    <PageLayout>
      <Section className="pt-16 sm:pt-24">
        <h1 className="text-2xl font-semibold sm:text-3xl">Checkout</h1>
        <p className="mt-4 text-muted-foreground">
          Career Elevator — $49 one-time. After payment, complete the intake
          form so we can build your Opportunity Sheet.
        </p>

        <div className="mt-10 space-y-8">
          {/* PayPal */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">PayPal</h2>
            {hasPaypal ? (
              <div className="mt-4">
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
              <p className="mt-3 text-sm text-muted-foreground">
                PayPal payment link is not configured yet. Set{' '}
                <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
                  VITE_PAYPAL_LINK
                </code>{' '}
                in your environment to enable this option.
              </p>
            )}
          </div>

          {/* Crypto */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Crypto</h2>
            {hasCrypto ? (
              <div className="mt-4 space-y-2">
                {cryptoNetwork && (
                  <p className="text-sm text-muted-foreground">
                    Network:{' '}
                    <span className="font-medium text-foreground">
                      {cryptoNetwork}
                    </span>
                  </p>
                )}
                <p className="text-sm text-muted-foreground">Address:</p>
                <code className="block break-all rounded-md border border-border bg-neutral-50 px-3 py-2 text-sm">
                  {cryptoAddress}
                </code>
                <p className="text-sm text-muted-foreground">
                  Send $49 equivalent, then click "I've paid" below.
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Crypto payment is not configured yet. Set{' '}
                <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
                  VITE_CRYPTO_ADDRESS
                </code>{' '}
                and{' '}
                <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
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
            className={cn(buttonVariants({ variant: 'default' }))}
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

        {!hasCrypto && (
          <p className="mt-6 rounded-md border border-border bg-neutral-50 px-4 py-3 text-sm text-muted-foreground">
            Crypto payment is not available yet — use PayPal above, or check
            back when a static USDT address is configured.
          </p>
        )}
      </Section>
    </PageLayout>
  )
}

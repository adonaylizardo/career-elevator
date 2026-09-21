import type { CSSProperties } from 'react'
import { CARD_IMAGES } from '../../lib/assets'
import { cn } from '../../lib/utils'

interface IncludedCard {
  image: string
  title: string
  body: string
  offsetDesktop: number
  offsetMobile: number
}

const CARDS: IncludedCard[] = [
  {
    image: CARD_IMAGES.matched,
    title: '10–20 matched roles.',
    body: "Open positions aligned to your experience level, your target direction, and the constraints you give me (location, remote, industry, company size). Each with a link and a short line on why it's on your sheet.",
    offsetDesktop: 0,
    offsetMobile: 0,
  },
  {
    image: CARD_IMAGES.gaps,
    title: 'Gap notes.',
    body: "A light read on what these roles keep asking for that your CV doesn't currently show — the specific things worth tightening before you apply.",
    offsetDesktop: 32,
    offsetMobile: 24,
  },
  {
    image: CARD_IMAGES.market,
    title: 'Market notes.',
    body: "What's actually showing up for your target right now: patterns in titles, requirements, and how these teams are describing the work.",
    offsetDesktop: 64,
    offsetMobile: 48,
  },
]

function IncludedCard({
  card,
  className,
  style,
  mediaClassName,
}: {
  card: IncludedCard
  className?: string
  style?: CSSProperties
  mediaClassName?: string
}) {
  return (
    <article
      className={cn(
        'absolute flex flex-col overflow-hidden rounded-[24px] border border-[#EAEAEA] bg-card pt-5 pb-7 pl-5 pr-5',
        className,
      )}
      style={style}
    >
      <img
        src={card.image}
        alt=""
        className={cn(
          'mb-4 w-full rounded-[16px] object-cover',
          mediaClassName,
        )}
      />
      <h3 className="text-section-title text-[28px] leading-[0.95] tracking-[-0.5px] lg:text-[40px] lg:leading-[0.9] lg:tracking-[-0.8px]">
        {card.title}
      </h3>
      <p className="text-body-muted mt-3 text-[14px] leading-[1.35] lg:text-[16px]">
        {card.body}
      </p>
    </article>
  )
}

export function WhatsIncludedStack() {
  return (
    <section
      id="whats-included"
      className="bg-background px-5 py-14 lg:px-[120px] lg:py-[96px]"
    >
      <div className="mx-auto flex max-w-[920px] flex-col items-center gap-8 lg:gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-section-title">What&apos;s included</h2>
          <p className="text-body-muted max-w-[640px]">
            Delivered as a clean, readable sheet you can work through at your
            own pace.
          </p>
        </div>

        {/* Mobile stack — 335×392 frame, cards 300×320 at y 0/24/48 */}
        <div className="relative h-[392px] w-[335px] lg:hidden">
          {CARDS.map((card, index) => (
            <IncludedCard
              key={card.title}
              card={card}
              className="left-[18px] h-[320px] w-[300px] rounded-[20px]"
              mediaClassName="h-[140px] rounded-[12px]"
              style={{
                top: card.offsetMobile,
                zIndex: index + 1,
              }}
            />
          ))}
        </div>

        {/* Desktop stack — 920×544 frame, cards 520×440 at x=200 y 0/32/64 */}
        <div className="relative hidden h-[544px] w-[920px] lg:block">
          {CARDS.map((card, index) => (
            <IncludedCard
              key={card.title}
              card={card}
              className="left-[200px] h-[440px] w-[520px]"
              mediaClassName="h-[260px]"
              style={{
                top: card.offsetDesktop,
                zIndex: index + 1,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

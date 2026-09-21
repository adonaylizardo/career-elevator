import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { cn } from '../../lib/utils'

interface IncludedCard {
  title: string
  body: string
  variant: 'roles' | 'gaps' | 'market'
}

const CARDS: IncludedCard[] = [
  {
    title: '10–20 matched roles.',
    variant: 'roles',
    body: 'Open positions aligned to your experience level, your target direction, and the constraints you give me (location, remote, industry, company size). Each with a link and a short line on why it\u2019s on your sheet.',
  },
  {
    title: 'Gap notes.',
    variant: 'gaps',
    body: 'A light read on what these roles keep asking for that your CV doesn\u2019t currently show \u2014 the specific things worth tightening before you apply.',
  },
  {
    title: 'Market notes.',
    variant: 'market',
    body: 'What\u2019s actually showing up for your target right now: patterns in titles, requirements, and how these teams are describing the work.',
  },
]

const CARD_COUNT = CARDS.length
const PEEK = 10

function CardGraphic({ variant }: { variant: IncludedCard['variant'] }) {
  if (variant === 'market') {
    return (
      <div className="mb-4 flex h-14 items-end gap-1 px-0.5 sm:h-16">
        {[38, 58, 44, 72, 50, 64, 40].map((height, index) => (
          <span
            key={index}
            className="w-4 rounded-[2px] bg-pink/90 sm:w-5"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'gaps') {
    return (
      <div className="mb-4 grid grid-cols-6 gap-1.5">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'aspect-square rounded-[2px]',
              index % 3 === 0 ? 'bg-pink/90' : 'bg-surface',
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="mb-4 flex flex-wrap gap-1.5">
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'h-2 rounded-full',
            index % 2 === 0 ? 'w-10 bg-pink/90' : 'w-7 bg-surface',
          )}
        />
      ))}
    </div>
  )
}

function IncludedCardContent({
  card,
  className,
  style,
}: {
  card: IncludedCard
  className?: string
  style?: CSSProperties
}) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-[16px] border border-border/70 bg-card p-5 shadow-sm sm:rounded-[20px] sm:p-6',
        className,
      )}
      style={style}
    >
      <CardGraphic variant={card.variant} />
      <h3 className="text-base font-semibold sm:text-lg">{card.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {card.body}
      </p>
    </article>
  )
}

function getCardTransform(index: number, progress: number): number {
  const stageSize = 1 / CARD_COUNT

  if (progress >= 1) {
    return index * PEEK
  }

  const stageStart = index * stageSize
  const stageEnd = (index + 1) * stageSize

  if (progress < stageStart) {
    return index === 0 ? 0 : 80
  }

  if (progress >= stageEnd) {
    return index * PEEK
  }

  const stageProgress = (progress - stageStart) / stageSize

  if (index === 0) {
    return stageProgress * PEEK
  }

  const fromY = 80 - stageProgress * 80
  const stackY = (index - 1) * PEEK + stageProgress * PEEK
  return Math.min(fromY, stackY)
}

function getCardOpacity(index: number, progress: number): number {
  if (index === 0) return 1

  const stageStart = index * (1 / CARD_COUNT)
  const reveal = (progress - stageStart) / (1 / CARD_COUNT)
  return Math.min(Math.max(reveal * 2, 0), 1)
}

function MobileIncludedStack() {
  return (
    <section className="bg-card py-12 sm:py-14 lg:hidden">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          What&apos;s included
        </h2>

        <div className="relative mx-auto w-full max-w-[340px] pb-2">
          {CARDS.map((card, index) => (
            <IncludedCardContent
              key={card.title}
              card={card}
              className={cn(index > 0 && 'relative -mt-[52px]')}
              style={index > 0 ? { zIndex: index + 1 } : undefined}
            />
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-sm text-center text-sm text-muted-foreground">
          Delivered as a clean, readable sheet you can work through at your own
          pace.
        </p>
      </div>
    </section>
  )
}

function DesktopIncludedStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) {
        setProgress(1)
        return
      }

      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable)
      setProgress(scrolled / scrollable)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative hidden bg-card lg:block"
      style={{ height: `${100 + CARD_COUNT * 42}vh` }}
    >
      <div className="sticky top-16 flex min-h-[calc(100vh-4rem)] items-center py-12">
        <div className="mx-auto w-full max-w-[1200px] px-8 lg:px-10">
          <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight">
            What&apos;s included
          </h2>

          <div className="relative mx-auto h-[300px] w-full max-w-[520px]">
            {CARDS.map((card, index) => (
              <article
                key={card.title}
                className="absolute inset-0 flex flex-col rounded-[20px] border border-border/70 bg-card p-6 shadow-sm will-change-transform"
                style={{
                  opacity: getCardOpacity(index, progress),
                  zIndex: index + 1,
                  transform: `translateY(${getCardTransform(index, progress)}px)`,
                }}
              >
                <CardGraphic variant={card.variant} />
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-md text-center text-sm text-muted-foreground">
            Delivered as a clean, readable sheet you can work through at your
            own pace.
          </p>
        </div>
      </div>
    </section>
  )
}

export function WhatsIncludedStack() {
  return (
    <div id="whats-included">
      <MobileIncludedStack />
      <DesktopIncludedStack />
    </div>
  )
}

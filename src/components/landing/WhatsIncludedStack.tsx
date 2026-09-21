import { useEffect, useRef, useState } from 'react'
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
const PEEK = 12

function CardGraphic({ variant }: { variant: IncludedCard['variant'] }) {
  if (variant === 'market') {
    return (
      <div className="mb-6 flex h-28 items-end gap-1.5 px-1">
        {[40, 64, 48, 80, 56, 72, 44].map((height, index) => (
          <span
            key={index}
            className="w-6 rounded-sm bg-pink/90"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'gaps') {
    return (
      <div className="mb-6 grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              'aspect-square rounded-sm',
              index % 3 === 0 ? 'bg-pink/90' : 'bg-surface',
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'h-3 rounded-full',
            index % 2 === 0 ? 'w-16 bg-pink/90' : 'w-10 bg-surface',
          )}
        />
      ))}
    </div>
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
    return index === 0 ? 0 : 120
  }

  if (progress >= stageEnd) {
    return index * PEEK
  }

  const stageProgress = (progress - stageStart) / stageSize

  if (index === 0) {
    return stageProgress * PEEK
  }

  const fromY = 120 - stageProgress * 120
  const stackY = (index - 1) * PEEK + stageProgress * PEEK
  return Math.min(fromY, stackY)
}

function getCardOpacity(index: number, progress: number): number {
  if (index === 0) return 1

  const stageStart = index * (1 / CARD_COUNT)
  const reveal = (progress - stageStart) / (1 / CARD_COUNT)
  return Math.min(Math.max(reveal * 2, 0), 1)
}

export function WhatsIncludedStack() {
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
      id="whats-included"
      className="relative bg-card"
      style={{ height: `${100 + CARD_COUNT * 75}vh` }}
    >
      <div className="sticky top-16 flex min-h-[calc(100vh-4rem)] items-center py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
          <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            What&apos;s included
          </h2>

          <div className="relative mx-auto h-[360px] w-full max-w-[520px] sm:h-[440px]">
            {CARDS.map((card, index) => (
              <article
                key={card.title}
                className="absolute inset-0 flex flex-col rounded-[24px] border border-border/70 bg-card p-6 shadow-sm will-change-transform sm:p-8"
                style={{
                  opacity: getCardOpacity(index, progress),
                  zIndex: index + 1,
                  transform: `translateY(${getCardTransform(index, progress)}px)`,
                }}
              >
                <CardGraphic variant={card.variant} />
                <h3 className="text-xl font-semibold sm:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-xl text-center text-base text-muted-foreground">
            Delivered as a clean, readable sheet you can work through at your
            own pace.
          </p>
        </div>
      </div>
    </section>
  )
}

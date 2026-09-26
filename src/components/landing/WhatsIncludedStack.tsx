import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
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

/** Scroll distance ≈ 3 viewport steps so each card gets a beat. */
const SCROLL_STEPS_VH = 3.25

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function segmentProgress(progress: number, start: number, end: number) {
  if (progress <= start) return 0
  if (progress >= end) return 1
  return (progress - start) / (end - start)
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

function useScrollProgress(sectionRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  const measure = useCallback(() => {
    const el = sectionRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const scrollable = el.offsetHeight - window.innerHeight
    if (scrollable <= 0) {
      setProgress(1)
      return
    }

    const scrolled = clamp(-rect.top, 0, scrollable)
    setProgress(scrolled / scrollable)
  }, [sectionRef])

  useEffect(() => {
    const onScrollOrResize = () => {
      if (rafRef.current !== null) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        measure()
      })
    }

    measure()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [measure])

  return progress
}

function getAnimatedCardStyle(
  index: number,
  progress: number,
  offsets: number[],
): CSSProperties {
  const count = offsets.length
  const finalY = offsets[index]
  const enterStart = index / count
  const enterEnd = (index + 1) / count
  const enterT = easeOutCubic(segmentProgress(progress, enterStart, enterEnd))

  const entryOffset = index === 0 ? 0 : 140
  const y =
    index === 0
      ? finalY
      : finalY + (1 - enterT) * entryOffset

  const packT = easeOutCubic(segmentProgress(progress, 0.55, 1))
  const scale = 1 - (count - 1 - index) * 0.022 * packT

  return {
    zIndex: index + 1,
    opacity: index === 0 ? 1 : enterT,
    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
    transformOrigin: 'top center',
    willChange: 'transform, opacity',
  }
}

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
        'absolute left-0 top-0 flex flex-col overflow-hidden rounded-[24px] border border-[#EAEAEA] bg-card pt-5 pb-7 pl-5 pr-5',
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

function CardStack({
  mobile,
  progress,
  reducedMotion,
}: {
  mobile: boolean
  progress: number
  reducedMotion: boolean
}) {
  const offsets = mobile
    ? CARDS.map((c) => c.offsetMobile)
    : CARDS.map((c) => c.offsetDesktop)

  return (
    <div
      className={cn(
        'relative',
        mobile ? 'h-[392px] w-[335px]' : 'h-[544px] w-[920px]',
      )}
    >
      {CARDS.map((card, index) => {
        const style: CSSProperties = reducedMotion
          ? { top: offsets[index], zIndex: index + 1 }
          : getAnimatedCardStyle(index, progress, offsets)

        return (
          <IncludedCard
            key={card.title}
            card={card}
            className={cn(
              mobile
                ? 'left-[18px] h-[320px] w-[300px] rounded-[20px]'
                : 'left-[200px] h-[440px] w-[520px]',
              !reducedMotion && 'top-0',
            )}
            mediaClassName={
              mobile ? 'h-[140px] rounded-[12px]' : 'h-[260px]'
            }
            style={style}
          />
        )
      })}
    </div>
  )
}

export function WhatsIncludedStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const progress = useScrollProgress(sectionRef)

  const scrollHeight = reducedMotion
    ? undefined
    : `calc(100vh + ${SCROLL_STEPS_VH * 100}vh)`

  return (
    <section
      id="whats-included"
      ref={sectionRef}
      className="relative bg-background"
      style={{ minHeight: scrollHeight }}
    >
      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-center px-5 py-14 lg:px-[120px] lg:py-[96px]">
        <div className="mx-auto flex max-w-[920px] flex-col items-center gap-8 lg:gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-section-title">What&apos;s included</h2>
            <p className="text-body-muted max-w-[640px]">
              Delivered as a clean, readable sheet you can work through at your
              own pace.
            </p>
          </div>

          <div className="lg:hidden">
            <CardStack mobile progress={progress} reducedMotion={reducedMotion} />
          </div>
          <div className="hidden lg:block">
            <CardStack
              mobile={false}
              progress={progress}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

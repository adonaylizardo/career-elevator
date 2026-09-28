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

/** Sticky stage + scroll track (vh). Lower = less dead scroll after the pack. */
const SCROLL_STEPS_VH = 3.35

/** Raw scroll fraction at which animation progress reaches 1 (rest is quick exit). */
const ANIMATION_DONE_FRACTION = 0.78

/** Normalized animation segments (solo beats unchanged). */
const BEAT_1_END = 0.24
const BEAT_2_END = 0.48
const BEAT_3_END = 0.72
const PACK_START = 0.72
const PACK_END = 0.86

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
    const raw = scrolled / scrollable
    setProgress(clamp(raw / ANIMATION_DONE_FRACTION, 0, 1))
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

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function focusBeat(progress: number) {
  if (progress < BEAT_1_END) return 0
  if (progress < BEAT_2_END) return 1
  if (progress < BEAT_3_END) return 2
  return 3
}

function getAnimatedCardStyle(
  index: number,
  progress: number,
  offsets: number[],
  mobile: boolean,
): CSSProperties {
  const count = offsets.length
  const slideDistance = mobile ? 360 : 480
  const peekStep = mobile ? 18 : 24
  const packScaleStep = 0.022

  const beat = focusBeat(progress)

  if (progress >= PACK_START) {
    const packT = easeOutCubic(segmentProgress(progress, PACK_START, PACK_END))
    const packStartY =
      index === 0 ? -peekStep * 2 : index === 1 ? -peekStep : 0
    const packStartScale =
      index === count - 1 ? 1 : 1 - (count - 1 - index) * 0.018
    const endY = offsets[index]
    const endScale = 1 - (count - 1 - index) * packScaleStep

    return {
      zIndex: index + 1,
      opacity: 1,
      transform: `translate3d(0, ${lerp(packStartY, endY, packT)}px, 0) scale(${lerp(packStartScale, endScale, packT)})`,
      transformOrigin: 'top center',
      willChange: 'transform, opacity',
    }
  }

  const beatStart = index === 0 ? 0 : index === 1 ? BEAT_1_END : BEAT_2_END
  const enterWindow = mobile ? 0.07 : 0.08
  const enterT = easeOutCubic(
    segmentProgress(progress, beatStart, beatStart + enterWindow),
  )

  if (index > beat) {
    return {
      zIndex: index + 1,
      opacity: 0,
      pointerEvents: 'none',
      transform: `translate3d(0, ${slideDistance}px, 0) scale(1)`,
      transformOrigin: 'top center',
      willChange: 'transform, opacity',
    }
  }

  if (index === beat) {
    const y = index === 0 ? 0 : lerp(slideDistance, 0, enterT)
    return {
      zIndex: 30,
      opacity: index === 0 ? 1 : enterT,
      transform: `translate3d(0, ${y}px, 0) scale(1)`,
      transformOrigin: 'top center',
      willChange: 'transform, opacity',
    }
  }

  const depth = beat - index
  const settleT = easeOutCubic(
    segmentProgress(progress, beatStart, beatStart + enterWindow * 0.85),
  )
  const behindY = -peekStep * depth * settleT
  const behindScale = 1 - depth * 0.018 * settleT

  return {
    zIndex: 10 + index,
    opacity: 0.92,
    transform: `translate3d(0, ${behindY}px, 0) scale(${behindScale})`,
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
          : getAnimatedCardStyle(index, progress, offsets, mobile)

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

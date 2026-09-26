import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { cn } from '../../lib/utils'

const STEPS = [
  {
    step: '1',
    title: 'You pay and complete the intake.',
    body: "A short form: your CV, your portfolio link, what you're looking for, and what you'd rather avoid. It takes about 15 minutes to fill out properly.",
  },
  {
    step: '2',
    title: 'I build your Opportunity Sheet.',
    body: 'Manual research against your actual profile and goals — not a keyword filter or an automated feed.',
  },
  {
    step: '3',
    title: 'You get it in 3–5 days.',
    body: "Counted from a complete intake. If something in your intake is unclear, I'll ask before I start, and the clock starts once we're aligned.",
  },
] as const

const SCROLL_STEPS_VH = 3.0
const ANIMATION_DONE_FRACTION = 0.78
const BEAT_1_END = 0.24
const BEAT_2_END = 0.48
const BEAT_3_END = 0.72
const SETTLE_START = 0.72
const SETTLE_END = 0.86

const GAP_PX = 24

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

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function focusBeat(progress: number) {
  if (progress < BEAT_1_END) return 0
  if (progress < BEAT_2_END) return 1
  if (progress < BEAT_3_END) return 2
  return 3
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

    const scrollable = el.offsetHeight - window.innerHeight
    if (scrollable <= 0) {
      setProgress(1)
      return
    }

    const scrolled = clamp(-el.getBoundingClientRect().top, 0, scrollable)
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

function StepCard({
  step,
  className,
  style,
}: {
  step: (typeof STEPS)[number]
  className?: string
  style?: CSSProperties
}) {
  return (
    <article
      className={cn(
        'rounded-[20px] border border-border bg-card p-7',
        className,
      )}
      style={style}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-badge font-mono text-[12px] font-medium tracking-[0.8px] text-white">
        {step.step}
      </span>
      <h3 className="text-section-title mt-5 text-[28px] leading-[0.95] tracking-[-0.5px] lg:text-[40px] lg:leading-[0.9] lg:tracking-[-0.8px]">
        {step.title}
      </h3>
      <p className="text-body-muted mt-4">{step.body}</p>
    </article>
  )
}

function gridX(index: number, cardWidth: number) {
  return index * (cardWidth + GAP_PX)
}

/** Left edge visible width for cards sitting behind the active step. */
const PEEK_EDGE_PX = 26
const PEEK_STACK_PX = 12

function behindPeekX(depth: number, cardWidth: number) {
  return -(cardWidth - PEEK_EDGE_PX) - (depth - 1) * PEEK_STACK_PX
}

function behindOpacity(depth: number) {
  return clamp(0.72 - depth * 0.2, 0.28, 0.72)
}

function activeEnterProgress(progress: number, beat: number) {
  if (beat === 0) return 1
  const beatStart = beat === 1 ? BEAT_1_END : BEAT_2_END
  return easeOutCubic(segmentProgress(progress, beatStart, beatStart + 0.08))
}

function getDesktopStepStyle(
  index: number,
  progress: number,
  cardWidth: number,
  trackWidth: number,
): CSSProperties {
  const beat = focusBeat(progress)
  const centerX = (trackWidth - cardWidth) / 2
  const offRight = trackWidth + 48
  const enterWindow = 0.08

  const settleT = easeOutCubic(
    segmentProgress(progress, SETTLE_START, SETTLE_END),
  )

  if (progress >= SETTLE_START) {
    const startX =
      index === 2 ? centerX : gridX(index, cardWidth)
    const endX = gridX(index, cardWidth)
    const x = index === 2 ? lerp(startX, endX, settleT) : endX
    return {
      zIndex: index + 1,
      opacity: 1,
      transform: `translate3d(${x}px, 0, 0)`,
      width: cardWidth,
      willChange: 'transform',
    }
  }

  const beatStart =
    index === 0 ? 0 : index === 1 ? BEAT_1_END : BEAT_2_END
  const enterT = easeOutCubic(
    segmentProgress(progress, beatStart, beatStart + enterWindow),
  )

  if (index > beat) {
    return {
      zIndex: index + 1,
      opacity: 0,
      pointerEvents: 'none',
      transform: `translate3d(${offRight}px, 0, 0)`,
      width: cardWidth,
      willChange: 'transform, opacity',
    }
  }

  if (index === beat) {
    const x =
      index === 0
        ? centerX
        : lerp(offRight, centerX, enterT)
    return {
      zIndex: 30,
      opacity: index === 0 ? 1 : enterT,
      transform: `translate3d(${x}px, 0, 0) scale(1)`,
      width: cardWidth,
      willChange: 'transform, opacity',
    }
  }

  const depth = beat - index
  const beatBoundary = beat === 1 ? BEAT_1_END : BEAT_2_END
  const shoveT = easeOutCubic(
    segmentProgress(progress, beatBoundary, beatBoundary + 0.045),
  )
  const peekX = behindPeekX(depth, cardWidth)
  const enterPush =
    index === beat - 1 ? activeEnterProgress(progress, beat) * 32 : 0
  const x =
    index === beat - 1 && progress < beatBoundary + 0.06
      ? lerp(centerX, peekX - enterPush, shoveT)
      : peekX - enterPush

  return {
    zIndex: 10 + index,
    opacity:
      depth >= 2
        ? 0
        : behindOpacity(depth) * (index === beat - 1 ? 1 - enterPush / 48 : 1),
    pointerEvents: 'none',
    transform: `translate3d(${x}px, 0, 0) scale(${1 - depth * 0.02})`,
    width: cardWidth,
    willChange: 'transform, opacity',
  }
}

function getMobileStepStyle(index: number, progress: number): CSSProperties {
  const beat = focusBeat(progress)
  const cardHeight = 220
  const stackGap = 16
  const offRight = 340
  const enterWindow = 0.08

  const settleT = easeOutCubic(
    segmentProgress(progress, SETTLE_START, SETTLE_END),
  )

  if (progress >= SETTLE_START) {
    const stackY = index * (cardHeight + stackGap)
    const soloY = 0
    const y = lerp(soloY, stackY, settleT)
    const x = lerp(0, 0, settleT)
    return {
      zIndex: index + 1,
      opacity: 1,
      transform: `translate3d(${x}px, ${y}px, 0)`,
      willChange: 'transform',
    }
  }

  const beatStart =
    index === 0 ? 0 : index === 1 ? BEAT_1_END : BEAT_2_END
  const enterT = easeOutCubic(
    segmentProgress(progress, beatStart, beatStart + enterWindow),
  )

  if (index > beat) {
    return {
      zIndex: index + 1,
      opacity: 0,
      pointerEvents: 'none',
      transform: `translate3d(${offRight}px, 0, 0)`,
      willChange: 'transform, opacity',
    }
  }

  if (index === beat) {
    const x =
      index === 0 ? 0 : lerp(offRight, 0, enterT)
    return {
      zIndex: 30,
      opacity: index === 0 ? 1 : enterT,
      transform: `translate3d(${x}px, 0, 0) scale(1)`,
      willChange: 'transform, opacity',
    }
  }

  const depth = beat - index
  const beatBoundary = beat === 1 ? BEAT_1_END : BEAT_2_END
  const shoveT = easeOutCubic(
    segmentProgress(progress, beatBoundary, beatBoundary + 0.045),
  )
  const peekPx = PEEK_EDGE_PX + (depth - 1) * PEEK_STACK_PX
  const offLeft = -(320 - peekPx)
  const enterPush =
    index === beat - 1 ? activeEnterProgress(progress, beat) * 16 : 0
  const x =
    index === beat - 1 && progress < beatBoundary + 0.06
      ? lerp(0, offLeft - enterPush, shoveT)
      : offLeft - enterPush

  return {
    zIndex: 10 + index,
    opacity: depth >= 2 ? 0 : behindOpacity(depth) * (1 - shoveT * 0.35),
    pointerEvents: 'none',
    transform: `translate3d(${x}px, 0, 0) scale(${1 - depth * 0.02})`,
    willChange: 'transform, opacity',
  }
}

function HowItWorksTrack({
  progress,
  reducedMotion,
}: {
  progress: number
  reducedMotion: boolean
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState({ trackWidth: 1200, cardWidth: 384 })

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      const trackWidth = track.clientWidth
      const cardWidth = (trackWidth - GAP_PX * (STEPS.length - 1)) / STEPS.length
      setMetrics({ trackWidth, cardWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  if (reducedMotion) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        {STEPS.map((step) => (
          <StepCard key={step.step} step={step} />
        ))}
      </div>
    )
  }

  return (
    <>
      <div
        ref={trackRef}
        className="relative hidden overflow-hidden lg:block"
        style={{ height: 300 }}
      >
        {STEPS.map((step, index) => (
          <StepCard
            key={step.step}
            step={step}
            className="absolute left-0 top-0"
            style={getDesktopStepStyle(
              index,
              progress,
              metrics.cardWidth,
              metrics.trackWidth,
            )}
          />
        ))}
      </div>
      <div
        className="relative overflow-hidden lg:hidden"
        style={{ height: progress >= SETTLE_END ? 692 : 260 }}
      >
        {STEPS.map((step, index) => (
          <StepCard
            key={step.step}
            step={step}
            className="absolute left-0 top-0 w-full"
            style={getMobileStepStyle(index, progress)}
          />
        ))}
      </div>
    </>
  )
}

export function HowItWorksScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const progress = useScrollProgress(sectionRef)

  const scrollHeight = reducedMotion
    ? undefined
    : `calc(100vh + ${SCROLL_STEPS_VH * 100}vh)`

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative scroll-mt-[88px] bg-background lg:scroll-mt-24"
      style={{ minHeight: scrollHeight }}
    >
      <div className="sticky top-0 px-5 py-12 lg:px-[120px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="text-section-title mb-10">How it works</h2>
          <HowItWorksTrack progress={progress} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  )
}

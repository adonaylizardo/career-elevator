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
const PEEK_EDGE_PX = 28
const FOCUS_CARD_WIDTH = 400

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
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

/** Which keyframe pair to interpolate and local t ∈ [0,1]. */
function beatSegment(progress: number) {
  if (progress < BEAT_1_END) {
    return { from: 0, to: 1, t: progress / BEAT_1_END }
  }
  if (progress < BEAT_2_END) {
    return {
      from: 1,
      to: 2,
      t: (progress - BEAT_1_END) / (BEAT_2_END - BEAT_1_END),
    }
  }
  if (progress < SETTLE_START) {
    return {
      from: 2,
      to: 3,
      t: (progress - BEAT_2_END) / (BEAT_3_END - BEAT_2_END),
    }
  }
  if (progress < SETTLE_END) {
    return {
      from: 3,
      to: 4,
      t: (progress - SETTLE_START) / (SETTLE_END - SETTLE_START),
    }
  }
  return { from: 4, to: 4, t: 1 }
}

type DesktopLayout = {
  trackWidth: number
  focusWidth: number
  settleWidth: number
  focusX: number
  offRight: number
  peekX: number
  hiddenX: number
  gridX: (index: number) => number
}

function getDesktopLayout(trackWidth: number): DesktopLayout {
  const settleWidth = (trackWidth - GAP_PX * (STEPS.length - 1)) / STEPS.length
  const focusWidth = clamp(
    FOCUS_CARD_WIDTH,
    360,
    Math.min(420, trackWidth - 40),
  )
  const focusX = (trackWidth - focusWidth) / 2
  const offRight = trackWidth + 72
  const peekX = -(focusWidth - PEEK_EDGE_PX)
  const hiddenX = -(focusWidth + 12)

  return {
    trackWidth,
    focusWidth,
    settleWidth,
    focusX,
    offRight,
    peekX,
    hiddenX,
    gridX: (index) => index * (settleWidth + GAP_PX),
  }
}

function desktopKeyframeX(index: number, frame: number, L: DesktopLayout) {
  const { offRight, focusX, peekX, hiddenX, gridX } = L
  const table: number[][] = [
    [offRight, focusX, peekX, hiddenX, gridX(0)],
    [offRight, offRight, focusX, peekX, gridX(1)],
    [offRight, offRight, offRight, focusX, gridX(2)],
  ]
  return table[index][frame]
}

function desktopKeyframeWidth(frame: number, L: DesktopLayout) {
  if (frame >= 4) return L.settleWidth
  return L.focusWidth
}

function desktopKeyframeOpacity(index: number, frame: number) {
  const table: number[][] = [
    [1, 1, 0.9, 0, 1],
    [0, 0, 1, 0.88, 1],
    [0, 0, 0, 1, 1],
  ]
  return table[index][frame]
}

function getDesktopStepStyle(
  index: number,
  progress: number,
  layout: DesktopLayout,
): CSSProperties {
  const seg = beatSegment(progress)
  const t = easeOutCubic(seg.t)

  const x = lerp(
    desktopKeyframeX(index, seg.from, layout),
    desktopKeyframeX(index, seg.to, layout),
    t,
  )
  const width = lerp(
    desktopKeyframeWidth(seg.from, layout),
    desktopKeyframeWidth(seg.to, layout),
    t,
  )
  const opacity = lerp(
    desktopKeyframeOpacity(index, seg.from),
    desktopKeyframeOpacity(index, seg.to),
    t,
  )

  const zIndex =
    progress >= SETTLE_START
      ? index + 1
      : 12 + index + (index === seg.to - 1 ? 10 : 0)

  return {
    zIndex,
    opacity,
    width,
    pointerEvents: opacity < 0.15 ? 'none' : undefined,
    transform: `translate3d(${x}px, 0, 0)`,
    willChange: 'transform, opacity, width',
  }
}

type MobileLayout = {
  trackWidth: number
  offRight: number
  peekX: number
  hiddenX: number
  cardHeight: number
}

function getMobileLayout(trackWidth: number): MobileLayout {
  return {
    trackWidth,
    offRight: trackWidth + 48,
    peekX: -(trackWidth - PEEK_EDGE_PX),
    hiddenX: -(trackWidth + 16),
    cardHeight: 228,
  }
}

function mobileKeyframeX(index: number, frame: number, L: MobileLayout) {
  const { offRight, peekX, hiddenX } = L
  const table: number[][] = [
    [offRight, 0, peekX, hiddenX, 0],
    [offRight, offRight, 0, peekX, 0],
    [offRight, offRight, offRight, 0, 0],
  ]
  return table[index][frame]
}

function mobileKeyframeY(index: number, frame: number, L: MobileLayout) {
  const stackGap = 16
  if (frame < 4) return 0
  return index * (L.cardHeight + stackGap)
}

function mobileKeyframeOpacity(index: number, frame: number) {
  return desktopKeyframeOpacity(index, frame)
}

function getMobileStepStyle(
  index: number,
  progress: number,
  layout: MobileLayout,
): CSSProperties {
  const seg = beatSegment(progress)
  const t = easeOutCubic(seg.t)

  const x = lerp(
    mobileKeyframeX(index, seg.from, layout),
    mobileKeyframeX(index, seg.to, layout),
    t,
  )
  const y = lerp(
    mobileKeyframeY(index, seg.from, layout),
    mobileKeyframeY(index, seg.to, layout),
    t,
  )
  const opacity = lerp(
    mobileKeyframeOpacity(index, seg.from),
    mobileKeyframeOpacity(index, seg.to),
    t,
  )

  return {
    zIndex: 12 + index + (index === seg.to - 1 ? 10 : 0),
    opacity,
    pointerEvents: opacity < 0.15 ? 'none' : undefined,
    transform: `translate3d(${x}px, ${y}px, 0)`,
    willChange: 'transform, opacity',
  }
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

function HowItWorksTrack({
  progress,
  reducedMotion,
}: {
  progress: number
  reducedMotion: boolean
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const mobileTrackRef = useRef<HTMLDivElement>(null)
  const [desktopLayout, setDesktopLayout] = useState(() =>
    getDesktopLayout(1200),
  )
  const [mobileLayout, setMobileLayout] = useState(() =>
    getMobileLayout(335),
  )

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setDesktopLayout(getDesktopLayout(trackRef.current.clientWidth))
      }
      if (mobileTrackRef.current) {
        setMobileLayout(getMobileLayout(mobileTrackRef.current.clientWidth))
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const mobileStageHeight =
    progress >= SETTLE_END
      ? mobileLayout.cardHeight * 3 + 32
      : mobileLayout.cardHeight + 24

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
        style={{ height: 320 }}
      >
        {STEPS.map((step, index) => (
          <StepCard
            key={step.step}
            step={step}
            className="absolute left-0 top-0 shrink-0"
            style={getDesktopStepStyle(index, progress, desktopLayout)}
          />
        ))}
      </div>
      <div
        ref={mobileTrackRef}
        className="relative overflow-hidden lg:hidden"
        style={{ height: mobileStageHeight }}
      >
        {STEPS.map((step, index) => (
          <StepCard
            key={step.step}
            step={step}
            className="absolute left-0 top-0 w-full shrink-0"
            style={getMobileStepStyle(index, progress, mobileLayout)}
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
      className="relative overflow-x-clip bg-background scroll-mt-32 lg:scroll-mt-28"
      style={{ minHeight: scrollHeight }}
    >
      <div className="sticky top-[4.5rem] px-5 pb-12 pt-6 lg:top-20 lg:px-[120px] lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] overflow-x-clip">
          <h2 className="text-section-title mb-10">How it works</h2>
          <HowItWorksTrack progress={progress} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  )
}

interface IntakeStepHeaderProps {
  step: number
  title: string
  toggleLabel?: string
  onToggle?: () => void
}

export function IntakeStepHeader({
  step,
  title,
  toggleLabel,
  onToggle,
}: IntakeStepHeaderProps) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-[12px] font-medium text-foreground">
          {step}
        </span>
        <span className="h-px flex-1 bg-border" aria-hidden />
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground">
          {title}
        </span>
      </div>
      {toggleLabel && onToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="font-body mt-3 text-[14px] text-muted hover:text-foreground"
        >
          {toggleLabel}
        </button>
      )}
    </div>
  )
}

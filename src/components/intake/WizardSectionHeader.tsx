interface WizardSectionHeaderProps {
  step: number
  title: string
  hint?: string
}

export function WizardSectionHeader({
  step,
  title,
  hint,
}: WizardSectionHeaderProps) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] bg-field font-display text-[12px] uppercase leading-none text-foreground">
          {step}
        </span>
        <span className="h-px flex-1 bg-[#DEDEDE]" aria-hidden />
        <span className="font-display text-[12px] uppercase leading-none tracking-wide text-foreground">
          {title}
        </span>
      </div>
      {hint && (
        <p className="font-body mt-3 text-[14px] font-light leading-[1.35] text-muted">
          {hint}
        </p>
      )}
    </div>
  )
}

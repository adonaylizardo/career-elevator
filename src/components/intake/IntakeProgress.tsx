interface IntakeProgressProps {
  step: number
}

export function IntakeProgress({ step }: IntakeProgressProps) {
  return (
    <p className="font-mono text-[12px] font-medium leading-[1.3] text-muted">
      {step} / 3
    </p>
  )
}

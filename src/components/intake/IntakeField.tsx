import { Label } from '../ui/label'

interface IntakeFieldProps {
  label: string
  htmlFor?: string
  required?: boolean
  helper?: string
  children: React.ReactNode
  counter?: string
}

export function IntakeField({
  label,
  htmlFor,
  required,
  helper,
  children,
  counter,
}: IntakeFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label variant="intake" htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {helper && (
        <p className="font-body text-[14px] font-light leading-[1.35] text-muted">
          {helper}
        </p>
      )}
      {children}
      {counter && <p className="intake-counter">{counter}</p>}
    </div>
  )
}

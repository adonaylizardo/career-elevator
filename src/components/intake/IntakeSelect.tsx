import { cn } from '../../lib/utils'

export interface IntakeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean
}

export function IntakeSelect({
  className,
  hasError,
  children,
  ...props
}: IntakeSelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          'intake-field appearance-none pr-10',
          hasError && 'intake-field-error',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <span
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-body text-[16px] text-[#A2A2A2]"
        aria-hidden
      >
        ›
      </span>
    </div>
  )
}

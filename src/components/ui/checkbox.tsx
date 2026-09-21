import { cn } from '../../lib/utils'

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  variant?: 'default' | 'intake'
}

export function Checkbox({
  className,
  label,
  id,
  variant = 'default',
  ...props
}: CheckboxProps) {
  const inputId = id ?? props.name
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={inputId}
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0 rounded border-border text-accent focus:ring-accent',
          variant === 'intake' && 'border-[#E6E6E3] bg-field',
          className,
        )}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(
          variant === 'intake'
            ? 'font-body text-[14px] leading-[1.35] text-foreground'
            : 'text-sm text-foreground',
        )}
      >
        {label}
      </label>
    </div>
  )
}

import { cn } from '../../lib/utils'

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const inputId = id ?? props.name
  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        id={inputId}
        className={cn(
          'mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-neutral-400',
          className,
        )}
        {...props}
      />
      <label htmlFor={inputId} className="text-sm text-foreground">
        {label}
      </label>
    </div>
  )
}

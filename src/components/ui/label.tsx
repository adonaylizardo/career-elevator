import { cn } from '../../lib/utils'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  variant?: 'default' | 'intake'
}

export function Label({
  className,
  required,
  variant = 'default',
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        variant === 'intake'
          ? 'intake-label'
          : 'text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span
          className={cn(
            'ml-0.5',
            variant === 'intake' ? 'intake-label-required' : 'text-muted',
          )}
        >
          *
        </span>
      )}
    </label>
  )
}

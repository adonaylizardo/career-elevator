import { cn } from '../../lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'intake'
  hasError?: boolean
}

export function Input({
  className,
  type,
  variant = 'default',
  hasError,
  ...props
}: InputProps) {
  if (variant === 'intake') {
    return (
      <input
        type={type}
        className={cn(
          'intake-field',
          hasError && 'intake-field-error',
          className,
        )}
        {...props}
      />
    )
  }

  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-[6px] border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

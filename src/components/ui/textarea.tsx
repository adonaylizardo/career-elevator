import { cn } from '../../lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'intake'
  hasError?: boolean
}

export function Textarea({
  className,
  variant = 'default',
  hasError,
  ...props
}: TextareaProps) {
  if (variant === 'intake') {
    return (
      <textarea
        className={cn(
          'intake-field min-h-[96px] resize-y',
          hasError && 'intake-field-error',
          className,
        )}
        {...props}
      />
    )
  }

  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-[6px] border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

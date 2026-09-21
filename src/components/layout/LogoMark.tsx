import { cn } from '../../lib/utils'

interface LogoMarkProps {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-accent text-accent-foreground',
        className,
      )}
      aria-hidden
    >
      <span className="text-base font-medium leading-none">/</span>
    </span>
  )
}

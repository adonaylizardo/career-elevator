import { cn } from '../../lib/utils'

interface LogoMarkProps {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      className={cn(
        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-btn text-white',
        className,
      )}
      aria-hidden
    >
      <span className="font-display text-[18px] leading-none tracking-[-0.5px]">
        /
      </span>
    </span>
  )
}

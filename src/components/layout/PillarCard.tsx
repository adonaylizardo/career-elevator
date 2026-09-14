import { cn } from '../../lib/utils'

interface PillarCardProps {
  title: string
  children: React.ReactNode
  className?: string
  variant?: 'light' | 'accent'
}

export function PillarCard({
  title,
  children,
  className,
  variant = 'light',
}: PillarCardProps) {
  return (
    <article
      className={cn(
        'card-surface flex flex-col p-6 sm:p-8',
        variant === 'accent' && 'halftone-bg-light',
        className,
      )}
    >
      <h3 className="font-display text-xl font-bold sm:text-2xl">{title}</h3>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </article>
  )
}

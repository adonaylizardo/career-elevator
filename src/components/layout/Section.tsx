import { cn } from '../../lib/utils'

interface SectionProps {
  id?: string
  title?: string
  label?: string
  children: React.ReactNode
  className?: string
  wide?: boolean
  centered?: boolean
}

export function Section({
  id,
  title,
  label,
  children,
  className,
  wide = false,
  centered = false,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-14 sm:py-20', className)}>
      <div
        className={cn(
          'mx-auto px-4 sm:px-8',
          wide ? 'max-w-5xl' : 'max-w-3xl',
          centered && 'text-center',
        )}
      >
        {label && (
          <p className="font-mono-label mb-4 text-[10px] text-muted">{label}</p>
        )}
        {title && (
          <h2 className="mb-8 text-3xl font-bold leading-tight sm:text-4xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  )
}

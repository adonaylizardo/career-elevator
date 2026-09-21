import { cn } from '../../lib/utils'

interface SectionProps {
  id?: string
  title?: string
  eyebrow?: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
  titleClassName?: string
}

export function Section({
  id,
  title,
  eyebrow,
  children,
  className,
  containerClassName,
  titleClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-24', className)}>
      <div
        className={cn(
          'mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10',
          containerClassName,
        )}
      >
        {eyebrow && (
          <p className="mb-4 font-nav text-[11px] uppercase tracking-[0.12em] text-pink">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2
            className={cn(
              'mb-8 text-3xl font-semibold tracking-tight sm:text-4xl lg:mb-10',
              titleClassName,
            )}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  )
}

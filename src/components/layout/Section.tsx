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
    <section id={id} className={cn('py-12 sm:py-14 lg:py-16', className)}>
      <div
        className={cn(
          'mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10',
          containerClassName,
        )}
      >
        {eyebrow && (
          <p className="mb-3 font-nav text-[11px] uppercase tracking-[0.12em] text-pink">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2
            className={cn(
              'mb-6 text-2xl font-semibold tracking-tight sm:text-3xl lg:mb-8',
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

import { cn } from '../../lib/utils'

interface SectionProps {
  id?: string
  title?: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('py-12 sm:py-16', className)}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {title && (
          <h2 className="mb-6 text-xl font-semibold sm:text-2xl">{title}</h2>
        )}
        {children}
      </div>
    </section>
  )
}

import { useState } from 'react'
import { cn } from '../../lib/utils'

export interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div key={item.question} className="py-1">
            <div
              className={cn(
                isOpen && 'rounded-[12px] bg-surface px-4 py-1 sm:px-5',
              )}
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
                aria-expanded={isOpen}
                onClick={() => toggle(index)}
              >
                <span className="text-base font-medium text-foreground sm:text-lg">
                  {item.question}
                </span>
                <span
                  className="mt-0.5 shrink-0 text-xl font-light leading-none text-muted-foreground"
                  aria-hidden
                >
                  {isOpen ? '×' : '+'}
                </span>
              </button>
              {isOpen && (
                <p className="max-w-3xl pb-5 text-base leading-relaxed text-muted-foreground sm:pb-6">
                  {item.answer}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

import { useState } from 'react'
import { cn } from '../../lib/utils'

export interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
  defaultOpenIndex?: number | null
}

export function FaqAccordion({
  items,
  defaultOpenIndex = null,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <div className="w-full max-w-[900px]">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={item.question}
            className={cn(
              'border-[#DEDEDE]',
              index === 0 ? 'border-y' : 'border-b',
            )}
          >
            <button
              type="button"
              className="flex w-full items-start justify-between gap-6 px-0 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => toggle(index)}
            >
              <span className="text-faq-q">{item.question}</span>
              <span
                className="font-body mt-0.5 shrink-0 text-[20px] font-medium leading-[1.15] tracking-[-0.3px] text-foreground"
                aria-hidden
              >
                {isOpen ? '×' : '+'}
              </span>
            </button>
            {isOpen && (
              <p className="text-faq-a max-w-[760px] pb-5">{item.answer}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

import { ChevronDown } from 'lucide-react'

import { cn } from '@/utilities/ui'

export type FAQBlockProps = {
  heading?: null | string
  intro?: null | string
  items?:
    | {
        id?: null | string
        question?: null | string
        answer?: null | string
      }[]
    | null
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ heading, intro, items }) => {
  const visibleItems = items?.filter((item) => item?.question) ?? []
  const title = heading || 'FREQUENTLY ASKED QUESTION'

  if (!title && visibleItems.length === 0) {
    return null
  }

  return (
    <section
      aria-label={title}
      className="not-prose w-full bg-white py-16 text-[#242424] md:py-20"
    >
      <div className="mx-auto max-w-[760px] px-4 text-center">
        {title ? (
          <h2 className="font-roboto-condensed text-4xl font-bold uppercase leading-tight tracking-normal md:text-5xl">
            {title}
          </h2>
        ) : null}

        {intro ? (
          <p className="mx-auto mt-4 max-w-[720px] text-base leading-relaxed text-[#242424] md:text-lg">
            {intro}
          </p>
        ) : null}

        {visibleItems.length > 0 ? (
          <div className="mt-10 space-y-3 text-left">
            {visibleItems.map((item, index) => (
              <details
                className="group rounded-[4px] bg-[#e7e7e7] text-[#242424]"
                key={item.id || `${item.question}-${index}`}
              >
                <summary
                  className={cn(
                    'flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4',
                    'text-base font-semibold leading-snug marker:hidden md:text-lg',
                    '[&::-webkit-details-marker]:hidden',
                  )}
                >
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] bg-[#d2d2d2]"
                  >
                    <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                  </span>
                </summary>

                {item.answer ? (
                  <div className="px-6 pb-5 text-sm leading-relaxed text-[#333333] md:text-base">
                    {item.answer}
                  </div>
                ) : null}
              </details>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

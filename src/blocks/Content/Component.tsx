import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

const backgroundClasses = {
  dark: 'bg-[#071317] text-white',
  teal: 'bg-[#0b2530] text-white',
  transparent: '',
  white: 'bg-white text-black',
}

type ContentBlockComponentProps = ContentBlockProps & {
  backgroundColor?: keyof typeof backgroundClasses | null
  customClass?: string | null
  fullWidthSection?: boolean | null
}

export const ContentBlock: React.FC<ContentBlockComponentProps> = (props) => {
  const { backgroundColor = 'transparent', columns, customClass, fullWidthSection } = props

  const columnClasses = {
    fiveTwelfths: 'col-span-4 md:col-span-2 lg:col-span-5',
    full: 'col-span-4 lg:col-span-12',
    half: 'col-span-4 md:col-span-2 lg:col-span-6',
    oneThird: 'col-span-4 md:col-span-2 lg:col-span-4',
    sevenTwelfths: 'col-span-4 md:col-span-2 lg:col-span-7',
    twoThirds: 'col-span-4 md:col-span-2 lg:col-span-8',
  }

  return (
    <section
      className={cn(
        fullWidthSection ? 'my-0 w-full py-16' : '',
        backgroundClasses[backgroundColor || 'transparent'],
        customClass,
      )}
    >
      <div className="container">
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <div className={cn(columnClasses[size || 'oneThird'])} key={index}>
                  {richText && <RichText data={richText} enableGutter={false} />}

                  {enableLink && <CMSLink {...link} />}
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

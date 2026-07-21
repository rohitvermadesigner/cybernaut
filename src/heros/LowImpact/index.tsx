import React from 'react'

import type { Page } from '@/payload-types'

import { HeroRichText } from '@/heros/HeroRichText'
import { cn } from '@/utilities/ui'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      pageSlug?: string
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      pageSlug?: string
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, pageSlug, richText }) => {
  return (
    <div
      className={cn(
        'inner-header relative',
        pageSlug === 'cctv-support' ? 'w-full' : 'container mt-16',
      )}
    >
      <div className={cn(pageSlug === 'cctv-support' ? 'w-full' : 'max-w-[48rem]')}>
        {children ||
          (richText && (
            <HeroRichText
              contentClassName={pageSlug === 'cctv-support' ? 'w-full' : undefined}
              mediaBlockImgClassName={
                pageSlug === 'cctv-support' ? 'w-full rounded-none' : undefined
              }
              mediaBlockPictureClassName={pageSlug === 'cctv-support' ? 'mt-0 mb-0' : undefined}
              richText={richText}
            />
          ))}
      </div>
    </div>
  )
}

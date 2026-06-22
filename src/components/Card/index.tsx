'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { formatDateTime } from '@/utilities/formatDateTime'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'heroImage' | 'meta' | 'publishedAt' | 'title'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, heroImage, meta, publishedAt, title } = doc || {}
  const { description } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'overflow-hidden hover:cursor-pointer text-white border-b-[1px] border-[#4B6172] pb-4',
        className,
      )}
      ref={card.ref}
    >
      <div className="grid grid-cols-[0.5fr_1.5fr] items-stretch p-2">
        <div className="h-full">
          {heroImage && typeof heroImage !== 'string' && heroImage.url && (
            <Image
              src={getMediaUrl(heroImage.url, heroImage.updatedAt)}
              alt={heroImage.alt || titleToUse || ''}
              width={heroImage.width || 640}
              height={heroImage.height || 480}
              sizes="33vw"
              className="h-full w-full object-cover rounded-md"
            />
          )}
        </div>
        <div className="pl-4">
          {showCategories && hasCategories && (
            <div className="uppercase text-sm mb-4">
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category

                  const categoryTitle = titleFromCategory || 'Untitled category'

                  const isLast = index === categories.length - 1

                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }

                return null
              })}
            </div>
          )}
          {titleToUse && (
            <div>
              <h3 className="line-clamp-3">
                <Link className="text-lg" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
          {publishedAt && (
            <time className="mt-1 block text-xs text-white/70" dateTime={publishedAt}>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
      </div>
    </article>
  )
}

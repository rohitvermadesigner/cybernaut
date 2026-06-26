import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { Card } from '../../components/Card'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Link from 'next/link'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: DefaultTypedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid gap-4">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null
          if (doc._status !== 'published') return null

          return <Card key={index} doc={doc} relationTo="posts" showCategories />
        })}
      </div>

      {/* <div className="text-center">
        <Link
          href="#"
          target="_blank"
          className="triangle-cta mt-5 inline-block px-6 py-3 text-base font-medium text-white hover:text-black"
        >
          <span>More Blog</span>
        </Link>
      </div> */}
    </div>
  )
}

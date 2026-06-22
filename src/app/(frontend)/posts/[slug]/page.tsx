import type { Metadata } from 'next'

import { formatDateTime } from 'src/utilities/formatDateTime'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16 bg-white text-black">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* <PostHero post={post} /> */}

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-[1.4fr_0.6fr] gap-8">
          <div>
            {heroImage && typeof heroImage !== 'string' && (
              <Media priority imgClassName="w-full rounded-xl mb-4" resource={heroImage} />
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1 mb-4 text-[#666]">
                <time dateTime={publishedAt}>
                  {new Date(publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            )}
            <h1 className="font-roboto-condensed font-extrabold uppercase tracking-normal text-[1.5rem] lg:text-5xl mb-5">
              {title}
            </h1>

            <div>
              <RichText
                className="mb-5 text-black text-justify"
                data={post.content}
                enableGutter={false}
              />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xl">Latest Blogs</h3>
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <RelatedPosts
                className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr] bg-[url('/images/bg-m.png')] p-4 rounded-lg"
                docs={post.relatedPosts.filter((post) => typeof post === 'object')}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

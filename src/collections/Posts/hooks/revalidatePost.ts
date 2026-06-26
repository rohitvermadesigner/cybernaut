import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const revalidatePostIndexes = () => {
      revalidatePath('/')
      revalidatePath('/posts')
      revalidatePath('/posts/page/[pageNumber]', 'page')
      revalidateTag('posts-sitemap', 'max')
    }

    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidatePostIndexes()
    }

    // If the post was previously published, revalidate the old path when it was unpublished
    // or when its slug changed while remaining published.
    if (
      previousDoc?._status === 'published' &&
      (doc._status !== 'published' || previousDoc.slug !== doc.slug)
    ) {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePostIndexes()
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/')
    revalidatePath('/posts')
    revalidatePath('/posts/page/[pageNumber]', 'page')
    revalidateTag('posts-sitemap', 'max')
  }

  return doc
}

import config from '@payload-config'
import { getPayload } from 'payload'

type Args = {
  excludeId?: string | number
  limit?: number
}

export async function getLatestPosts({ excludeId, limit = 3 }: Args = {}) {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    limit,
    sort: '-publishedAt',
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        ...(excludeId
          ? [
              {
                id: {
                  not_equals: excludeId,
                },
              },
            ]
          : []),
      ],
    },
  })

  return posts.docs
}

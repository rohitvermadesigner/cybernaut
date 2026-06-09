import config from '@payload-config'
import { getPayload } from 'payload'

export async function getLatestPosts() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    limit: 3,
    sort: '-publishedDate',
  })

  return posts.docs
}

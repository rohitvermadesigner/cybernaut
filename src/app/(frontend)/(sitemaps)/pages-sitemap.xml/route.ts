import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import config from '@payload-config'
import { getCanonicalURL } from '../../../../utilities/getURL'

const getPagesSitemap = unstable_cache(
  async () => {
    const dateFallback = new Date().toISOString()
    const payload = await getPayload({ config })
    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        and: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            slug: {
              not_equals: 'blog',
            },
          },
        ],
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const pages = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => ({
            loc: getCanonicalURL(page?.slug === 'home' ? '/' : `/${page?.slug}`),
            lastmod: page.updatedAt || dateFallback,
          }))
      : []

    const hasHomeInPages = pages.some((page) => page.loc === getCanonicalURL('/'))

    return hasHomeInPages
      ? pages
      : [
          ...pages,
          {
            loc: getCanonicalURL('/'),
            lastmod: dateFallback,
          },
        ]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}

import { getServerSideSitemap } from 'next-sitemap'
import { unstable_cache } from 'next/cache'
import { getCanonicalURL } from '../../../../utilities/getURL'

const getPagesSitemap = unstable_cache(
  async () => {
    const dateFallback = new Date().toISOString()

    return [
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

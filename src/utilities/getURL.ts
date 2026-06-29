import canUseDOM from './canUseDOM'

const DEFAULT_SITE_URL = 'https://www.cybernautme.com'

const normalizeSiteUrl = (url?: string) => {
  if (!url) return DEFAULT_SITE_URL

  const siteUrl = url.startsWith('http') ? url : `https://${url}`

  return siteUrl.replace(/\/+$/, '')
}

export const getServerSideURL = () => {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL

  if (configuredSiteUrl) {
    return normalizeSiteUrl(configuredSiteUrl)
  }

  if (process.env.NODE_ENV === 'production') {
    return DEFAULT_SITE_URL
  }

  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SERVER_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'http://localhost:3000'),
  )
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}

export const getCanonicalURL = (path = '/') => {
  const siteUrl = getServerSideURL()
  const canonicalPath = path.startsWith('/') ? path : `/${path}`

  return `${siteUrl}${canonicalPath === '/' ? '/' : canonicalPath.replace(/\/+$/, '')}`
}

import { NextResponse, type NextRequest } from 'next/server'

type RedirectDocument = {
  from: string
  to?: {
    reference?: {
      relationTo?: 'pages' | 'posts'
      value?: string | { slug?: string | null }
    } | null
    url?: string | null
  }
}

type RedirectsResponse = {
  docs?: RedirectDocument[]
}

const getReferenceURL = (redirect: RedirectDocument): string | null => {
  const reference = redirect.to?.reference

  if (!reference || typeof reference.value !== 'object' || !reference.value?.slug) {
    return null
  }

  return `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${
    reference.value.slug
  }`
}

const getRedirectURL = (redirect: RedirectDocument): string | null => {
  return redirect.to?.url || getReferenceURL(redirect)
}

export async function middleware(request: NextRequest) {
  const apiURL = new URL('/api/redirects', request.url)
  apiURL.searchParams.set('where[from][equals]', request.nextUrl.pathname)
  apiURL.searchParams.set('depth', '1')
  apiURL.searchParams.set('limit', '1')

  const response = await fetch(apiURL, {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    return NextResponse.next()
  }

  const data = (await response.json()) as RedirectsResponse
  const redirect = data.docs?.[0]
  const redirectURL = redirect ? getRedirectURL(redirect) : null

  if (!redirectURL) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(redirectURL, request.url), 302)
}

export const config = {
  matcher: ['/((?!api|admin|_next|images|favicon.ico|robots.txt|sitemap.xml|media).*)'],
}

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

const getRedirectLookupPaths = (pathname: string): string[] => {
  if (pathname === '/') {
    return [pathname]
  }

  const withoutTrailingSlash = pathname.replace(/\/+$/, '')

  return Array.from(new Set([pathname, withoutTrailingSlash]))
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
  try {
    const lookupPaths = getRedirectLookupPaths(request.nextUrl.pathname)
    const apiURL = new URL('/api/redirects', request.url)

    if (lookupPaths.length === 1) {
      apiURL.searchParams.set('where[from][equals]', lookupPaths[0])
    } else {
      lookupPaths.forEach((pathname, index) => {
        apiURL.searchParams.set(`where[or][${index}][from][equals]`, pathname)
      })
    }

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

    const destination = new URL(redirectURL, request.url)

    if (destination.pathname !== '/') {
      destination.pathname = destination.pathname.replace(/\/+$/, '')
    }

    if (
      destination.pathname === request.nextUrl.pathname &&
      destination.search === request.nextUrl.search
    ) {
      return NextResponse.next()
    }

    return NextResponse.redirect(destination, 302)
  } catch {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!api|admin|_next|images|favicon.ico|robots.txt|sitemap.xml|media).*)'],
}

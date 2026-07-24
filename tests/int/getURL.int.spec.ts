import { afterEach, describe, expect, it } from 'vitest'
import { getCanonicalURL, getServerSideURL } from '../../src/utilities/getURL'

describe('getServerSideURL', () => {
  const originalEnv = { ...process.env }

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  it('prefers the canonical site URL over stale server URL environment values', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://cybernaut.excellenceauditing.net'
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.cybernautme.com'

    expect(getServerSideURL()).toBe('https://www.cybernautme.com')
  })

  it('falls back to the canonical site URL in production when no site env vars are configured', () => {
    delete process.env.NEXT_PUBLIC_SERVER_URL
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL
    delete process.env.NEXT_PUBLIC_SITE_URL
    delete process.env.SITE_URL
    process.env.NODE_ENV = 'production'

    expect(getServerSideURL()).toBe('https://www.cybernautme.com')
  })
})

describe('getCanonicalURL', () => {
  const originalEnv = { ...process.env }

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  it('adds a trailing slash to all non-root canonical paths', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.cybernautme.com'

    expect(getCanonicalURL('/cctv-support')).toBe('https://www.cybernautme.com/cctv-support/')
    expect(getCanonicalURL('/search')).toBe('https://www.cybernautme.com/search/')
    expect(getCanonicalURL('/posts')).toBe('https://www.cybernautme.com/posts/')
    expect(getCanonicalURL('/posts/page/2')).toBe('https://www.cybernautme.com/posts/page/2/')
    expect(getCanonicalURL('/posts/example-post/')).toBe(
      'https://www.cybernautme.com/posts/example-post/',
    )
  })
})

import { afterEach, describe, expect, it } from 'vitest'
import { getServerSideURL } from '../../src/utilities/getURL'

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

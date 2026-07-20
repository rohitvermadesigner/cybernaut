import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, expect, test } from 'vitest'

describe('service CTA background asset', () => {
  test('uses the public URL for the CCTV CTA background image', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/app/(frontend)/globals.css'), 'utf8')

    expect(css).toContain(
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/service-page/cctv-cta-section-bg.webp') top center no-repeat fixed",
    )
    expect(css).not.toContain("url('./images/service-page/cctv-cta-section-bg')")
  })
})

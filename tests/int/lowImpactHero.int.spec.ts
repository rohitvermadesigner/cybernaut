import { render } from '@testing-library/react'
import React from 'react'
import { describe, expect, test, vi } from 'vitest'

const richTextMock = vi.hoisted(() => vi.fn(() => null))

vi.mock('@/components/RichText', () => ({
  default: richTextMock,
}))

import { LowImpactHero } from '@/heros/LowImpact'

describe('LowImpactHero', () => {
  test('uses full width content on the cctv support page', () => {
    const { container } = render(
      React.createElement(
        LowImpactHero,
        { pageSlug: 'cctv-support' },
        React.createElement('p', null, 'CCTV Support Services'),
      ),
    )

    expect(container.querySelector('.w-full')).toBeTruthy()
    expect(container.querySelector('.max-w-\\[48rem\\]')).toBeFalsy()
  })

  test('adds full width image styling to cctv support hero rich text media', () => {
    richTextMock.mockClear()

    render(
      React.createElement(LowImpactHero, {
        pageSlug: 'cctv-support',
        richText: {
          root: {
            type: 'root',
            children: [],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        type: 'lowImpact',
      }),
    )

    const [richTextProps] = richTextMock.mock.calls[0] as unknown as [
      { mediaBlockImgClassName?: string; mediaBlockPictureClassName?: string },
    ]

    expect(richTextProps.mediaBlockImgClassName).toContain('w-full')
    expect(richTextProps.mediaBlockPictureClassName).toContain('mt-0')
    expect(richTextProps.mediaBlockPictureClassName).toContain('mb-0')
  })
})

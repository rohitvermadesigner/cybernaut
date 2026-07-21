import { render } from '@testing-library/react'
import React from 'react'
import { describe, expect, test, vi } from 'vitest'

const richTextMock = vi.hoisted(() =>
  vi.fn(
    ({
      data,
    }: {
      data: { root: { children: Array<{ fields?: { blockType?: string }; type: string }> } }
    }) =>
      React.createElement('div', {
        'data-node-types': data.root.children
          .map((child) => child.fields?.blockType ?? child.type)
          .join(','),
        'data-testid': 'rich-text',
      }),
  ),
)

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

  test('wraps text content without wrapping rich text media blocks', () => {
    richTextMock.mockClear()

    const { container } = render(
      React.createElement(LowImpactHero, {
        pageSlug: 'cctv-support',
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h1',
                version: 1,
              },
              {
                type: 'paragraph',
                children: [],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                textStyle: '',
                version: 1,
              },
              {
                type: 'block',
                fields: {
                  blockType: 'mediaBlock',
                  media: 1,
                },
                format: '',
                version: 2,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        type: 'lowImpact',
      }),
    )

    expect(container.querySelector('.inner-header.relative')).toBeTruthy()
    expect(
      container.querySelector('.inner-header-content [data-node-types="heading,paragraph"]'),
    ).toBeTruthy()
    expect(
      container.querySelector(
        '.inner-header-content > .inner-header-box [data-node-types="heading,paragraph"]',
      ),
    ).toBeTruthy()
    expect(
      container.querySelector('.inner-header-content [data-node-types="mediaBlock"]'),
    ).toBeFalsy()
    expect(container.querySelector('[data-node-types="mediaBlock"]')).toBeTruthy()

    const [contentRichTextProps, mediaRichTextProps] = richTextMock.mock.calls.map(
      ([props]) => props,
    ) as unknown as [
      {
        mediaBlockClassName?: string
        mediaBlockImgClassName?: string
        mediaBlockPictureClassName?: string
      },
      {
        mediaBlockImgClassName?: string
        mediaBlockPictureClassName?: string
      },
    ]

    expect(contentRichTextProps.mediaBlockClassName).toBeUndefined()
    expect(mediaRichTextProps.mediaBlockImgClassName).toContain('w-full')
    expect(mediaRichTextProps.mediaBlockPictureClassName).toContain('mt-0')
    expect(mediaRichTextProps.mediaBlockPictureClassName).toContain('mb-0')
  })
})

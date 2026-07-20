import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, test, vi } from 'vitest'

import RichText from '@/components/RichText'

vi.mock('@/blocks/MediaBlock/Component', () => ({
  MediaBlock: () => null,
}))

vi.mock('@/blocks/Code/Component', () => ({
  CodeBlock: () => null,
}))

vi.mock('@/blocks/HTML/Component', () => ({
  HTMLBlock: () => null,
}))

vi.mock('@/blocks/Banner/Component', () => ({
  BannerBlock: () => null,
}))

vi.mock('@/blocks/CallToAction/Component', () => ({
  CallToActionBlock: () => null,
}))

describe('RichText triangle CTA links', () => {
  test('renders triangle CTA appearance links with button classes and span wrapper', () => {
    render(
      React.createElement(RichText, {
        data: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'link',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Know More',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    fields: {
                      appearance: 'triangleCta',
                      linkType: 'custom',
                      newTab: false,
                      url: 'tel:800 292376288',
                    },
                    format: '',
                    indent: 0,
                    version: 2,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      }),
    )

    const link = screen.getByRole('link', { name: 'Know More' })
    const span = link.querySelector('span')

    expect(link.getAttribute('href')).toBe('tel:800 292376288')
    expect(link.classList.contains('triangle-cta')).toBe(true)
    expect(link.classList.contains('text-white')).toBe(true)
    expect(link.classList.contains('hover:text-black')).toBe(true)
    expect(link.classList.contains('py-3')).toBe(true)
    expect(link.classList.contains('px-6')).toBe(true)
    expect(link.classList.contains('mt-8')).toBe(true)
    expect(link.classList.contains('inline-block')).toBe(true)
    expect(span?.classList.contains('flex')).toBe(true)
    expect(span?.classList.contains('items-center')).toBe(true)
    expect(span?.classList.contains('gap-2')).toBe(true)
    expect(span?.textContent).toBe('Know More')
  })
})

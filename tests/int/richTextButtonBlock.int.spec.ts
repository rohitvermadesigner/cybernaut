import { render, screen } from '@testing-library/react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
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

describe('RichText button block', () => {
  test('renders inserted button blocks with the triangle CTA style', () => {
    render(
      React.createElement(RichText, {
        data: {
          root: {
            type: 'root',
            children: [
              {
                type: 'block',
                fields: {
                  blockType: 'buttonBlock',
                  label: 'Know More',
                  url: 'tel:800 292376288',
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
        } as unknown as DefaultTypedEditorState,
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

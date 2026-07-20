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

vi.mock('@/blocks/ButtonBlock/Component', () => ({
  ButtonBlock: () => null,
}))

describe('RichText FAQ block', () => {
  test('renders inserted FAQ blocks as a centered accordion section', () => {
    render(
      React.createElement(RichText, {
        data: {
          root: {
            type: 'root',
            children: [
              {
                type: 'block',
                fields: {
                  blockType: 'faqBlock',
                  heading: 'FREQUENTLY ASKED QUESTION',
                  intro:
                    'Explore answers to frequently asked questions about CCTV installation, maintenance, and security solutions for businesses in Dubai.',
                  items: [
                    {
                      question:
                        'What are the key benefits of CCTV installation in Dubai for businesses?',
                      answer:
                        'CCTV helps businesses improve visibility, deter theft, and monitor daily operations remotely.',
                    },
                    {
                      question:
                        'What should businesses consider when selecting a CCTV service provider?',
                      answer:
                        'Businesses should consider experience, support, system quality, and maintenance options.',
                    },
                  ],
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

    const section = screen.getByLabelText('FREQUENTLY ASKED QUESTION')
    const heading = screen.getByRole('heading', { name: 'FREQUENTLY ASKED QUESTION' })
    const accordionItems = section.querySelectorAll('details')

    expect(section.classList.contains('not-prose')).toBe(true)
    expect(section.classList.contains('bg-white')).toBe(true)
    expect(heading.classList.contains('uppercase')).toBe(true)
    expect(
      screen.getByText(
        'Explore answers to frequently asked questions about CCTV installation, maintenance, and security solutions for businesses in Dubai.',
      ),
    ).toBeTruthy()
    expect(
      screen.getByText('What are the key benefits of CCTV installation in Dubai for businesses?'),
    ).toBeTruthy()
    expect(accordionItems).toHaveLength(2)
  })
})

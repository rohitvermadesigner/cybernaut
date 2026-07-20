import { render } from '@testing-library/react'
import React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { Content as ContentConfig } from '@/blocks/Content/config'

vi.mock('@/components/RichText', () => ({
  default: () => null,
}))

vi.mock('@/components/Link', () => ({
  CMSLink: () => null,
}))

import { ContentBlock } from '@/blocks/Content/Component'

describe('Content section admin options', () => {
  test('exposes seven twelfths and five twelfths column sizes in Payload admin', () => {
    const columnsField = ContentConfig.fields.find((field) => 'name' in field && field.name === 'columns')
    const sizeField = columnsField && 'fields' in columnsField
      ? columnsField.fields.find((field) => 'name' in field && field.name === 'size')
      : undefined

    expect(sizeField).toEqual(
      expect.objectContaining({
        options: expect.arrayContaining([
          expect.objectContaining({
            label: 'Seven Twelfths',
            value: 'sevenTwelfths',
          }),
          expect.objectContaining({
            label: 'Five Twelfths',
            value: 'fiveTwelfths',
          }),
        ]),
      }),
    )
  })

  test('exposes section layout fields in Payload admin', () => {
    expect(ContentConfig.fields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'fullWidthSection',
          type: 'checkbox',
        }),
        expect.objectContaining({
          name: 'backgroundColor',
          type: 'select',
        }),
        expect.objectContaining({
          name: 'customClass',
          type: 'text',
        }),
      ]),
    )
  })

  test('renders a full width section with configurable background and custom class around columns', () => {
    const { container } = render(
      React.createElement(ContentBlock, {
        backgroundColor: 'white',
        blockType: 'content',
        customClass: 'cctv-support-intro-section',
        fullWidthSection: true,
        columns: [
          {
            size: 'oneThird',
          },
          {
            size: 'twoThirds',
          },
        ],
      }),
    )

    const section = container.querySelector('section')

    expect(section?.className).toContain('w-full')
    expect(section?.className).toContain('bg-white')
    expect(section?.className).toContain('cctv-support-intro-section')
    expect(section?.querySelector('.container')).toBeTruthy()
  })

  test('renders seven twelfths and five twelfths column spans', () => {
    const { container } = render(
      React.createElement(ContentBlock, {
        blockType: 'content',
        columns: [
          {
            size: 'sevenTwelfths',
          },
          {
            size: 'fiveTwelfths',
          },
        ],
      }),
    )

    expect(container.querySelector('.lg\\:col-span-7')).toBeTruthy()
    expect(container.querySelector('.lg\\:col-span-5')).toBeTruthy()
  })
})

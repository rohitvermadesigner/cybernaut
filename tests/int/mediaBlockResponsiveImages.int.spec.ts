import { render } from '@testing-library/react'
import React from 'react'
import { describe, expect, test, vi } from 'vitest'

import { MediaBlock as MediaBlockConfig } from '@/blocks/MediaBlock/config'

const mediaMock = vi.hoisted(() => vi.fn((_props: Record<string, unknown>) => null))

vi.mock('@/components/Media', () => ({
  Media: mediaMock,
}))

vi.mock('@/components/RichText', () => ({
  default: () => null,
}))

import { MediaBlock } from '@/blocks/MediaBlock/Component'

describe('MediaBlock responsive images', () => {
  test('exposes desktop and mobile image uploads in Payload admin', () => {
    expect(MediaBlockConfig.fields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Desktop image',
          name: 'media',
          relationTo: 'media',
          type: 'upload',
        }),
        expect.objectContaining({
          label: 'Mobile image',
          name: 'mobileMedia',
          relationTo: 'media',
          type: 'upload',
        }),
      ]),
    )
  })

  test('renders mobile below md and desktop at md when mobile image exists', () => {
    mediaMock.mockClear()

    render(
      React.createElement(MediaBlock, {
        blockType: 'mediaBlock',
        media: 'desktop-media',
        mobileMedia: 'mobile-media',
      }),
    )

    expect(mediaMock).toHaveBeenCalledTimes(2)
    expect(mediaMock.mock.calls[0][0]).toMatchObject({
      pictureClassName: 'block md:hidden',
      resource: 'mobile-media',
    })
    expect(mediaMock.mock.calls[1][0]).toMatchObject({
      pictureClassName: 'hidden md:block',
      resource: 'desktop-media',
    })
  })

  test('renders only the desktop image when mobile image is empty', () => {
    mediaMock.mockClear()

    render(
      React.createElement(MediaBlock, {
        blockType: 'mediaBlock',
        media: 'desktop-media',
      }),
    )

    expect(mediaMock).toHaveBeenCalledTimes(1)
    expect(mediaMock.mock.calls[0][0]).toMatchObject({
      pictureClassName: undefined,
      resource: 'desktop-media',
    })
  })
})

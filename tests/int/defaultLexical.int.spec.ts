import { describe, expect, test } from 'vitest'

import { ButtonBlock } from '@/blocks/ButtonBlock/config'
import { FAQBlock } from '@/blocks/FAQBlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { defaultLexical } from '@/fields/defaultLexical'

type ResolvedBlock = {
  slug: string
}

describe('defaultLexical editor', () => {
  test('allows inserting media, button, and FAQ blocks', async () => {
    const adapter = await defaultLexical({
      config: {
        collections: [
          { slug: 'pages' },
          { slug: 'posts' },
          { slug: 'media' },
        ],
        i18n: {
          translations: {},
        },
      } as Parameters<typeof defaultLexical>[0]['config'],
      isRoot: true,
      parentIsLocalized: false,
    })

    const blocksFeature = adapter.features.find((feature) => feature.key === 'blocks')
    const blockSlugs = (blocksFeature?.serverFeatureProps?.blocks as ResolvedBlock[] | undefined)?.map(
      (block) => block.slug,
    )

    expect(blockSlugs).toContain(MediaBlock.slug)
    expect(blockSlugs).toContain(ButtonBlock.slug)
    expect(blockSlugs).toContain(FAQBlock.slug)
  })

  test('allows inserting ordered and unordered lists', async () => {
    const adapter = await defaultLexical({
      config: {
        collections: [
          { slug: 'pages' },
          { slug: 'posts' },
          { slug: 'media' },
        ],
        i18n: {
          translations: {},
        },
      } as Parameters<typeof defaultLexical>[0]['config'],
      isRoot: true,
      parentIsLocalized: false,
    })

    const featureKeys = adapter.features.map((feature) => feature.key)

    expect(featureKeys).toContain('orderedList')
    expect(featureKeys).toContain('unorderedList')
  })

  test('allows applying text colors', async () => {
    const adapter = await defaultLexical({
      config: {
        collections: [
          { slug: 'pages' },
          { slug: 'posts' },
          { slug: 'media' },
        ],
        i18n: {
          translations: {},
        },
      } as Parameters<typeof defaultLexical>[0]['config'],
      isRoot: true,
      parentIsLocalized: false,
    })

    const textStateFeature = adapter.features.find((feature) => feature.key === 'textState')

    expect(textStateFeature?.serverFeatureProps).toMatchObject({
      state: {
        color: expect.objectContaining({
          'text-black': expect.any(Object),
          'text-blue': expect.any(Object),
          'text-red': expect.any(Object),
          'text-white': expect.any(Object),
        }),
      },
    })
  })

  test('allows selecting a triangle CTA link appearance', async () => {
    const adapter = await defaultLexical({
      config: {
        collections: [
          { slug: 'pages' },
          { slug: 'posts' },
          { slug: 'media' },
        ],
        i18n: {
          translations: {},
        },
      } as Parameters<typeof defaultLexical>[0]['config'],
      isRoot: true,
      parentIsLocalized: false,
    })

    const linkFeature = adapter.features.find((feature) => feature.key === 'link')
    const linkFields = linkFeature?.serverFeatureProps?.fields as Array<Record<string, unknown>> | undefined
    const appearanceField = linkFields?.find((field) => field.name === 'appearance')

    expect(appearanceField).toMatchObject({
      type: 'select',
      options: expect.arrayContaining([
        expect.objectContaining({
          label: 'Triangle CTA',
          value: 'triangleCta',
        }),
      ]),
    })
  })
})

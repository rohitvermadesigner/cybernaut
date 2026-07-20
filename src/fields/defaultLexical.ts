import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  BlocksFeature,
  defaultColors,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  TextStateFeature,
  lexicalEditor,
  UnderlineFeature,
  UnorderedListFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'
import { ButtonBlock } from '@/blocks/ButtonBlock/config'
import { FAQBlock } from '@/blocks/FAQBlock/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'

export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    TextStateFeature({
      state: {
        color: {
          'text-black': {
            css: {
              color: '#000000',
            },
            label: 'Black',
          },
          'text-white': {
            css: {
              color: '#ffffff',
            },
            label: 'White',
          },
          ...defaultColors.text,
        },
      },
    }),
    BlocksFeature({ blocks: [MediaBlock, ButtonBlock, FAQBlock] }),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
          {
            name: 'appearance',
            type: 'select',
            defaultValue: 'default',
            label: 'Appearance',
            options: [
              {
                label: 'Default',
                value: 'default',
              },
              {
                label: 'Triangle CTA',
                value: 'triangleCta',
              },
            ],
          },
        ]
      },
    }),
  ],
})

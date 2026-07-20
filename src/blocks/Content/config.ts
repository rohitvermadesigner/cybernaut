import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Seven Twelfths',
        value: 'sevenTwelfths',
      },
      {
        label: 'Five Twelfths',
        value: 'fiveTwelfths',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'fullWidthSection',
      type: 'checkbox',
      defaultValue: false,
      label: 'Full width section',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'transparent',
      label: 'Background color',
      options: [
        {
          label: 'Transparent',
          value: 'transparent',
        },
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
        {
          label: 'Teal',
          value: 'teal',
        },
      ],
    },
    {
      name: 'customClass',
      type: 'text',
      label: 'Custom class',
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}

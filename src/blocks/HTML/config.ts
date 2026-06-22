import type { Block } from 'payload'

export const HTML: Block = {
  slug: 'html',
  interfaceName: 'HTMLBlock',
  labels: {
    plural: 'HTML sections',
    singular: 'HTML section',
  },
  fields: [
    {
      name: 'html',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
      },
    },
  ],
}

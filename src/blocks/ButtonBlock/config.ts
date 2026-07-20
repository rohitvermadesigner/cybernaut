import type { Block } from 'payload'

export const ButtonBlock: Block = {
  slug: 'buttonBlock',
  interfaceName: 'ButtonBlock',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: 'Know More',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      defaultValue: 'tel:800 292376288',
      required: true,
    },
    {
      name: 'newTab',
      type: 'checkbox',
      defaultValue: false,
      label: 'Open in new tab',
    },
  ],
  labels: {
    plural: 'Buttons',
    singular: 'Button',
  },
}

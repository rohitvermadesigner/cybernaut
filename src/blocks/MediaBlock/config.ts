import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      label: 'Desktop image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mobileMedia',
      label: 'Mobile image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

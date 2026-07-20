import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'FREQUENTLY ASKED QUESTION',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      defaultValue:
        'Explore answers to frequently asked questions about CCTV installation, maintenance, and security solutions for businesses in Dubai.',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'FAQ Item',
        plural: 'FAQ Items',
      },
      defaultValue: [
        {
          question: 'What are the key benefits of CCTV installation in Dubai for businesses?',
          answer:
            'CCTV installation helps businesses improve security, monitor daily operations, deter theft, and access real-time footage when needed.',
        },
        {
          question: 'What should businesses consider when selecting a CCTV service provider?',
          answer:
            'Businesses should look for reliable equipment, professional installation, maintenance support, and a provider that understands their security requirements.',
        },
        {
          question: 'Do CCTV camera setup offer remote monitoring?',
          answer:
            'Yes. Modern CCTV systems can provide secure remote access from a phone, laptop, or desktop so teams can monitor key areas away from site.',
        },
        {
          question: 'How can Cybernaut assist in CCTV installation and maintenance in Dubai?',
          answer:
            'Cybernaut can help with planning, installation, configuration, maintenance, and support for CCTV systems tailored to business needs.',
        },
        {
          question:
            'What makes commercial CCTV installation in Dubai different from residential CCTV systems?',
          answer:
            'Commercial CCTV systems usually require broader coverage, scalable recording, access controls, and support for larger operational environments.',
        },
      ],
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}

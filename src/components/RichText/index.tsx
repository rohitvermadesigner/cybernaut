import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { HTMLBlock, HTMLBlockProps } from '@/blocks/HTML/Component'
import { ButtonBlock } from '@/blocks/ButtonBlock/Component'
import { FAQBlock, type FAQBlockProps } from '@/blocks/FAQBlock/Component'

import type {
  BannerBlock as BannerBlockProps,
  ButtonBlock as ButtonBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | HTMLBlockProps
      | ButtonBlockProps
      | FAQBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const getLinkHref = (node: SerializedLinkNode) => {
  if (node.fields.linkType === 'internal') {
    return internalDocToHref({ linkNode: node })
  }

  return node.fields.url ?? ''
}

const createJSXConverters =
  ({
    mediaBlockImgClassName,
    mediaBlockPictureClassName,
  }: {
    mediaBlockImgClassName?: string
    mediaBlockPictureClassName?: string
  }): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => {
    const linkConverters = LinkJSXConverter({ internalDocToHref })

    return {
      ...defaultConverters,
      ...linkConverters,
      link: ({ node, nodesToJSX }) => {
        const children = nodesToJSX({ nodes: node.children })
        const newTabProps = node.fields.newTab
          ? { rel: 'noopener noreferrer', target: '_blank' }
          : {}

        if (node.fields.appearance !== 'triangleCta') {
          return (
            <a href={getLinkHref(node)} {...newTabProps}>
              {children}
            </a>
          )
        }

        return (
          <Link
            className="triangle-cta text-white hover:text-black py-3 px-6 mt-8 inline-block"
            style={{ textDecoration: 'none' }}
            href={getLinkHref(node)}
            {...newTabProps}
          >
            <span className="flex items-center gap-2">{children}</span>
          </Link>
        )
      },
      blocks: {
        banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
        buttonBlock: ({ node }: { node: SerializedBlockNode<ButtonBlockProps> }) => (
          <ButtonBlock {...node.fields} />
        ),
        faqBlock: ({ node }: { node: SerializedBlockNode<FAQBlockProps> }) => (
          <FAQBlock {...node.fields} />
        ),
        mediaBlock: ({ node }) => (
          <MediaBlock
            className="col-start-1 col-span-3"
            imgClassName={cn('m-0', mediaBlockImgClassName)}
            pictureClassName={mediaBlockPictureClassName}
            {...node.fields}
            captionClassName="mx-auto max-w-[48rem]"
            enableGutter={false}
            disableInnerContainer={true}
          />
        ),
        code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
        html: ({ node }) => <HTMLBlock className="col-start-2" {...node.fields} />,
        cta: ({ node }) => <CallToActionBlock {...node.fields} />,
      },
    }
  }

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  mediaBlockImgClassName?: string
  mediaBlockPictureClassName?: string
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const {
    className,
    enableProse = true,
    enableGutter = true,
    mediaBlockImgClassName,
    mediaBlockPictureClassName,
    ...rest
  } = props
  return (
    <ConvertRichText
      converters={createJSXConverters({ mediaBlockImgClassName, mediaBlockPictureClassName })}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}

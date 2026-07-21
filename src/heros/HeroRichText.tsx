import React from 'react'

import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'

type RichTextData = NonNullable<Page['hero']['richText']>
type RichTextChild = RichTextData['root']['children'][number]

const isMediaBlockNode = (node: RichTextChild) => {
  if (node.type !== 'block' || !('fields' in node)) return false

  const fields = node.fields as { blockType?: string }
  return fields.blockType === 'mediaBlock'
}

const withChildren = (data: RichTextData, children: RichTextChild[]): RichTextData => ({
  ...data,
  root: {
    ...data.root,
    children,
  },
})

type Props = {
  contentClassName?: string
  mediaBlockImgClassName?: string
  mediaBlockPictureClassName?: string
  richText: RichTextData
}

export const HeroRichText: React.FC<Props> = ({
  contentClassName,
  mediaBlockImgClassName,
  mediaBlockPictureClassName,
  richText,
}) => {
  const textChildren = richText.root.children.filter((node) => !isMediaBlockNode(node))
  const mediaChildren = richText.root.children.filter(isMediaBlockNode)

  return (
    <>
      {textChildren.length > 0 && (
        <div className={cn('inner-header-content', contentClassName)}>
          <div className="inner-header-box">
            <RichText data={withChildren(richText, textChildren)} enableGutter={false} />
          </div>
        </div>
      )}
      {mediaChildren.length > 0 && (
        <RichText
          data={withChildren(richText, mediaChildren)}
          enableGutter={false}
          mediaBlockImgClassName={mediaBlockImgClassName}
          mediaBlockPictureClassName={mediaBlockPictureClassName}
        />
      )}
    </>
  )
}

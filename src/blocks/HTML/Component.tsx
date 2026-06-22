import React from 'react'

export type HTMLBlockProps = {
  blockType: 'html'
  html: string
}

type Props = HTMLBlockProps & {
  className?: string
}

export const HTMLBlock: React.FC<Props> = ({ className, html }) => {
  if (!html) return null

  return <section className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

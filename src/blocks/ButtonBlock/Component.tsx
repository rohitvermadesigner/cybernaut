import Link from 'next/link'
import React from 'react'

export type ButtonBlockProps = {
  label: string
  newTab?: boolean | null
  url: string
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ label, newTab, url }) => {
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  return (
    <Link
      className="triangle-cta text-white hover:text-black py-3 px-6 mt-8 inline-block"
      style={{ textDecoration: 'none' }}
      href={url}
      {...newTabProps}
    >
      <span className="flex items-center gap-2">{label}</span>
    </Link>
  )
}

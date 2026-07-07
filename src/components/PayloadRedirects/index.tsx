import type React from 'react'

import { notFound } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* Middleware handles Payload redirects so they can return HTTP 302. */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound }) => {
  if (disableNotFound) return null

  notFound()
}

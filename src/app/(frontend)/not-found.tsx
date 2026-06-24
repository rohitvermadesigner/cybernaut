import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found - Cybernaut',
}

export default function NotFound() {
  return (
    <div className="container py-28 text-white">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Button asChild variant="default" className="bg-white text-black hover:bg-gray-200">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}

import type { Metadata } from 'next'
import { Roboto_Condensed } from 'next/font/google'
import localFont from 'next/font/local'

import { cn } from '@/utilities/ui'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { GoogleTagManager } from '@next/third-parties/google'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import SmoothScrollProvider from './components/SmoothScrollProvider'

const graphie = localFont({
  src: [
    {
      path: '../../../public/fonts/graphie-extraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/graphie-regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-body',
})

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(graphie.variable, robotoCondensed.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body className="bg-[url('/images/bg-m.png')] md:bg-[url('/images/bg.png')] bg-top bg-center bg-cover bg-no-repeat bg-fixed">
        <GoogleTagManager gtmId="GTM-TBCXRKFK" />
        <InitTheme />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),

  title: {
    default: 'IT Support Company in Dubai | Cybernaut',
    template: '%s | Cybernaut',
  },

  description:
    'Cybernaut is a leading IT company in Dubai providing customized IT support and services. Boost your business productivity and continuity with our solutions.',

  alternates: {
    canonical: 'https://www.cybernautme.com/',
  },

  openGraph: {
    type: 'website',
    url: 'https://www.cybernautme.com',
    title: 'IT Support Company in Dubai | Services & Solutions - Cybernaut',
    description:
      'Cybernaut is a leading IT company in Dubai providing customized IT support and services. Boost your business productivity and continuity with our solutions.',
    siteName: 'Cybernaut',
    locale: 'en_US',
    images: [
      {
        url: 'https://cybernaut.excellenceauditing.net/images/hero/video-bg.png',
        width: 1200,
        height: 630,
        alt: 'Cybernaut corporate IT branding banner featuring offered services',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'IT Support Company in Dubai | Services & Solutions - Cybernaut',
    description:
      'Cybernaut is a leading IT company in Dubai providing customized IT support and services. Boost your business productivity and continuity with our solutions.',
    images: [
      {
        url: 'https://cybernaut.excellenceauditing.net/images/hero/video-bg.png',
        alt: 'Cybernaut corporate IT branding banner featuring offered services',
      },
    ],
  },
}

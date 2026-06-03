'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string[]>([])
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme])

  return (
    <header
      className="relative z-20 shadow-md bg-[linear-gradient(90deg,#0c2430,#081014)] text-white backdrop-blur-sm"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="py-2 flex flex-col md:flex-row justify-between items-center px-4 container">
        <div className="flex justify-between w-full md:w-auto items-center">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={95}
              height={72}
              className="w-[95px] md:w-[95px]"
            />
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen((current) => !current)
              setOpenDropdown([])
            }}
            className="block md:hidden text-black bg-[#FFFFFF] rounded-md p-2"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <HeaderNav data={data} mobileMenuOpen={mobileMenuOpen} />
      </div>
    </header>
  )
}

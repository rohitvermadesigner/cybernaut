'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'
import Image from 'next/image'
import { Menu, Phone, X } from 'lucide-react'

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
      className="sticky top-0 z-100 shadow-md bg-[linear-gradient(90deg,rgba(12,36,48,0.8),rgba(8,16,20,0.8))] text-white backdrop-blur-sm"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="py-2 flex flex-col md:flex-row justify-between items-center px-4 container">
        <div className="flex justify-between w-full md:w-auto items-center">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={70}
              height={53}
              className="w-[70px] md:w-[95px]"
            />
          </Link>
          <div className="flex items-center gap-4">
            <ul className={` block md:hidden  flex md:flex gap-4`}>
              <li>
                <Link
                  href="tel:800 292376288"
                  target="_blank"
                  className="triangle-cta text-white py-2 px-4 block text-sm"
                >
                  <span className="flex items-center gap-2 uppercase">
                    <Phone className="w-5" /> 800 Cybernaut
                  </span>
                </Link>
              </li>
            </ul>
            <button
              onClick={() => {
                setMobileMenuOpen((current) => !current)
                setOpenDropdown([])
              }}
              className="block md:hidden text-white"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <HeaderNav
          data={data}
          mobileMenuOpen={mobileMenuOpen}
          onNavigate={() => setMobileMenuOpen(false)}
        />
      </div>
    </header>
  )
}

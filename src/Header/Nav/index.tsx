'use client'
import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { FaPhoneAlt } from 'react-icons/fa'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'

export const HeaderNav: React.FC<{
  data: HeaderType
  mobileMenuOpen: boolean
  onNavigate?: () => void
}> = ({ data, mobileMenuOpen, onNavigate }) => {
  const navItems = data?.navItems || []

  return (
    <>
      <nav
        className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row md:gap-4 lg:gap-8 md:items-center w-full md:w-auto mt-4 md:mt-0`}
        onClick={() => {
          if (mobileMenuOpen) onNavigate?.()
        }}
      >
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="relative 
    text-[#FFF]
    uppercase
    md:text-xs
    lg:text-sm
    justify-start
    md:justify-center
    border-[#ccc]
    block
    rounded-none
    py-2
    md:py-0
    transition-all
    duration-300
    hover:text-[#CCC]
"
            />
          )
        })}
      </nav>
      <ul className={` hidden md:block flex md:flex gap-4 mt-3 md:mt-0`}>
        <li>
          <Link
            href="tel:800 292376288"
            target="_blank"
            className="triangle-cta text-white py-3 px-6 block"
          >
            <span className="flex items-center gap-2 uppercase md:text-sm lg:text-base">
              <FaPhoneAlt className="w-5" /> 800 Cybernaut
            </span>
          </Link>
        </li>
      </ul>
    </>
  )
}

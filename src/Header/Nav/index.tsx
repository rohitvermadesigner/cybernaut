'use client'
import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'

export const HeaderNav: React.FC<{ data: HeaderType; mobileMenuOpen: boolean }> = ({
  data,
  mobileMenuOpen,
}) => {
  const navItems = data?.navItems || []

  return (
    <>
      <nav
        className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row md:gap-8 md:items-center w-full md:w-auto mt-4 md:mt-0`}
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
    text-sm
    justify-start
    md:justify-center
    border-b-[1px]
    md:border-0
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
            href="https://wa.me/97145570410"
            target="_blank"
            className="triangle-cta text-white py-3 px-6 block"
          >
            <span className="flex items-center gap-2">Get Started</span>
          </Link>
        </li>
      </ul>
    </>
  )
}

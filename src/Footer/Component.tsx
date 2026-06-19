import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { CMSLink } from '@/components/Link'

const socialLinks = [
  {
    href: 'https://www.linkedin.com/company/cybernautme/',
    label: 'LinkedIn',
    rel: 'nofollow',
    icon: FaLinkedinIn,
  },
  {
    href: 'https://www.youtube.com/@ExcellenceGroup-nt4ml',
    label: 'YouTube',
    rel: 'nofollow',
    icon: FaYoutube,
  },
  {
    href: 'https://www.facebook.com/cybernautme/',
    label: 'Facebook',
    rel: 'nofollow',
    icon: FaFacebookF,
  },
  {
    href: 'https://www.instagram.com/cybernautme/',
    label: 'Instagram',
    rel: 'nofollow',
    icon: FaInstagram,
  },
]

const contactItems = [
  {
    icon: Mail,
    label: 'info@cybernautme.com',
    href: 'mailto:info@cybernautme.com',
  },
  {
    icon: Phone,
    label: '800 292376288',
    href: 'tel:800 292376288',
  },
  {
    icon: MapPin,
    label: '3503-3507, 35th Floor, HDS Tower Cluster F, Jumeirah Lake Towers Dubai, UAE',
    href: 'https://www.google.com/maps?ll=25.072278,55.142356&z=16&t=m&hl=en&gl=IN&mapclient=embed&cid=6568451472771036234',
  },
]

export async function Footer() {
  const headerData = await getCachedGlobal('header', 1)()
  const navItems = headerData?.navItems || []

  return (
    <footer
      className="mt-auto overflow-hidden border-t-1 border-white/10 text-[#90A1B9]"
      id="contact"
    >
      <div className="relative">
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_28%,rgba(26,152,213,0.16),transparent_30%),radial-gradient(circle_at_76%_24%,rgba(26,152,213,0.14),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,32,40,0.92),rgba(3,10,13,0.98)_48%,rgba(0,0,0,1))]" /> */}

        <div className="container relative z-10 px-6 py-12 sm:py-6 lg:px-8 lg:pt-12">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_1.15fr_1.1fr] lg:gap-16 xl:gap-24">
            <section className="max-w-[260px]">
              <Link
                href="/"
                aria-label="Cybernaut home"
                className="inline-flex flex-col items-start"
              >
                <Image
                  src="/images/logo.svg"
                  alt="Cybernaut Tech Services"
                  width={150}
                  height={124}
                  className="object-contain"
                  style={{ width: '132px', height: 'auto' }}
                />
              </Link>

              <p className="mt-5 text-[0.95rem]">
                Navigating the digital frontier with innovative IT services for modern businesses.
              </p>

              <div className="mt-7 flex gap-4">
                {socialLinks.map(({ href, label, rel, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    rel={rel}
                    target="_blank"
                    className="grid h-10 w-10 place-items-center rounded-[12px] bg-[#27b7f6] text-white shadow-[0_10px_24px_rgba(39,183,246,0.2)] transition hover:bg-white hover:text-[#1a98d5] duration-300"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <FooterHeading title="Quick Links" />
              <nav className="mt-7 flex flex-col gap-4">
                {/* {quickLinks.map((item) => (
                  <Link
                    key={item}
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    // href={href}
                    className="group flex items-center gap-3 text-[0.95rem] text-[#90A1B9] transition hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#25bdfb] transition group-hover:scale-125" />
                    {item}
                  </Link>
                ))} */}

                {navItems.map(({ link }, i) => {
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance="link"
                      className="relative 
                    text-[#90A1B9]
                    text-sm
                    justify-start
                    md:justify-center
                    block
                    transition-all
                    duration-300
                    hover:text-[#CCC]
                "
                    />
                  )
                })}
              </nav>
            </section>

            <section>
              <FooterHeading title="Contact Us" />
              <div className="mt-7 flex flex-col gap-5">
                {contactItems.map(({ icon: Icon, label, href }) => {
                  const content = (
                    <>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#283439] text-[#27b7f6]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span
                        className={`text-[0.92rem] leading-6 text-[#90A1B9] ${href ? 'hover:text-white' : ''}`}
                      >
                        {label}
                      </span>
                    </>
                  )

                  return href ? (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      className="flex items-center gap-4"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={label} className="flex items-start gap-4">
                      {content}
                    </div>
                  )
                })}
              </div>
            </section>

            <section>
              <div className="h-[280px] w-full overflow-hidden rounded-[10px] border border-[#526886] bg-[#d9d9d9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.873459692153!2d55.142355900000005!3d25.0722777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6daf115414d9%3A0x5b27d3d036e8b44a!2sCybernaut!5e0!3m2!1sen!2sin!4v1762512081922!5m2!1sen!2sin"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
            </section>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-[0.84rem] text-white/52">
            © 2026 Cybernaut. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-5 w-[3px] rounded-full bg-[#25bdfb]" />
      <h2 className="font-roboto-condensed text-lg font-bold text-white uppercase">{title}</h2>
    </div>
  )
}

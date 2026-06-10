'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

const aboutSlides = 2

const values = [
  {
    image: '/images/about/expertise.png',
    title: 'Expertise',
    description:
      'We know our way around the IT services world and we understand the difference between a...',
  },
  {
    image: '/images/about/client-centric.png',
    title: 'Client-Centric',
    description:
      'If the solution doesn’t fit, you must rethink. Our team understands the pace and rhythm that...',
  },
  {
    image: '/images/about/cost-effective.png',
    title: 'Cost-Effective',
    description:
      'Overspending on IT support are now yesteryear problems. In the 21st century, good IT support...',
  },
]

const movingValue = values[1]

const MobileAboutSection = () => (
  <section
    aria-label="About Cybernaut mobile"
    className="relative overflow-hidden bg-cover bg-top bg-center px-8 pb-8 pt-8 text-white md:hidden"
    style={{
      minHeight: '529px',
      backgroundImage: "url('/images/about/about-bg-mobile.png')",
    }}
  >
    <div
      className="absolute"
      style={{
        zIndex: 5,
        right: '0px',
        bottom: '-28px',
        width: '220px',
        height: '310px',
      }}
    >
      <Image
        src="/images/about/client-centric.png"
        alt=""
        fill
        sizes="260px"
        className="object-contain object-bottom"
        aria-hidden="true"
      />
    </div>

    <div className="relative max-w-[430px]" style={{ zIndex: 10 }}>
      <p className="mb-4 text-xl font-extralight uppercase leading-none tracking-normal text-[#27b7f6]">
        About Us
      </p>
      <h2
        className="font-roboto-condensed font-extrabold uppercase tracking-normal"
        style={{ fontSize: '1.95rem', lineHeight: 1.12 }}
      >
        Because your business
      </h2>
      <p
        className="mt-4 text-white/94"
        style={{ maxWidth: '395px', fontSize: '1.04rem', lineHeight: 1.58 }}
      >
        Cybernaut is in pursuit of becoming the pre-eminent technology solutions provider under the
        corporate group of Excellence. We&apos;re not just about ticking boxes or using the latest
        IT jargon; we&apos;re your trusted partner on this thrilling journey through the dynamic
        digital landscape.
      </p>
      <Link
        href="about"
        target="_blank"
        className="triangle-cta mt-5 inline-block px-6 py-3 text-base font-medium text-white"
      >
        <span>Know More</span>
      </Link>
    </div>
  </section>
)

export const AboutSection = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isSlideTwoExiting, setIsSlideTwoExiting] = useState(false)
  const activeSlideRef = useRef(activeSlide)
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wheelLockRef = useRef(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    activeSlideRef.current = activeSlide
  }, [activeSlide])

  const goToSlide = useCallback((direction: 1 | -1) => {
    const currentSlide = activeSlideRef.current
    const nextSlide = Math.min(Math.max(currentSlide + direction, 0), aboutSlides - 1)

    if (nextSlide !== currentSlide) {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current)
        exitTimeoutRef.current = null
      }

      if (currentSlide === 1 && nextSlide === 0) {
        setIsSlideTwoExiting(true)
        exitTimeoutRef.current = setTimeout(() => {
          setIsSlideTwoExiting(false)
          exitTimeoutRef.current = null
        }, 800)
      } else {
        setIsSlideTwoExiting(false)
      }

      activeSlideRef.current = nextSlide
      setActiveSlide(nextSlide)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleWheel = (event: WheelEvent) => {
      const currentSlide = activeSlideRef.current
      const isScrollingDown = event.deltaY > 0
      const isScrollingUp = event.deltaY < 0
      const canMoveDown = isScrollingDown && currentSlide < aboutSlides - 1
      const canMoveUp = isScrollingUp && currentSlide > 0

      if (!canMoveDown && !canMoveUp) return

      event.preventDefault()

      if (wheelLockRef.current) return

      wheelLockRef.current = true
      goToSlide(isScrollingDown ? 1 : -1)

      window.setTimeout(() => {
        wheelLockRef.current = false
      }, 900)
    }

    section.addEventListener('wheel', handleWheel, { passive: false })

    return () => section.removeEventListener('wheel', handleWheel)
  }, [goToSlide])

  return (
    <>
      <MobileAboutSection />
      <section
        ref={sectionRef}
        aria-label="About Cybernaut"
        className="relative hidden h-[calc(100vh-88px)] min-h-[720px] overflow-hidden bg-[url('/images/bg.png')] bg-cover text-[#FFF] md:block"
      >
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            activeSlide === 0
              ? 'z-10 opacity-100'
              : 'pointer-events-none z-0 -translate-x-10 opacity-0'
          }`}
          aria-hidden={activeSlide !== 0}
        >
          <div className="container flex h-full flex-col justify-center py-16">
            <div className="text-center">
              <p className="mb-5 text-2xl font-bold uppercase text-[var(--skyBlue)] font-extralight">
                About Cybernaut
              </p>
              <h2 className="mx-auto max-w-5xl text-balance text-4xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl font-roboto-condensed">
                Safeguarding your business against downtime and cyber threats.
              </h2>
            </div>

            <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,390px)_minmax(0,1fr)]">
              <div className="text-lg leading-8 mt-24">
                <p className="text-2xl">
                  Helping them stay on course while we take care of the blinking router side of your
                  operations in the background.
                </p>
                <p className="font-thin tracking-wider mt-4">
                  We understand that a lot of time and energy is lost to IT issues that shouldn’t
                  have flared up in the first place. To thrive in a digital-first ecosystem,
                  Cybernaut becomes your ace in the hole.
                </p>
              </div>

              <div className="relative mx-auto h-[480px] w-full max-w-[390px]" aria-hidden="true" />

              <div className="text-lg leading-8 mt-24 ml-10 ">
                <p className="font-thin tracking-wider">
                  A leading IT Company in Dubai, Cybernaut has designed IT solutions with a belief
                  that productivity and continuity keeps your business on track.
                </p>
                <Link
                  href="about"
                  target="_blank"
                  className="triangle-cta text-white py-3 px-6 mt-8 inline-block"
                >
                  <span className="flex items-center gap-2">Know More</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            activeSlide === 1 || isSlideTwoExiting
              ? 'z-10 opacity-100'
              : 'pointer-events-none z-0 translate-x-10 opacity-0'
          } ${isSlideTwoExiting ? 'pointer-events-none' : ''}`}
          aria-hidden={activeSlide !== 1}
        >
          <div
            className={`absolute inset-0 ${
              activeSlide === 1
                ? 'about-slide-two-background'
                : isSlideTwoExiting
                  ? 'about-slide-two-background about-slide-two-background--exit'
                  : ''
            }`}
            aria-hidden="true"
          />
          {activeSlide === 1 && (
            <div className="container relative z-10 flex h-full flex-col py-12">
              <div className="text-center about-values-copy">
                <p className="mb-4 text-2xl uppercase text-[#000] font-extralight">CORE VALUES</p>
                <h2 className="mx-auto max-w-5xl text-balance text-4xl font-extrabold uppercase leading-tight sm:text-5xl text-black font-roboto-condensed">
                  What Makes Cybernaut Different
                </h2>
                <p className="mx-auto max-w-3xl text-xl text-gray-800 ">
                  Our dedicated IT helpdesk professionals ensure uninterrupted functioning of <br />
                  your digital infrastructure.
                </p>
              </div>

              <div className="mt-2 grid gap-6 md:grid-cols-3 lg:gap-8 p-24">
                {values.map((value, index) =>
                  index === 1 ? (
                    <div key={value.title} aria-hidden="true" />
                  ) : (
                    <article
                      key={value.title}
                      className="about-value-card about-value-card--active rounded-[14px] bg-[url(/images/about/card-bg.png)] bg-cover bg-top bg-center bg-no-repeat py-10 px-5 shadow-[0_20px_60px_rgba(37,31,93,0.12)] w-[90%] mx-auto border-4 border-[#ccc] min-h-[300px]"
                      style={{ '--about-card-delay': `${index * 120}ms` } as CSSProperties}
                    >
                      <div className="relative h-52 overflow-hidden rounded-[22px]">
                        <Image
                          src={value.image}
                          alt={value.title}
                          fill
                          sizes="(min-width: 768px) 30vw, 90vw"
                          className="object-contain"
                        />
                      </div>
                      <div className="px-2 pb-3 pt-6 text-center">
                        <h3 className="text-2xl font-medium text-[#fff]">{value.title}</h3>
                        <p className="mt-3 text-[#fff] font-thin tracking-wider">
                          {value.description}
                        </p>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        <article
          className={`about-moving-card pointer-events-none absolute z-20 rounded-[14px] bg-[url(/images/about/card-bg-center.png)] bg-top bg-center bg-no-repeat border-4 border-[#ccc] p-5 shadow-[0_20px_60px_rgba(37,31,93,0.12)] ${
            activeSlide === 1
              ? 'about-moving-card--details bg-[url(/images/bg.png)] bg-[center_top_-200px] py-10 px-5 w-80 h-[30rem] -mt-20'
              : 'about-moving-card--intro w-96 h-[40rem] mt-16 bg-[url(/images/about/card-bg-center.png)] px-16'
          }`}
        >
          <div className="about-moving-card__image relative overflow-hidden rounded-[22px]">
            <Image
              src={movingValue.image}
              alt={movingValue.title}
              fill
              priority
              sizes="(min-width: 1024px) 30vw, 70vw"
              className="object-contain"
            />
          </div>
          <div className="about-moving-card__copy px-2 pb-3 pt-6 text-center">
            <h3 className="text-2xl font-bold text-[#fff] font-medium">{movingValue.title}</h3>
            <p className="mt-3 text-[#fff] font-thin tracking-wider">{movingValue.description}</p>
          </div>
        </article>

        <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {Array.from({ length: aboutSlides }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-10 w-[3px] rounded-full transition-colors duration-300 ${
                index === activeSlide ? 'bg-[#1a98d5]' : 'bg-[#251f5d]/20 hover:bg-[#251f5d]/50'
              }`}
              aria-label={`Go to about slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  )
}

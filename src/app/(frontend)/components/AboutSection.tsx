'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

const aboutSlides = 2

const values = [
  {
    image: '/images/about/it-service-quality-craftsmanship-icon.png',
    alt: 'Illustrated technology specialist icon representing technical craftsmanship for IT services and management',
    title: 'Quality',
    description:
      'Good IT infrastructure deserves good craftsmanship. Our team focuses on the smallest of details to keep your business running without any hiccups.',
  },
  {
    image: '/images/about/client-centric-it-support-services-icon.png',
    alt: 'Customer-focused business support symbol representing client-centric service delivery',
    title: 'Integrity',
    description:
      "IT services should add value not complexities to your operations. That's why in the modern world, good IT support is always lighter on the wallet.",
  },
  {
    image: '/images/about/cost-effective-affordable-it-solutions-icon.png',
    alt: 'Smart business assessment icon representing budget-friendly technology management',
    title: 'Commitment ',
    description:
      'If the solution doesn’t fit, you must rethink. Our solutions are tailored around your operational needs and market positions.',
  },
]

const movingValue = values[1]

const MobileAboutSection = () => (
  <section
    aria-label="About Cybernaut mobile"
    className="overflow-hidden bg-cover bg-top bg-center px-4 pb-8 pt-8 text-white xl:hidden text-center"
  >
    <div className="relative">
      <div className="absolute opacity-15 absolute z-[5] left-0 right-0 mx-auto bottom-[150px] w-[150px] h-[211px]">
        <Image
          src="/images/about/client-centric-it-support-services-icon.png"
          alt="Customer-focused business support symbol representing client-centric service delivery"
          fill
          sizes="260px"
          className="object-contain object-bottom"
          aria-hidden="true"
        />
      </div>

      <div className="relative">
        <p className="mb-4 text-xl font-extralight uppercase leading-none tracking-normal text-[var(--skyBlue)]">
          About Us
        </p>
        <h2 className="font-roboto-condensed font-extrabold uppercase tracking-normal text-[1.5rem] lg:text-5xl">
          Safeguarding your business against downtime and online threats
        </h2>
        <p className="mt-4 text-white/94 md:font-thin md:tracking-wider mt-5 text-base md:text-lg">
          We understand that a lot of time and energy is lost to IT issues that shouldn’t have
          flared up in the first place. To thrive in a digital-first ecosystem, Cybernaut becomes
          your ace in the hole. A leading IT Company in Dubai, Cybernaut has designed IT services
          with a belief that productivity and continuity keeps your business on track.
        </p>
        <Link
          href="tel:800 292376288"
          target="_blank"
          className="triangle-cta mt-5 inline-block px-6 py-3 text-base font-medium text-white hover:text-black"
        >
          <span>Know More</span>
        </Link>
      </div>
    </div>

    <div className="relative mt-10">
      <p className="mb-4 text-xl font-extralight uppercase leading-none tracking-normal text-[var(--skyBlue)]">
        CORE VALUES
      </p>
      <h2 className="font-roboto-condensed font-extrabold uppercase tracking-normal font-roboto-condensed text-[1.5rem] lg:text-5xl">
        What Makes Cybernaut Different
      </h2>
      <p className="mt-4 text-white/94 md:font-thin md:tracking-wider mt-5 text-base md:text-lg">
        Our dedicated IT support team ensures uninterrupted functioning of your digital
        infrastructure.
      </p>

      <Swiper
        slidesPerView={1.2}
        spaceBetween={5}
        breakpoints={{
          768: {
            slidesPerView: 2.2,
          },
          1024: {
            slidesPerView: 3.2,
          },
        }}
        className="core-value-parent-mobile"
      >
        {values.map((value, index) => (
          <SwiperSlide key={value.title} className="h-auto mt-5">
            <article
              key={value.title}
              className="about-value-card about-value-card--active rounded-[14px] bg-[url(/images/about/card-bg.png)] bg-cover bg-top bg-center bg-no-repeat py-5 px-2 shadow-[0_20px_60px_rgba(37,31,93,0.12)] w-[90%] mx-auto border-2 border-[#ccc] min-h-[372px]"
              style={{ '--about-card-delay': `${index * 120}ms` } as CSSProperties}
            >
              <div className="relative h-32 overflow-hidden rounded-[22px]">
                <Image
                  src={value.image}
                  alt={value.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-contain"
                />
              </div>
              <div className="px-2 pb-3 pt-6 text-center">
                <h3 className="text-[1.3rem] font-medium text-[#fff]">{value.title}</h3>
                <p className="mt-3 text-[#fff] text-sm font-thin tracking-wider">
                  {value.description}
                </p>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
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

    const isSectionReadyForSlideChange = () => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const navigationHeight = 88
      const tolerance = 4

      if (rect.height <= viewportHeight) {
        return rect.top <= navigationHeight + tolerance && rect.bottom <= viewportHeight + tolerance
      }

      // When the section is taller than the viewport, wait until its top reaches
      // the bottom edge of the fixed navigation before switching slides.
      return rect.top <= navigationHeight + tolerance
    }

    const handleWheel = (event: WheelEvent) => {
      const currentSlide = activeSlideRef.current
      const isScrollingDown = event.deltaY > 0
      const isScrollingUp = event.deltaY < 0
      const canMoveDown = isScrollingDown && currentSlide < aboutSlides - 1
      const canMoveUp = isScrollingUp && currentSlide > 0

      if (!canMoveDown && !canMoveUp) return
      if (canMoveDown && !isSectionReadyForSlideChange()) return

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
    <div id="aboutus">
      <MobileAboutSection />
      <section
        data-lenis-prevent
        ref={sectionRef}
        aria-label="About Cybernaut"
        className="relative hidden h-[calc(100vh-88px)] min-h-[820px] overflow-hidden bg-[url('/images/bg.png')] bg-cover text-[#FFF] xl:block"
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
                About Us
              </p>
              <h2 className="mx-auto max-w-5xl text-balance font-extrabold uppercase leading-tight font-roboto-condensed text-3xl lg:text-5xl">
                Safeguarding your business against downtime and online threats
              </h2>
            </div>

            <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,390px)_minmax(0,1fr)]">
              <div className="text-lg leading-8 mt-24">
                <p className="text-2xl">
                  Helping you stay on course while we take care of the blinking router side of your
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
                  A leading IT Company in Dubai, Cybernaut has designed IT services with a belief
                  that productivity and continuity keeps your business on track.
                </p>
                <Link
                  href="tel:800 292376288"
                  className="triangle-cta text-white hover:text-black py-3 px-6 mt-8 inline-block"
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
                <p className="mb-4 text-xl md:text-2xl uppercase text-[#000] font-extralight">
                  CORE VALUES
                </p>
                <h2 className="mx-auto max-w-5xl text-balance text-4xl font-extrabold uppercase leading-tight sm:text-5xl text-black font-roboto-condensed">
                  What Makes Cybernaut Different
                </h2>
                <p className="mx-auto max-w-3xl text-lg text-gray-800 ">
                  Our dedicated IT support team ensures uninterrupted functioning of <br />
                  your digital infrastructure.
                </p>
              </div>

              <div className="mt-2 grid md:grid-cols-3 lg:gap-4 xl:gap-8 lg:p-0 lg:p-16 xl:p-10 2xl:p-24">
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
                          alt={value.alt}
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
              ? 'about-moving-card--details bg-[center_top_-200px] py-10 px-5 lg:w-72 xl:w-80 h-[30rem] -mt-20'
              : 'about-moving-card--intro w-96 h-[40rem] mt-16 px-16'
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
    </div>
  )
}

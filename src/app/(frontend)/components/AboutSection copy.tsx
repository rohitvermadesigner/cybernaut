'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

const aboutSlides = 2

const values = [
  {
    image: '/images/about/expertise.png',
    title: 'Proactive by design',
    description:
      'We spot risks early, solve issues quickly, and keep your team moving without disruption.',
  },
  {
    image: '/images/about/client-centric.png',
    title: 'Client-centric',
    description:
      'Every solution begins with your people, your goals, and the way your business works.',
  },
  {
    image: '/images/about/cost-effective.png',
    title: 'Built for momentum',
    description: 'Scalable technology gives your business the confidence to grow at its own speed.',
  },
]

const movingValue = values[1]

export const AboutSection = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const activeSlideRef = useRef(activeSlide)
  const wheelLockRef = useRef(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    activeSlideRef.current = activeSlide
  }, [activeSlide])

  const goToSlide = useCallback((direction: 1 | -1) => {
    const nextSlide = Math.min(Math.max(activeSlideRef.current + direction, 0), aboutSlides - 1)

    if (nextSlide !== activeSlideRef.current) {
      activeSlideRef.current = nextSlide
      setActiveSlide(nextSlide)
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
    <section
      ref={sectionRef}
      aria-label="About Cybernaut"
      className="relative h-[calc(100vh-88px)] min-h-[720px] overflow-hidden text-[#FFF]"
    >
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          activeSlide === 0
            ? 'z-10 opacity-100'
            : 'pointer-events-none z-0 -translate-x-10 opacity-0'
        }`}
        aria-hidden={activeSlide !== 0}
      >
        <div className="container grid h-full items-center gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="mb-5 text-xl md:text-2xl font-bold uppercase tracking-[0.3em] text-[var(--skyBlue)]">
              About Us
            </p>
            <h2 className="max-w-4xl text-balance text-4xl font-extrabold uppercase leading-tight sm:text-5xl lg:text-6xl">
              Safeguarding your business against downtime and cyber threats
            </h2>
            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8">
              <p>
                We understand that a lot of time and energy is lost to IT issues that shouldn’t have
                flared up in the first place. To thrive in a digital-first ecosystem, Cybernaut
                becomes your ace in the hole. A leading IT Company in Dubai, Cybernaut has designed
                IT solutions with a belief that productivity and continuity keeps your business on
                track.
              </p>
            </div>
            <Link
              href="about"
              target="_blank"
              className="triangle-cta text-white py-3 px-6 block mt-4 inline-block mt-8"
            >
              <span className="flex items-center gap-2">Know More</span>
            </Link>
          </div>

          <div className="flex h-full items-center justify-center lg:col-span-4">
            <div className="relative h-[480px] w-full max-w-[390px]" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          activeSlide === 1
            ? 'z-10 opacity-100'
            : 'pointer-events-none z-0 translate-x-10 opacity-0'
        }`}
        aria-hidden={activeSlide !== 1}
      >
        <div
          className={`absolute inset-0 ${activeSlide === 1 ? 'about-slide-two-background' : ''}`}
          aria-hidden="true"
        />
        <div className="container relative z-10 flex h-full flex-col justify-center py-12">
          <div className={`text-center ${activeSlide === 1 ? 'about-values-copy' : ''}`}>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#1a98d5]">
              How We Work
            </p>
            <h2 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold uppercase leading-tight sm:text-5xl text-black">
              Human-first IT, built around your ambitions.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-black">
              Our approach combines attentive support, forward-thinking strategy, and technology
              that adapts as your business evolves.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
            {values.map((value, index) =>
              index === 1 ? (
                <div key={value.title} aria-hidden="true" />
              ) : (
                <article
                  key={value.title}
                  className={`about-value-card rounded-[28px] bg-gray-500 p-5 shadow-[0_20px_60px_rgba(37,31,93,0.12)] ${
                    activeSlide === 1 ? 'about-value-card--active' : ''
                  }`}
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
                  <div className="px-2 pb-3 pt-6">
                    <h3 className="text-2xl font-bold text-[#fff]">{value.title}</h3>
                    <p className="mt-3 leading-7 text-[#fff]">{value.description}</p>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </div>

      <article
        className={`about-moving-card pointer-events-none absolute z-20 rounded-[28px] bg-gray-500 p-5 shadow-[0_20px_60px_rgba(37,31,93,0.12)] ${
          activeSlide === 1 ? 'about-moving-card--details' : 'about-moving-card--intro'
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
        <div className="about-moving-card__copy px-2 pb-3 pt-6">
          <h3 className="text-2xl font-bold text-[#fff]">{movingValue.title}</h3>
          <p className="mt-3 leading-7 text-[#fff]">{movingValue.description}</p>
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
  )
}

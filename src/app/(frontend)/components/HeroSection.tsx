'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

const slideCount = 3

const heroCopy = {
  title: 'Launch your mission with advanced IT solutions',
  description:
    'IT solutions and support that keeps your business shielded from worrying about digital downtime.',
}

const heroCopy2 = {
  title: 'We handle the tech, while you accelerate your business',
  description:
    'Right from phone systems to internet security to workplace IT solutions, our Cybernauts take care of the tech side so your business can run on lightening speed.',
}

const videoAssets = {
  splitVideo: {
    mp4: '/images/hero/hero.mp4',
    webm: '/images/hero/hero.webm',
    poster: '/images/hero/video-bg.png',
  },
  backgroundVideo: {
    mp4: '/images/hero/hero.mp4',
    webm: '/images/hero/hero.webm',
    poster: '/images/hero/video-bg.png',
  },
}

const collageBoxes = [
  {
    src: '/images/hero/slide1-0.png',
    alt: 'IT support engineers in a server room',
    className: 'col-span-2 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'right',
  },
  {
    src: '/images/hero/slide1-1.png',
    alt: 'Security camera installation',
    className: 'col-span-1 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'right',
  },
  {
    src: '/images/hero/slide1-2.png',
    alt: 'Security camera installation',
    className: 'col-span-1 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'right',
  },
  {
    src: '/images/hero/slide1-3.png',
    alt: 'Helpdesk engineer monitoring systems',
    className: 'col-span-1 row-span-2',
    imageClassName: 'rounded-3xl',
    direction: 'right',
  },
  {
    src: '/images/hero/slide1-4.png',
    alt: 'Data center infrastructure',
    className: 'col-span-2 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'left',
  },
  {
    src: '/images/hero/slide1-5.png',
    alt: 'Dedicated IT support team',
    className: 'col-span-1 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'right',
  },
  {
    src: '/images/hero/slide1-6.png',
    alt: 'Network cable maintenance',
    className: 'col-span-1 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'left',
  },
  {
    src: '/images/hero/slide1-7.png',
    alt: 'Server room technician',
    className: 'col-span-2 row-span-2',
    imageClassName: 'rounded-3xl',
    direction: 'left',
  },
  {
    src: '/images/hero/slide1-8.png',
    alt: 'Engineer checking network rack',
    className: 'col-span-1 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'left',
  },
  {
    src: '/images/hero/slide1-9.png',
    alt: 'Infrastructure monitoring dashboard',
    className: 'col-span-2 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'left',
  },
]

const TextBox = ({ centered = false }: { centered?: boolean }) => (
  <div className={centered ? 'mx-auto max-w-5xl text-center' : 'max-w-2xl'}>
    <h1 className="text-balance text-4xl font-extrabold uppercase leading-tight tracking-normal text-white sm:text-5xl lg:text-[2.8rem] font-roboto-condensed">
      {heroCopy.title}
    </h1>
    <p className="mt-6 text-pretty text-lg leading-8 text-white/82 sm:text-xl lg:text-2xl">
      {heroCopy.description}
    </p>
  </div>
)

const TextBox2 = ({ centered = false }: { centered?: boolean }) => (
  <div className={centered ? 'mx-auto max-w-5xl text-center' : 'max-w-2xl'}>
    <h1 className="text-balance text-4xl font-extrabold uppercase leading-tight tracking-normal text-white sm:text-5xl lg:text-[2.8rem] font-roboto-condensed">
      {heroCopy2.title}
    </h1>
    <p className="mt-6 text-pretty text-lg leading-8 text-white/82 sm:text-xl lg:text-2xl">
      {heroCopy2.description}
    </p>
    {/* <Link
      href="about"
      target="_blank"
      className="triangle-cta text-white py-3 px-6 block mt-4 inline-block mt-8"
    >
      <span className="flex items-center gap-2">Know More</span>
    </Link> */}
  </div>
)

const MobileHero = () => (
  <section
    aria-label="Dedicated IT helpdesk mobile hero"
    className="relative overflow-hidden bg-black text-white md:hidden"
    style={{ minHeight: 'calc(100svh - 72px)' }}
  >
    <div className="absolute inset-0">
      <VideoPanel mode="backgroundVideo" />
    </div>
    <div className="absolute inset-0 bg-black/28" />
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 42%, rgba(0,0,0,0.78) 100%)',
      }}
    />

    <div className="relative z-10 flex min-h-[inherit] items-end justify-center px-4 pb-24 pt-20 text-center">
      <div className="mx-auto max-w-[420px]">
        <h1 className="font-roboto-condensed text-3xl font-extrabold uppercase leading-tight tracking-normal text-white">
          We handle the tech, while you accelerate your business
        </h1>
        <p className="mx-auto mt-3 max-w-[390px] text-[1.28rem] leading-8 text-white/88">
          Right from phone systems to internet security to workplace IT solutions, our Cybernauts
          take care of the tech side so your business can run on lightening speed.
        </p>
        {/* <Link
          href="about"
          target="_blank"
          className="triangle-cta mt-7 inline-block px-7 py-3 text-base font-medium text-white"
        >
          <span>Know More</span>
        </Link> */}
      </div>
    </div>
  </section>
)

const VideoPanel = ({
  className = '',
  mode,
}: {
  className?: string
  mode: 'splitVideo' | 'backgroundVideo'
}) => {
  const asset = videoAssets[mode]

  return (
    <video
      className={`h-full w-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={asset.poster}
    >
      <source src={asset.webm} type="video/webm" />
      <source src={asset.mp4} type="video/mp4" />
    </video>
  )
}

const CollageImage = ({
  image,
  priority = false,
  delay = 0,
}: {
  image: (typeof collageBoxes)[number]
  priority?: boolean
  delay?: number
}) => (
  <div
    className={`collage-card collage-card--${image.direction}`}
    style={{ '--collage-delay': `${delay}ms` } as CSSProperties}
  >
    <div className="collage-card__inner">
      <div className="collage-card__face collage-card__blank" aria-hidden="true" />
      <div className="collage-card__face collage-card__image">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 25vw, 50vw"
          className={`object-cover ${image.imageClassName}`}
        />
      </div>
    </div>
  </div>
)

export const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const activeSlideRef = useRef(activeSlide)
  const wheelLockRef = useRef(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    activeSlideRef.current = activeSlide
  }, [activeSlide])

  const goToSlide = useCallback((direction: 1 | -1) => {
    const nextSlide = Math.min(Math.max(activeSlideRef.current + direction, 0), slideCount - 1)

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
      const canMoveDown = isScrollingDown && currentSlide < slideCount - 1
      const canMoveUp = isScrollingUp && currentSlide > 0

      if (!canMoveDown && !canMoveUp) return

      event.preventDefault()

      if (wheelLockRef.current) return

      wheelLockRef.current = true
      goToSlide(isScrollingDown ? 1 : -1)

      window.setTimeout(() => {
        wheelLockRef.current = false
      }, 800)
    }

    section.addEventListener('wheel', handleWheel, { passive: false })

    return () => section.removeEventListener('wheel', handleWheel)
  }, [goToSlide])

  return (
    <>
      <MobileHero />
      <section
        ref={sectionRef}
        aria-label="Dedicated IT helpdesk hero slides"
        className="relative hidden h-[calc(100vh-88px)] min-h-[680px] overflow-hidden bg-black text-white md:block"
      >
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            activeSlide === 0
              ? 'z-10 opacity-100 scale-100'
              : 'z-0 opacity-0 scale-[1.02] pointer-events-none'
          }`}
          aria-hidden={activeSlide !== 0}
        >
          <div className="grid h-60 gap-4 pt-4 px-4 md:grid-cols-[1fr_0.5fr_1fr_0.5fr]">
            <CollageImage image={collageBoxes[0]} priority delay={0} />
            <CollageImage image={collageBoxes[1]} delay={90} />
            <CollageImage image={collageBoxes[2]} delay={180} />
            <CollageImage image={collageBoxes[3]} delay={270} />
          </div>

          <div className="grid h-96 gap-4 pt-4 px-4 md:grid-cols-[0.5fr_1fr_0.5fr_1fr]">
            <CollageImage image={collageBoxes[4]} delay={360} />
            <div className="hero-text-box col-span-2 flex items-center rounded-[24px] bg-[#121212] px-7 py-8 md:px-12 lg:px-16">
              <TextBox />
            </div>
            <CollageImage image={collageBoxes[5]} delay={450} />
          </div>

          <div className="grid h-60 gap-4 p-4 md:grid-cols-[0.5fr_0.5fr_1fr_1fr]">
            <CollageImage image={collageBoxes[6]} delay={540} />
            <CollageImage image={collageBoxes[7]} delay={630} />
            <CollageImage image={collageBoxes[8]} delay={720} />
            <CollageImage image={collageBoxes[9]} delay={810} />
          </div>
        </div>

        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            activeSlide === 1
              ? 'z-10 opacity-100 scale-100'
              : 'z-0 opacity-0 scale-[1.02] pointer-events-none'
          }`}
          aria-hidden={activeSlide !== 1}
        >
          <div className="grid h-full grid-cols-1 gap-5 bg-black p-4 md:grid-cols-2 lg:p-5">
            <div
              className={`relative min-h-[320px] overflow-hidden rounded-[26px] md:min-h-0 ${
                activeSlide === 1 ? 'hero-split-panel hero-split-panel--top' : ''
              }`}
            >
              <VideoPanel mode="splitVideo" />
            </div>
            <div
              className={`flex items-center rounded-[26px] bg-[linear-gradient(135deg,_#1e2b2f,_#0a1013)] px-8 py-12 md:px-14 lg:px-24 ${
                activeSlide === 1 ? 'hero-split-panel hero-split-panel--bottom' : ''
              }`}
            >
              <TextBox2 />
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            activeSlide === 2
              ? 'z-10 opacity-100 scale-100'
              : 'z-0 opacity-0 scale-[1.02] pointer-events-none'
          }`}
          aria-hidden={activeSlide !== 2}
        >
          <div className={`absolute inset-0 ${activeSlide === 2 ? 'hero-full-video' : ''}`}>
            <VideoPanel mode="backgroundVideo" />
          </div>
          <div
            className={`absolute inset-0 bg-black/60 ${
              activeSlide === 2 ? 'hero-full-video-overlay' : ''
            }`}
          />
          <div
            className={`absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,15,0.78),rgba(2,10,15,0.35),rgba(2,10,15,0.74))] ${
              activeSlide === 2 ? 'hero-full-video-overlay' : ''
            }`}
          />
          <div
            className={`relative z-10 flex h-full items-center justify-center px-5 ${
              activeSlide === 2 ? 'hero-full-video-caption' : ''
            }`}
          >
            <TextBox2 centered />
          </div>
        </div>

        <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-10 w-[3px] rounded-full transition-colors duration-300 ${
                index === activeSlide ? 'bg-[#38bdf8]' : 'bg-white/25 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  )
}

'use client'

import Image from 'next/image'
import type { CSSProperties } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

const slideCount = 3

const heroCopy = {
  title: 'Launch your mission with advanced IT services',
  description:
    'IT services and support in Dubai that keeps your business shielded from worrying about digital downtime.',
}

const heroCopy2 = {
  title: 'We offer workplace IT solutions, while you accelerate your business.',
  description:
    'Right from phone systems to internet security, our Cybernauts take care of the tech side so your business can run on lightening speed.',
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
    src: '/images/hero/data-center-server-maintenance.png',
    alt: 'Two network engineers working together to configure server rack equipment inside a data center',
    className: 'col-span-2 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'right',
  },
  {
    src: '/images/hero/outdoor-security-cctv-camera-installation.png',
    alt: 'Technician installing a white security surveillance camera on a brick wall',
    className: 'col-span-1 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'right',
  },
  {
    src: '/images/hero/it-infrastructure-monitoring.png',
    alt: 'Network specialist using a laptop computer to monitor systems while standing inside a server room',
    className: 'col-span-1 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'right',
  },
  {
    src: '/images/hero/network-infrastructure-administration.png',
    alt: 'System administrator checking network analytics on a tablet',
    className: 'col-span-1 row-span-2',
    imageClassName: 'rounded-3xl',
    direction: 'right',
  },
  {
    src: '/images/hero/network-cable-management.png',
    alt: 'IT infrastructure technician holding a laptop while managing complex network cables in a server rack cabinet',
    className: 'col-span-2 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'left',
  },
  {
    src: '/images/hero/professional-it-technical-support-team.png',
    alt: 'Professional IT support engineers and technical service technicians standing together',
    className: 'col-span-1 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'right',
  },
  {
    src: '/images/hero/network-cabling-infrastructure-maintenance.png',
    alt: 'Network engineers checking structured data cabling inside an enterprise server room enclosure',
    className: 'col-span-1 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'left',
  },
  {
    src: '/images/hero/remote-network-monitoring-data-center.png',
    alt: 'Female IT administrator working on a laptop computer inside an open warehouse data center',
    className: 'col-span-2 row-span-2',
    imageClassName: 'rounded-3xl',
    direction: 'left',
  },
  {
    src: '/images/hero/server-configuration-management-it-support.png',
    alt: 'Network specialist checking server metrics on a tablet terminal inside a main distribution facility',
    className: 'col-span-1 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'left',
  },
  {
    src: '/images/hero/it-operations-data-center-diagnostics.png',
    alt: 'Two operations specialists examining network telemetry data and diagnostics inside a server farm control center',
    className: 'col-span-2 row-span-1',
    imageClassName: 'rounded-3xl',
    direction: 'left',
  },
]

const TextBox = ({ centered = false }: { centered?: boolean }) => (
  <div className={centered ? 'mx-auto max-w-5xl text-center' : 'max-w-2xl'}>
    <h1 className="text-balance font-extrabold uppercase leading-tight tracking-normal text-white font-roboto-condensed text-3xl lg:text-4xl xl:text-5xl">
      {heroCopy.title}
    </h1>
    <p className="mt-6 text-pretty text-lg leading-8 text-white/82 sm:text-xl lg:text-2xl">
      {heroCopy.description}
    </p>
  </div>
)

const TextBox2 = ({ centered = false }: { centered?: boolean }) => (
  <div className={centered ? 'mx-auto max-w-5xl text-center' : 'max-w-2xl'}>
    <h2 className="text-balance font-extrabold uppercase leading-tight tracking-normal text-white font-roboto-condensed text-3xl lg:text-4xl xl:text-5xl">
      {heroCopy2.title}
    </h2>
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
    className="relative overflow-hidden bg-black text-white lg:hidden"
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
      <div className="mx-auto md:max-w-[96%] lg:max-w-[420px]">
        <h1 className="font-roboto-condensed text-3xl font-extrabold uppercase leading-tight tracking-normal text-white">
          Launch your mission with advanced IT services
        </h1>
        <p className="mx-auto mt-3 md:max-w-[96%] lg:max-w-[420px] text-[1.28rem] leading-8 text-white/88">
          IT services and support in Dubai that keeps your business shielded from worrying about
          digital downtime.
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
        data-lenis-prevent
        ref={sectionRef}
        aria-label="Dedicated IT helpdesk hero slides"
        className="relative hidden h-[calc(100vh-88px)] min-h-[680px] overflow-hidden bg-black text-white lg:block"
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
              className={`flex items-center rounded-[26px] bg-[linear-gradient(135deg,_#1e2b2f,_#0a1013)] px-8 py-12 md:px-14 lg:px-12 xl:px-24 ${
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

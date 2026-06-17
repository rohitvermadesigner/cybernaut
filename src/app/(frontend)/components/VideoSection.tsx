'use client'

import React, { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

const videos = [
  {
    id: 'cybertube-1',
    title: 'Cybernaut Tech Services',
    src: '/images/hero/hero.mp4',
  },
  {
    id: 'cybertube-2',
    title: 'IT Services in Motion',
    src: '/images/hero/hero.mp4',
  },
  {
    id: 'cybertube-3',
    title: 'Reliable Support',
    src: '/images/hero/hero.mp4',
  },
]

export const VideoSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const stopInactiveVideos = (activeVideo?: HTMLVideoElement) => {
    const videos = sectionRef.current?.querySelectorAll('video') ?? []

    videos.forEach((video) => {
      if (video === activeVideo) return
      video.pause()
      video.currentTime = 0
    })
  }

  const handleSlideChange = (swiper: SwiperType) => {
    const activeVideo = swiper.slides[swiper.activeIndex]?.querySelector('video') ?? undefined

    stopInactiveVideos(activeVideo)
    setActiveIndex(swiper.realIndex)
    setIsVideoPlaying(false)
    swiper.autoplay.start()
  }

  const handleVideoPlay = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    stopInactiveVideos(event.currentTarget)
    setIsVideoPlaying(true)
    swiperRef.current?.autoplay.stop()
  }

  const handleVideoEnded = () => {
    setIsVideoPlaying(false)
    swiperRef.current?.autoplay.start()
  }

  const handlePlayActiveVideo = () => {
    const swiper = swiperRef.current
    const activeVideo = swiper?.slides[swiper.activeIndex]?.querySelector('video')

    void activeVideo?.play()
  }

  const handleIndicatorClick = (index: number) => {
    swiperRef.current?.slideToLoop(index)
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Cybernaut video gallery"
      className="py-10 text-white lg:py-12"
    >
      <div className="mb-8 text-center lg:mb-10">
        <h2 className="font-roboto-condensed text-balance text-[2.35rem] font-extrabold uppercase leading-none sm:text-5xl">
          CYBERTUBE
        </h2>
        <p className="mx-auto max-w-5xl text-base md:text-lg text-white mt-4 md:font-thin md:tracking-wider">
          Making sense of the IT infrastructure world through byte-sized videos
          <br /> sans the jargons and confusion.
        </p>
      </div>

      <div className="container">
        <div className="mx-auto w-full">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop
            speed={900}
            autoplay={{
              delay: 4200,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={handleSlideChange}
            className="w-full"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={video.id}>
                <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-black shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:h-132">
                  <video
                    className="h-full w-full object-cover"
                    src={video.src}
                    title={video.title}
                    muted
                    playsInline
                    preload={index === 0 ? 'auto' : 'metadata'}
                    onPlay={handleVideoPlay}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={handleVideoEnded}
                  />
                  <button
                    type="button"
                    aria-label={`Play ${video.title}`}
                    onClick={handlePlayActiveVideo}
                    className={`absolute z-10 grid place-items-center rounded-full bg-black/62 text-white shadow-[0_12px_36px_rgba(0,0,0,0.3)] backdrop-blur-sm transition hover:bg-[#27b7f6] ${
                      isVideoPlaying ? 'pointer-events-none opacity-0' : 'opacity-100'
                    }`}
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '56px',
                      height: '56px',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <span
                      className="ml-1"
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '9px solid transparent',
                        borderBottom: '9px solid transparent',
                        borderLeft: '14px solid #fff',
                      }}
                    />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-5 flex items-center justify-center gap-2" aria-label="Video slides">
            {videos.map((video, index) => (
              <button
                key={video.id}
                type="button"
                aria-label={`Show ${video.title}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                onClick={() => handleIndicatorClick(index)}
                className="rounded-full transition"
                style={{
                  width: activeIndex === index ? '28px' : '8px',
                  height: '8px',
                  backgroundColor: activeIndex === index ? '#27b7f6' : 'rgba(255,255,255,0.45)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

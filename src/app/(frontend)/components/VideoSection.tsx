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
    src: 'https://www.youtube.com/embed/XFVXkYEzwWA?si=mJHKjV7cBkRhXKYX',
  },
  // {
  //   id: 'cybertube-2',
  //   title: 'IT Services in Motion',
  //   src: 'https://www.youtube.com/embed/XFVXkYEzwWA?si=mJHKjV7cBkRhXKYX',
  // },
  // {
  //   id: 'cybertube-3',
  //   title: 'Reliable Support',
  //   src: 'https://www.youtube.com/embed/XFVXkYEzwWA?si=mJHKjV7cBkRhXKYX',
  // },
]

export const VideoSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
    swiper.autoplay.start()
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
        <h2 className="font-roboto-condensed text-balance font-extrabold uppercase leading-none text-3xl lg:text-5xl">
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
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-black shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:h-88 lg:h-110 xl:h-132">
                  <iframe
                    className="h-full w-full"
                    width="560"
                    height="315"
                    src={video.src}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* <div className="mt-5 flex items-center justify-center gap-2" aria-label="Video slides">
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
          </div> */}
        </div>
      </div>
    </section>
  )
}

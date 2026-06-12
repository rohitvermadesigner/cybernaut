'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

const services = [
  {
    title: 'IT Support',
    image: '/images/services/it-support.jpg',
    items: [
      'End-to-end IT Support in Dubai',
      'Server and Wifi Support',
      'Workplace IT Support',
      'Biometric Management Support',
    ],
  },
  {
    title: 'IT Security',
    image: '/images/services/it-security.jpg',
    items: [
      'Cybersecurity and Security Audits',
      'Encryption Control Services',
      'Data Protections',
      'Network and IT Infrastructure Security ',
    ],
  },
  {
    title: 'CCTV Support',
    image: '/images/services/cctv-support.jpg',
    items: [
      'CCTV Installation',
      'CCTV Maintenance Services',
      'Scalable CCTV Solutions',
      'Customized Plans',
    ],
  },
  {
    title: 'Phone System',
    image: '/images/services/phone-system.jpg',
    items: ['PABX Setup and Support', 'Cloud-Based Phone Solutions', 'Call Management'],
  },
  {
    title: 'Wi-Fi Solutions',
    image: '/images/services/wi-fi-solutions.jpg',
    items: [
      'Wifi Installation & Setup',
      'Router Configuration',
      'Network Optimization',
      'Cloud-Based Wifi Solutions',
    ],
  },
  {
    title: 'Printers & Scanners',
    image: '/images/services/printers-scanners.jpg',
    items: [
      'Printer & Scanner Setup & Support',
      'Multi-Device Printer Integration',
      'Printer Repairs & Maintenance',
      'Scanner Configuration & Setup',
    ],
  },
  {
    title: 'Software Setup Support',
    image: '/images/services/software-setup-support.jpg',
    items: [
      'Software Installation & Setup',
      'OS Updates & Maintenance',
      'Remote & On-Site Technical Support',
    ],
  },
  {
    title: 'Biometric & Attendance System',
    image: '/images/services/biometric-attendance-system.jpg',
    items: [
      'Biometric Systems in Dubai',
      'Fingerprint',
      'RFID Solutions',
      'Hybrid Biometric Reader Installation',
    ],
  },
]

type Service = (typeof services)[number]

const ServiceCard = ({ service }: { service: Service }) => (
  <article className="group relative h-[450px] overflow-hidden rounded-2xl border border-white/14 bg-black shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
    {/* <Link href="services"> */}
    <div className="absolute inset-x-0 top-0 z-20 p-5">
      <h3 className="font-roboto-condensed text-2xl font-bold leading-tight text-white uppercase">
        {service.title}
      </h3>
    </div>
    <Image
      src="/images/services/shadow.png"
      alt={service.title}
      fill
      className="absolute bottom-0 left-0 z-10"
    />
    <Image
      src={service.image}
      alt={service.title}
      fill
      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 84vw"
      className="absolute bottom-0 left-0 object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:blur-xs"
    />
    {/* <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.78))]" /> */}

    <div className="absolute inset-0 h-full w-full bg-black/20 p-5 opacity-0 md:opacity-0 blur transition duration-500 ease-out group-hover:opacity-100"></div>

    <div className="absolute inset-0 z-30 flex flex-col justify-end p-5 md:opacity-0 transition duration-500 ease-out group-hover:opacity-100">
      <ul className="absolute bottom-10 md:bottom-18 m-auto w-[90%] translate-x-0 md:-translate-x-10 space-y-3 text-sm font-thin leading-6 tracking-wide text-white transition duration-500 ease-out group-hover:md:translate-x-0">
        {service.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="rounded-2xl bg-white px-3 py-1 text-[#000]">{item}</span>
          </li>
        ))}
      </ul>

      {/* <div className="absolute right-5 bottom-1 md:bottom-5 translate-y-12 px-5 py-3 text-sm tracking-wide text-white underline md:opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span>See More</span>
        </div> */}
    </div>
    {/* </Link> */}
  </article>
)

export const ServicesSection = () => {
  return (
    <section aria-label="Cybernaut services" className="py-8 text-white lg:py-12" id="ourservices">
      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-xl md:text-2xl font-extralight uppercase text-[var(--skyBlue)]">
            Our Services
          </p>
          <h2 className="font-roboto-condensed text-balance text-3xl font-extrabold uppercase leading-tight sm:text-5xl">
            Powering every click, call and connection
          </h2>
          <p className="mx-auto max-w-5xl text-base md:text-lg text-white mt-4 font-thin tracking-wider">
            IT solutions that you don’t have to second-guess. We provide streamlined and
            future-ready infrastructure that helps you maintain your strategic-edge in UAE’s hyper-
            competitive market.
          </p>
        </div>

        <div className="services-mobile-slider mt-12">
          <Swiper slidesPerView={1.2} spaceBetween={24}>
            {services.map((service) => (
              <SwiperSlide key={service.title} className="h-auto">
                <ServiceCard service={service} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-12 hidden gap-6 lg:grid lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        {/* <div className="text-center">
          <Link
            href="services"
            className="triangle-cta text-white py-3 px-6 block mt-4 inline-block mt-8 md:mt-12"
          >
            <span className="flex items-center gap-2">Explore more services</span>
          </Link>
        </div> */}
      </div>
    </section>
  )
}

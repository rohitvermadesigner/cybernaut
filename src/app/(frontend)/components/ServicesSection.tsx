'use client'

import Image from 'next/image'
import Link from 'next/link'

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
      'End-to-end IT Support in Dubai',
      'Server and Wifi Support',
      'Workplace IT Support',
      'Biometric Management Support',
    ],
  },
  {
    title: 'CCTV Support',
    image: '/images/services/cctv-support.jpg',
    items: [
      'End-to-end IT Support in Dubai',
      'Server and Wifi Support',
      'Workplace IT Support',
      'Biometric Management Support',
    ],
  },
  {
    title: 'Phone System',
    image: '/images/services/phone-system.jpg',
    items: [
      'End-to-end IT Support in Dubai',
      'Server and Wifi Support',
      'Workplace IT Support',
      'Biometric Management Support',
    ],
  },
  {
    title: 'Wi-Fi Solutions',
    image: '/images/services/wi-fi-solutions.jpg',
    items: [
      'End-to-end IT Support in Dubai',
      'Server and Wifi Support',
      'Workplace IT Support',
      'Biometric Management Support',
    ],
  },
  {
    title: 'Printers & Scanners',
    image: '/images/services/printers-scanners.jpg',
    items: [
      'End-to-end IT Support in Dubai',
      'Server and Wifi Support',
      'Workplace IT Support',
      'Biometric Management Support',
    ],
  },
  {
    title: 'Software Setup Support',
    image: '/images/services/software-setup-support.jpg',
    items: [
      'End-to-end IT Support in Dubai',
      'Server and Wifi Support',
      'Workplace IT Support',
      'Biometric Management Support',
    ],
  },
  {
    title: 'Biometric & Attendance System',
    image: '/images/services/biometric-attendance-system.jpg',
    items: [
      'End-to-end IT Support in Dubai',
      'Server and Wifi Support',
      'Workplace IT Support',
      'Biometric Management Support',
    ],
  },
]

export const ServicesSection = () => {
  return (
    <section aria-label="Cybernaut services" className="py-12 text-white lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-2xl font-extralight uppercase text-[var(--skyBlue)]">
            Our Services
          </p>
          <h2 className="font-roboto-condensed text-balance text-4xl font-extrabold uppercase leading-tight sm:text-5xl">
            Powering every click, call and connection.
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-white mt-4">
            IT solutions that you don’t have to second-guess. We provide streamlined and
            future-ready infrastructure that helps you maintain your strategic-edge in UAE’s hyper-
            competitive market.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative h-[450px] overflow-hidden rounded-2xl border border-white/14 bg-black shadow-[0_18px_50px_rgba(0,0,0,0.28)] p-relative"
            >
              <div className="absolute inset-x-0 top-0 z-20 p-5">
                <h3 className="font-roboto-condensed text-2xl font-bold leading-tight text-white">
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
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-110 absolute bottom-0 left-0 group-hover:blur-xs"
              />
              {/* <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.78))]" /> */}

              <div className="w-full h-full absolute inset-0 p-5 opacity-0 transition duration-500 ease-out group-hover:opacity-100 bg-black/20 blur"></div>

              <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition duration-500 ease-out group-hover:opacity-100 z-30">
                <ul className="-translate-x-10 space-y-3 text-sm font-thin leading-6 tracking-wide text-white transition duration-500 ease-out group-hover:translate-x-0 absolute w-[90%] m-auto bottom-18">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      {/* <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--skyBlue)]" /> */}
                      <span className="bg-white rounded-2xl px-3 py-1 text-[#000]">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="services"
                  className="absolute bottom-5 right-5 translate-y-12 px-5 py-3 text-sm tracking-wide text-white opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 underline"
                >
                  <span>See More</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="services"
            className="triangle-cta text-white py-3 px-6 block mt-4 inline-block mt-8"
          >
            <span className="flex items-center gap-2">Explore more services</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

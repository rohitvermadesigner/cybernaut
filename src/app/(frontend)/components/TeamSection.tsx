'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

const teamMembers = [
  {
    name: 'SHERICK MARK PANTANILLA',
    designation: 'Jr. IT Technician',
    image: '/images/team/sherick-mark-pantanilla.png',
    paragraph: '',
  },
  {
    name: 'MARK VISCA',
    designation: 'Jr. IT Tech',
    image: '/images/team/mark-visca.png',
    paragraph:
      'Holds a Certificate in Computer Technology and brings practical knowledge of IT systems, troubleshooting, and support. With a rich blend of experience in hospitality, safety training, and IT support, he combines hands-on technical expertise with excellent problem-solving skills, ensuring dependable and efficient IT assistance',
  },
  {
    name: 'WIN HLAING OO',
    designation: 'IT Technician',
    image: '/images/team/win-hlaing-oo.png',
    paragraph: '',
  },
  {
    name: 'Waqas Ahmad',
    designation: 'IT Technician',
    image: '/images/team/waqas-ahmad.png',
    paragraph:
      'Equipped with an Associate’s Degree in Information Technology and various certifications including MCSE (Microsoft Certified Systems Engineer), CCNA (Cisco Certified Network Associate), CCNP (Cisco Certified Network Professional), and presently undergoing MTCNA (MikroTik Certified Network Associate) Training',
  },
  {
    name: 'MARVIN LOPEZ CONCEPCION',
    designation: 'Sales Executive',
    image: '/images/team/marvin-lopez-concepcion.png',
    paragraph:
      'Holds a Degree in Business Administration, emphasizing a strong foundation in management and business strategy. Over a decade of experience in customer and technical services with a focus on the IT industry, driving growth through innovative solutions and fostering lasting client relationships',
  },
  {
    name: 'NIKHIL SAGAR',
    designation: 'Sr. IT Technician',
    image: '/images/team/nikhil-sagar.png',
    paragraph:
      'Earned a Bachelor of Science in Information Technology. With over a decade of hands-on experience in IT support across various industries, offering extensive expertise in troubleshooting, system administration, and the deployment of innovative technological solutions.',
  },
  {
    name: 'JAMES STRYDOM',
    designation: 'Sr. Sales Executive',
    image: '/images/team/james-strydom.png',
    paragraph:
      'Holds a Diploma in Hospitality Management, highlighting commitment to excellence in service delivery. More than 4 years of focused experience in customer relations and guest management, showcasing a keen grasp of client needs and delivering effective solutions',
  },
]

type TeamMember = (typeof teamMembers)[number]

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <article className="grid min-h-[325px] overflow-hidden rounded-4xl border-[1px] border-[#2e404d] bg-[linear-gradient(90deg,rgba(19,51,66,0.7),rgba(12,21,26,0.7))] text-white sm:grid-cols-[minmax(0,1fr)_250px]">
    <div className="flex flex-col justify-start p-6 sm:p-8">
      <h3 className="font-roboto-condensed text-2xl md:text-3xl font-bold uppercase leading-tight">
        {member.name}
      </h3>
      <p className="mt-2 text-base font-medium tracking-wide">{member.designation}</p>
      <p className="mt-4 md:mt-10 text-base font-thin leading-7 tracking-wide">
        {member.paragraph}
      </p>
    </div>

    <div className="relative mx-auto w-[60%] md:w-[100%] min-h-[250px] md:min-h-[250px]">
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 40vw, 220px"
      />
    </div>
  </article>
)

export const TeamSection = () => {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section aria-label="Cybernaut team" className="py-8 text-[#251f5d] lg:py-12" id="team">
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
        <div className="lg:sticky lg:top-28 text-center md:text-left">
          <p className="mb-4 text-xl md:text-2xl font-extralight uppercase text-[var(--skyBlue)]">
            Our Team
          </p>
          <h2 className="font-roboto-condensed text-balance text-3xl md:text-5xl font-extrabold uppercase leading-tight text-[#fff] sm:text-5xl">
            MEET THE FACES BEHIND THE TECH
          </h2>
          <div className="mt-6 space-y-5 text-base md:text-lg font-thin leading-8 tracking-wide text-[#fff]">
            <p>
              At Cybernaut, we have a saying, “Behind every leading IT service provider in Dubai is
              a team of curious minds and experienced specialists.
            </p>
            <p>
              Our team of seasoned professionals bring their diverse experience across managed IT
              services, CCTV support, PABX systems and more, to assist businesses by making
              technology easier to work with.
            </p>
          </div>
        </div>

        <div className="team-mobile-slider min-w-0">
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.name} className="h-auto">
                <TeamMemberCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-6 flex items-center justify-center gap-2" aria-label="Team slides">
            {teamMembers.map((member, index) => (
              <button
                key={member.name}
                type="button"
                aria-label={`Show ${member.name}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                onClick={() => swiperRef.current?.slideTo(index)}
                className="h-2 rounded-full transition"
                style={{
                  width: activeIndex === index ? '28px' : '8px',
                  backgroundColor:
                    activeIndex === index ? 'var(--skyBlue)' : 'rgba(255,255,255,0.45)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="team-desktop-list max-h-[680px] min-w-0 overflow-y-auto pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="space-y-6 pb-2">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'

const teamMembers = [
  {
    name: 'Waqas Ahmad',
    designation: 'IT Technician',
    image: '/images/team/waqas-ahmad.png',
    paragraph:
      'Equipped with an Associate’s Degree in Information Technology and various certifications including MCSE (Microsoft Certified Systems Engineer), CCNA (Cisco Certified Network Associate), CCNP (Cisco Certified Network Professional), and presently undergoing MTCNA (MikroTik Certified Network Associate) Training',
  },
  {
    name: 'SHERICK MARK PANTANILLA',
    designation: 'JUNIOR IT TECHNICIAN ',
    image: '/images/team/sherick-mark-pantanilla.png',
    paragraph: '',
  },
  {
    name: 'WIN HLAING OO',
    designation: 'IT TECHNICIAN',
    image: '/images/team/win-hlaing-oo.png',
    paragraph: '',
  },
  {
    name: 'NIKHIL SAGAR',
    designation: 'SENIOR IT TECHNICIAN',
    image: '/images/team/nikhil-sagar.png',
    paragraph:
      'Earned a Bachelor of Science in Information Technology. With over a decade of hands-on experience in IT support across various industries, offering extensive expertise in troubleshooting, system administration, and the deployment of innovative technological solutions.',
  },
  {
    name: 'MARK VISCA',
    designation: 'JUNIOR IT TECHNICIAN',
    image: '/images/team/mark-visca.png',
    paragraph:
      'Holds a Certificate in Computer Technology and brings practical knowledge of IT systems, troubleshooting, and support. With a rich blend of experience in hospitality, safety training, and IT support, he combines hands-on technical expertise with excellent problem-solving skills, ensuring dependable and efficient IT assistance',
  },
  {
    name: 'JAMES STRYDOM',
    designation: 'SENIOR SALES EXECUTIVE',
    image: '/images/team/james-strydom.png',
    paragraph:
      'Holds a Diploma in Hospitality Management, highlighting commitment to excellence in service delivery. More than 4 years of focused experience in customer relations and guest management, showcasing a keen grasp of client needs and delivering effective solutions',
  },
  {
    name: 'MARVIN LOPEZ CONCEPCION',
    designation: 'SALES EXECUTIVE',
    image: '/images/team/marvin-lopez-concepcion.png',
    paragraph:
      'Holds a Degree in Business Administration, emphasizing a strong foundation in management and business strategy. Over a decade of experience in customer and technical services with a focus on the IT industry, driving growth through innovative solutions and fostering lasting client relationships',
  },
]

export const TeamSection = () => {
  return (
    <section aria-label="Cybernaut team" className="py-12 text-[#251f5d] lg:py-20">
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="mb-4 text-2xl font-extralight uppercase text-[var(--skyBlue)]">Our Team</p>
          <h2 className="font-roboto-condensed text-balance text-4xl font-extrabold uppercase leading-tight text-[#fff] sm:text-5xl">
            MEET THE FACES BEHIND THE TECH
          </h2>
          <div className="mt-6 space-y-5 text-lg font-thin leading-8 tracking-wide text-[#fff]">
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

        <div className="max-h-[680px] overflow-y-auto pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="space-y-6 pb-2">
            {teamMembers.map((member) => (
              <article
                key={member.name}
                className="grid min-h-[325px] overflow-hidden rounded-4xl border border-[#251f5d]/12 bg-[linear-gradient(90deg,#133342,#0c151a)] shadow-[0_18px_45px_rgba(37,31,93,0.10)] sm:grid-cols-[minmax(0,1fr)_220px] text-white"
              >
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <h3 className="font-roboto-condensed text-3xl font-bold uppercase leading-tight">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-base font-medium uppercase tracking-wide">
                    {member.designation}
                  </p>
                  <p className="mt-10 text-base font-thin leading-7 tracking-wide">
                    {member.paragraph}
                  </p>
                </div>

                <div className="relative min-h-[220px] sm:min-h-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 35vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

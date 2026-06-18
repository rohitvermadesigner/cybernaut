// import PageTemplate, { generateMetadata } from './[slug]/page'

import { Metadata } from 'next'
import { AboutSection } from './components/AboutSection'
import BlogSection from './components/BlogSection'
import { HeroSection } from './components/HeroSection'
import { ServicesSection } from './components/ServicesSection'
import { TeamSection } from './components/TeamSection'
import { VideoSection } from './components/VideoSection'

// export default PageTemplate

// export { generateMetadata }

export const metadata: Metadata = {
  title: 'IT Support Company in Dubai | Services & Solutions - Cybernaut',
  description:
    'Cybernaut is a leading IT company in Dubai providing customized IT support and services. Boost your business productivity and continuity with our solutions.',
}

const jsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cybernaut',
    url: 'https://www.cybernautme.com',
    logo: 'https://cybernaut.excellenceauditing.net/images/logo.svg',
    telephone: '+97145725191',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3503-3507, 35th Floor, HDS Tower, Cluster F, Jumeirah Lake Towers',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+97145725191',
        contactType: 'customer service',
        areaServed: 'Dubai',
        availableLanguage: ['en', 'ar'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/cybernautme/',
      'https://www.instagram.com/cybernautme/',
      'https://www.linkedin.com/company/cybernautme/',
    ],
  },

  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cybernaut',
    image: 'https://cybernaut.excellenceauditing.net/images/logo.svg',
    url: 'https://www.cybernautme.com',
    telephone: '+97145725191',
    priceRange: 'AED',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3503-3507, 35th Floor,HDS Tower, Cluster F, Jumeirah Lake Towers',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.072278,
      longitude: 55.142356,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/cybernautme/',
      'https://www.instagram.com/cybernautme/',
      'https://www.linkedin.com/company/cybernautme/',
    ],
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd.organization, jsonLd.localBusiness]),
        }}
      />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      {/* <BlogSection /> */}
      <VideoSection />
    </>
  )
}

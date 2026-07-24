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

export function generateMetadata(): Metadata {
  return {
    title: 'IT Support Company in Dubai | Services & Solutions - Cybernaut',
    description:
      'Cybernaut is a leading IT company in Dubai providing customized IT support and services. Boost your business productivity and continuity with our solutions.',
    alternates: {
      canonical: 'https://www.cybernautme.com/',
    },
  }
}

const jsonLd = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.cybernautme.com',
    name: 'Cybernaut',
    url: 'https://www.cybernautme.com',
    logo: 'https://www.cybernautme.com/images/logo.svg',
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
        telephone: '800 292376288',
        contactType: 'customer service',
        areaServed: 'Dubai',
        availableLanguage: ['en', 'ar'],
      },
    ],
    sameAs: [
      'https://www.facebook.com/cybernautme/',
      'https://www.instagram.com/cybernautme/',
      'https://www.linkedin.com/company/cybernautme/',
      'https://www.youtube.com/@Cybernautme',
    ],
  },

  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.cybernautme.com',
    name: 'Cybernaut',
    image: 'https://www.cybernautme.com/images/logo.svg',
    url: 'https://www.cybernautme.com',
    telephone: '800 292376288',
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
      'https://www.youtube.com/@Cybernautme',
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
      <BlogSection />
      <VideoSection />
    </>
  )
}

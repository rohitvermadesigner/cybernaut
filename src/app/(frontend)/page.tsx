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
  alternates: {
    canonical: 'https://www.cybernautme.com/',
  },
}
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <BlogSection />
      <VideoSection />
    </>
  )
}

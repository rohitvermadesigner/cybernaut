// import PageTemplate, { generateMetadata } from './[slug]/page'

import { AboutSection } from './components/AboutSection'
import BlogSection from './components/BlogSection'
import { HeroSection } from './components/HeroSection'
import { ServicesSection } from './components/ServicesSection'
import { TeamSection } from './components/TeamSection'
import { VideoSection } from './components/VideoSection'

// export default PageTemplate

// export { generateMetadata }

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

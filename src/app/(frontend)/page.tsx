// import PageTemplate, { generateMetadata } from './[slug]/page'

import { AboutSection } from './components/AboutSection'
import { HeroSection } from './components/HeroSection'

// export default PageTemplate

// export { generateMetadata }

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  )
}

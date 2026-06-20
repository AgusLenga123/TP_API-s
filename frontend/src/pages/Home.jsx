import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutLeague from '../components/AboutLeague'
import StandingsPreview from '../components/StandingsPreview'
import MatchesPreview from '../components/MatchesPreview'
import TeamsPreview from '../components/TeamsPreview'
import Features from '../components/Features'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <AboutLeague />
        <StandingsPreview />
        <MatchesPreview />
        <TeamsPreview />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default Home

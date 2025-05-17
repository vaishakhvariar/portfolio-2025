import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
// import TechWheel from './components/TechWheel'
// import TechStackGrid from './components/TechStackGrid'
import Projects from './components/Projects'
import SEO from './components/SEO'
import Analytics from './components/Analytics'
import metadata from './meta.json'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('hero')

  useEffect(() => {
    // Check for dark mode preference
    if (localStorage.getItem('darkMode') === 'true' || 
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
    
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000)

    // Setup intersection observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            setCurrentSection(sectionId)
          }
        })
      },
      { threshold: 0.5 }
    )

    // Observe all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', newMode)
    document.documentElement.classList.toggle('dark')
  }

  // Get current section metadata
  const sectionMeta = metadata.sections[currentSection] || {}

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {/* SEO Component */}
      <SEO 
        title={sectionMeta.title}
        description={sectionMeta.description}
        path={`/#${currentSection}`}
      />

      {/* Analytics Component */}
      <Analytics />

      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="relative">
          {/* Background patterns */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-30" />
          </div>

          {/* Content sections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <Experience />
            <Education />
            {/* <TechStackGrid /> */}
            <Skills />
            <Projects />
            <Contact />
          </motion.div>
        </main>

        <Footer />
      </div>
    </AnimatePresence>
  )
}

export default App
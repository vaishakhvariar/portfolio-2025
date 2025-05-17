import { motion, AnimatePresence } from 'framer-motion'
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi'
import Logo from '../assets/images/vaishakh3-logo.png'
import { useState, useEffect } from 'react'

const NavBar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

const handleNavClick = (href) => {
  const element = document.querySelector(href)
  if (element) {
    const navHeight = 80 // Approximate height of the navbar
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementPosition - navHeight,
      behavior: 'smooth'
    })

    // Delay closing the mobile menu to allow scroll to complete
    setTimeout(() => {
      setIsOpen(false)
    }, 800) // adjust timing if needed
  }
}


  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* <motion.img
            src={Logo}
            alt="Vaishakh Variar - Web Developer"
            className="w-10 h-10 md:w-12 md:h-12 hover:scale-105 transition-transform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          /> */}
          <motion.a 
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#home')
            }}
            className="text-lg md:text-xl font-bold highlight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Vaishakh Variar
          </motion.a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item.href)
              }}
              className={`relative px-1 py-2 transition-colors ${
                activeSection === item.href.substring(1) 
                  ? 'highlight font-medium' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.name}
              {activeSection === item.href.substring(1) && (
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-highlight"
                  layoutId="navUnderline"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.a>
          ))}
          
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <FiSun className="highlight" /> : <FiMoon />}
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-2 flex flex-col">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className={`py-3 px-2 border-b border-gray-100 dark:border-gray-800 ${
                    activeSection === item.href.substring(1)
                      ? 'highlight font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="py-3 flex justify-center">
                <button
                  onClick={() => {
                    toggleDarkMode()
                    setIsOpen(false)
                  }}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? <FiSun className="highlight" /> : <FiMoon />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default NavBar
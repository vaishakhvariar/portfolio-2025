import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { HiDownload } from 'react-icons/hi'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Hero = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/vaishakhvariar', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/vaishakhvariar', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://instagram.com/vaishakh_variar', label: 'Instagram' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
      
      {/* Content container */}
      <motion.div 
        className="text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile image */}
        <motion.div 
          className="mb-8 mt-20"
          variants={itemVariants}
        >
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
            <LazyLoadImage
              src="/images/profile/avatar.jpg"
              alt="Vaishakh Variar"
              effect="blur"
              className="w-full h-full object-cover"
              loading="eager"
              width={192}
              height={192}
            />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6"
          variants={itemVariants}
        >
          Hi, I'm <span className="bg-clip-text text-transparent highlight">Vaishakh Variar</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
          variants={itemVariants}
        >
          A passionate <span className="highlight">Full-Stack Developer</span> crafting beautiful digital experiences with modern technologies
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          <a 
            href="#contact" 
            className="px-8 py-3 bg-highlight text-white dark:text-gray-800 rounded-full font-medium hover:bg-[#1c791d] dark:hover:bg-[#fde812] transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            Contact Me
          </a>
          <a 
            href="/your-resume.pdf" 
            className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            download
          >
            <HiDownload className="text-xl" />
            Download CV
          </a>
        </motion.div>
        
        {/* Social Links */}
        <motion.div 
          className="flex justify-center gap-6"
          variants={itemVariants}
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-600 dark:text-gray-400 hover:text-[#1c791d] dark:hover:text-[#fde812] transform hover:scale-110 transition-all"
              aria-label={social.label}
            >
              <social.icon />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      {/* <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2" />
        </div>
      </motion.div> */}
    </section>
  )
}

export default Hero
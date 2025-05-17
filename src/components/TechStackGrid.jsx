import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const technologies = [
  {
    name: 'Frontend',
    skills: [
      {
        name: 'React',
        icon: '⚛️',
        color: '#61DAFB',
        level: 90,
        projects: [
          { name: 'E-commerce Platform', url: 'https://github.com/yourusername/project1' },
          { name: 'Social Media Dashboard', url: 'https://github.com/yourusername/project2' }
        ],
        description: 'Advanced React development including hooks, context, and custom hooks. Experience with Next.js and Redux.',
        yearsOfExperience: 3,
        relatedSkills: ['Redux', 'React Router', 'Next.js']
      },
      {
        name: 'TypeScript',
        icon: '📘',
        color: '#3178C6',
        level: 85,
        projects: [
          { name: 'Type-safe API Client', url: 'https://github.com/yourusername/project3' }
        ],
        description: 'Building type-safe applications with TypeScript and modern tooling.',
        yearsOfExperience: 2,
        relatedSkills: ['ES6+', 'Type Systems', 'Generics']
      },
      {
        name: 'Tailwind',
        icon: '🎨',
        color: '#38B2AC',
        level: 88,
        projects: [
          { name: 'UI Component Library', url: 'https://github.com/yourusername/project4' }
        ],
        description: 'Creating responsive and beautiful UIs with Tailwind CSS.',
        yearsOfExperience: 2,
        relatedSkills: ['CSS3', 'Responsive Design', 'Animation']
      }
    ]
  },
  {
    name: 'Backend',
    skills: [
      {
        name: 'Node.js',
        icon: '⬢',
        color: '#68A063',
        level: 85,
        projects: [
          { name: 'REST API Service', url: 'https://github.com/yourusername/api-project' },
          { name: 'Real-time Chat Server', url: 'https://github.com/yourusername/chat-app' }
        ],
        description: 'Building scalable backend services, RESTful APIs, and real-time applications.',
        yearsOfExperience: 2,
        relatedSkills: ['Express', 'MongoDB', 'Socket.io']
      },
      {
        name: 'Python',
        icon: '🐍',
        color: '#3776AB',
        level: 80,
        projects: [
          { name: 'Data Analysis Tool', url: 'https://github.com/yourusername/project5' }
        ],
        description: 'Data processing, API development, and automation scripts.',
        yearsOfExperience: 2,
        relatedSkills: ['Django', 'FastAPI', 'Pandas']
      }
    ]
  },
  {
    name: 'DevOps',
    skills: [
      {
        name: 'Docker',
        icon: '🐳',
        color: '#2496ED',
        level: 75,
        projects: [
          { name: 'Containerized Microservices', url: 'https://github.com/yourusername/project6' }
        ],
        description: 'Containerization and orchestration of applications.',
        yearsOfExperience: 1,
        relatedSkills: ['Kubernetes', 'Docker Compose', 'CI/CD']
      }
    ]
  }
]

const TechStackGrid = () => {
  const [selectedTech, setSelectedTech] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Frontend')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Technical Skills
          </h2> */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="highlight">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my technical expertise and the projects where I've applied these technologies.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 -mx-4 px-4 md:px-0">
          <nav className="flex space-x-2 md:space-x-4">
            {technologies.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${
                  selectedCategory === category.name
                    ? 'bg-highlight text-white dark:text-gray-800 shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {technologies
            .find(cat => cat.name === selectedCategory)
            ?.skills.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                className="relative group"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedTech(tech)}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                  {/* Tech Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: tech.color + '20' }}
                    >
                      {tech.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{tech.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tech.yearsOfExperience} years experience
                      </p>
                    </div>
                  </div>

                  {/* Proficiency Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Proficiency</span>
                      <span>{tech.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: tech.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Related Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tech.relatedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: tech.color + '20',
                          color: tech.color 
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Projects Preview - Only show on larger screens */}
                  {!isMobile && (
                    <div className="space-y-2">
                      {tech.projects.slice(0, 1).map((project) => (
                        <a
                          key={project.name}
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub />
                          <span>{project.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
        </motion.div>
      </div>

      {/* Detailed Tech Modal */}
      {selectedTech && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTech(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                style={{ backgroundColor: selectedTech.color + '20' }}
              >
                {selectedTech.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{selectedTech.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {selectedTech.yearsOfExperience} years experience
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {selectedTech.description}
            </p>

            <div className="space-y-4">
              <h4 className="font-semibold">Related Projects</h4>
              {selectedTech.projects.map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{project.name}</span>
                    <div className="flex gap-2">
                      <FaGithub className="text-gray-400" />
                      <FaExternalLinkAlt className="text-gray-400" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default TechStackGrid 
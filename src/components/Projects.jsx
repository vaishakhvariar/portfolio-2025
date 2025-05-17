import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and Tailwind CSS. Features dark mode, animations, and a clean design.',
    image: '/images/projects/portfolio.jpg',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/vaishakhvariar/portfolio-v2-2025',
    liveUrl: 'https://vaishakhvariar.com',
    featured: true
  },
  // Add more projects here
]

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="highlight">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for building modern web applications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image with Overlay */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-xl font-bold">{project.title}</h3>
                    <div className="flex gap-4 mt-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        <FaGithub className="text-2xl" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        <FaExternalLinkAlt className="text-xl" />
                      </a>
                    </div>
                  </div>
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-highlight text-white dark:text-gray-800 text-sm px-3 py-1 rounded-full shadow-md">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More Button */}
        {projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors">
              View More Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Projects
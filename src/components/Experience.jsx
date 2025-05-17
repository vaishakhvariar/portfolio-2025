import { motion } from 'framer-motion'
import { HiOutlineBriefcase } from 'react-icons/hi'

const experiences = [
  {
    role: 'Frontend Developer',
    company: '4Seer Technologies Ltd',
    period: '2023 - Present',
    description: 'Developed and maintained web applications using React and other modern technologies.',
    highlights: [
      'Built responsive and performant user interfaces using React and Tailwind CSS',
      'Collaborated with cross-functional teams to deliver high-quality software solutions',
      'Implemented modern frontend practices and optimizations'
    ]
  }
  // Add more experiences here
]

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="highlight">Experience</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey and the valuable experiences I've gained along the way
          </p>
        </motion.div>
      
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700" />
          
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="relative mb-12 md:mb-16 md:grid md:grid-cols-2 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 -translate-y-1/3">
                <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-800" />
              </div>

              <div className={`md:text-right ${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'}`}>
                <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2 md:justify-end">
                    <HiOutlineBriefcase className="text-blue-500 text-xl" />
                    <h3 className="text-xl font-bold highlight">{exp.role}</h3>
                  </div>
                  <h4 className="text-lg mb-2">{exp.company}</h4>
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 mb-4">
                    {exp.period}
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-600 dark:text-gray-300 text-sm">
                        • {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
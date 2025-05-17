import { motion } from 'framer-motion'
import { HiOutlineAcademicCap } from 'react-icons/hi'

const education = [
  {
    degree: 'M.Sc Computing Science',
    field: 'Computing Science',
    institution: 'University College Cork, Ireland',
    period: '2020 - 2021',
    location: 'Cork, Ireland',
    description: 'Advanced studies in Computing Science with focus on modern software development and data technologies.',
    highlights: [
      'Key Modules: Database Technology, Information Storage and Retrieval',
      'Optimisation, Applied Computer Simulation and Analysis',
      'Topics in Artificial Intelligence, Data Mining'
    ]
  },
  {
    degree: 'B.E Computer Science',
    field: 'Computer Science',
    institution: 'NMAM Institute of Technology, India',
    period: '2015 - 2019',
    location: 'Karnataka, India',
    description: 'Comprehensive study of computer science fundamentals and software engineering principles.',
    highlights: [
      'Data Structures & Algorithms, Object-Oriented Programming',
      'Web Development, Database Systems',
      'Computer Networks, Operating Systems'
    ]
  }
]

const Education = () => {
  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="highlight">Education</span> & Learning
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My academic journey and the knowledge I've gained along the way
          </p>
        </motion.div>
      
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700" />
          
          {education.map((edu, index) => (
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
                <div className="w-4 h-4 rounded-full bg-purple-500 border-4 border-white dark:border-gray-800" />
              </div>

              <div className={`md:text-right ${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'}`}>
                <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2 md:justify-end">
                    <HiOutlineAcademicCap className="text-purple-500 text-xl" />
                    <h3 className="text-xl font-bold highlight">{edu.degree}</h3>
                  </div>
                  
                  <h4 className="text-lg text-purple-600 dark:text-purple-400 mb-2">{edu.field}</h4>
                  <h5 className="text-gray-700 dark:text-gray-300 mb-2">{edu.institution}</h5>
                  
                  <div className="flex flex-wrap gap-2 mb-4 md:justify-end">
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                      {edu.period}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                      {edu.location}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{edu.description}</p>
                  
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, i) => (
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

export default Education
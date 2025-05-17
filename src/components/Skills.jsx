import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiOutlineLightningBolt, HiCode, HiOutlineDesktopComputer, HiOutlineColorSwatch } from 'react-icons/hi'

const skills = [
  { 
    name: 'React', 
    level: 90,
    color: '#61DAFB',
    category: 'Frontend',
    icon: HiCode,
    description: 'Building modern and responsive user interfaces'
  },
  { 
    name: 'JavaScript', 
    level: 90,
    color: '#F7DF1E',
    category: 'Frontend',
    icon: HiCode,
    description: 'ES6+, TypeScript, and modern JavaScript practices'
  },
  { 
    name: 'Tailwind', 
    level: 90,
    color: '#38B2AC',
    category: 'Frontend',
    icon: HiCode,
    description: 'Rapid UI development with utility-first CSS'
  },
  { 
    name: 'Node.js', 
    level: 60,
    color: '#339933',
    category: 'Backend',
    icon: HiOutlineDesktopComputer,
    description: 'Server-side development and API integration'
  },
  { 
    name: 'UI/UX', 
    level: 80,
    color: '#FF4088',
    category: 'Design',
    icon: HiOutlineColorSwatch,
    description: 'User-centered design and interface optimization'
  },
  { 
    name: 'Figma', 
    level: 40,
    color: '#F24E1E',
    category: 'Design',
    icon: HiOutlineColorSwatch,
    description: 'Design prototyping and collaboration'
  },
]

const categoryIcons = {
  'All': HiOutlineLightningBolt,
  'Frontend': HiCode,
  'Backend': HiOutlineDesktopComputer,
  'Design': HiOutlineColorSwatch
}

const Skills = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredSkill, setHoveredSkill] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const categories = ['All', ...new Set(skills.map(skill => skill.category))]
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="highlight">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my technical expertise and proficiency in various technologies
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <nav className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = categoryIcons[category]
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                    selectedCategory === category
                      ? 'bg-highlight text-white dark:text-gray-800 shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="text-lg" />
                  {category}
                </button>
              )
            })}
          </nav>
        </div>

        <div className={`grid gap-6 ${
          isMobile ? 'grid-cols-1' : 'grid-cols-2'
        }`}>
          {filteredSkills.map((skill, index) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                      style={{ 
                        backgroundColor: `${skill.color}15`,
                        color: skill.color
                      }}
                    >
                      <skill.icon />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{skill.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                  <span 
                    className="text-lg font-medium"
                    style={{ color: skill.color }}
                  >
                    {skill.level}%
                  </span>
                </div>

                <div className="relative h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1,
                      ease: "easeOut",
                      delay: index * 0.1
                    }}
                  />
                </div>

                {/* Skill level indicator */}
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Beginner</span>
                  <span>Advanced</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          © {new Date().getFullYear()} Vaishakh Variar. All rights reserved.
        </motion.p>
        <motion.div 
          className="flex justify-center space-x-4 mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Add your social media links here */}
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
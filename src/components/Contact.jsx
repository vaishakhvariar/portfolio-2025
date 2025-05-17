import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiMail, FiLinkedin, FiGithub, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi'
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ success: false, message: '' })
    
    // EmailJS configuration
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message
        },
        publicKey
      );
      
      if (result.status === 200) {
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! I will get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again or contact me directly via email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactMethods = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'vaishakhvariar@gmail.com',
      href: 'mailto:vaishakhvariar@gmail.com',
      color: '#EA4335'
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/vaishakhvariar',
      href: 'https://linkedin.com/in/vaishakhvariar',
      color: '#0A66C2'
    },
    {
      icon: FiGithub,
      label: 'GitHub',
      value: 'github.com/vaishakhvariar',
      href: 'https://github.com/vaishakhvariar',
      color: '#54d454'
    }
  ]

  return (
    <section id="contact" className="py-12 sm:py-20 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Get In <span className="highlight">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Contact Information</h3>
            <div className="space-y-4 sm:space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl transition-colors"
                    style={{ 
                      backgroundColor: `${method.color}15`,
                      color: method.color
                    }}
                  >
                    <method.icon />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">{method.label}</h4>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-highlight transition-colors text-xs sm:text-sm break-all">
                      {method.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiUser className="text-sm sm:text-base" />
                  </div>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-highlight dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiMail className="text-sm sm:text-base" />
                  </div>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-highlight dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                </div>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiMessageSquare className="text-sm sm:text-base" />
                  </div>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-highlight dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  ></textarea>
                </div>
              </div>
              {submitStatus.message && (
                <div className={`text-sm p-3 rounded ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {submitStatus.message}
                </div>
              )}
              <motion.button
                type="submit"
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-highlight text-white dark:text-gray-800 rounded-lg font-medium text-sm sm:text-base hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <FiSend className="text-base sm:text-lg" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
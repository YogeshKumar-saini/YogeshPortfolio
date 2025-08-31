import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart
} from 'react-icons/fa';
import { SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/YogeshKumar-saini', label: 'GitHub', color: 'hover:text-gray-900' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/yogesh-saini', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: 'https://twitter.com/yogesh_saini', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: FaInstagram, href: 'https://instagram.com/yogesh_saini', label: 'Instagram', color: 'hover:text-pink-600' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Full-Stack Development',
    'AI/ML Solutions',
    'Data Analytics',
    'UI/UX Design',
    'DevOps & Cloud',
    'API Development',
  ];

  const technologies = [
    'React & Next.js',
    'Node.js & Express',
    'MongoDB & PostgreSQL',
    'TypeScript',
    'Python & TensorFlow',
    'AWS & Docker',
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="grid-pattern opacity-10" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-premium py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-glow">
                    <SparklesIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold gradient-text">
                      Yogesh Kumar Saini
                    </h3>
                    <p className="text-gray-400 font-medium">Full-Stack Developer & Innovator</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  Passionate about creating innovative solutions with modern technologies. 
                  I specialize in building scalable applications that drive real-world impact 
                  and enhance user experiences through thoughtful design and robust engineering.
                </p>
                
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 bg-gray-800/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:shadow-glow border border-gray-700/50`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <RocketLaunchIcon className="w-5 h-5 text-purple-400" />
                <span>Quick Links</span>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block font-medium"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h4 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <SparklesIcon className="w-5 h-5 text-blue-400" />
                <span>Services</span>
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="text-gray-300 font-medium"
                  >
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Technologies Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-gray-700/50"
          >
            <h4 className="text-2xl font-bold text-center mb-8 gradient-text">
              Technologies I Work With
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-800/80 backdrop-blur-md rounded-xl text-gray-300 font-medium border border-gray-700/50 hover:border-purple-500/50 hover:text-white transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 pt-12 border-t border-gray-700/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-purple-400 w-5 h-5" />
                <span className="text-gray-300">Jaipur, Rajasthan, India</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-blue-400 w-5 h-5" />
                <a 
                  href="mailto:yksaini1090@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  yksaini1090@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <FaPhone className="text-green-400 w-5 h-5" />
                <a 
                  href="tel:+918209068126"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  +91 8209068126
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Premium Bottom Bar */}
        <div className="border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-md">
          <div className="container-premium py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-400 text-center md:text-left mb-4 md:mb-0"
              >
                © {currentYear} Yogesh Kumar Saini. All rights reserved.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 flex items-center space-x-2"
              >
                <span>Built with</span>
                <FaHeart className="text-red-400 w-4 h-4 animate-pulse" />
                <span>using Next.js & TypeScript</span>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
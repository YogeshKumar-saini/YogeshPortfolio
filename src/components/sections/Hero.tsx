'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from 'react-icons/fa';

export default function Hero() {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/YogeshKumar-saini', label: 'GitHub', color: 'hover:text-gray-900' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/yogesh-saini', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: 'https://twitter.com/yogesh_saini', label: 'Twitter', color: 'hover:text-blue-400' },
  ];

  const floatingElements = [
    { icon: '💻', delay: 0, position: 'top-20 left-20' },
    { icon: '🚀', delay: 2, position: 'top-40 right-20' },
    { icon: '⚡', delay: 4, position: 'bottom-40 left-40' },
    { icon: '🎨', delay: 1, position: 'top-60 right-40' },
    { icon: '🔥', delay: 3, position: 'bottom-20 right-20' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50" />
        <div className="decoration-blob decoration-blob-1" />
        <div className="decoration-blob decoration-blob-2" />
        <div className="decoration-blob decoration-blob-3" />
        
        {/* Floating Elements */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: element.delay, duration: 0.8 }}
            className={`absolute ${element.position} text-4xl animate-float`}
            style={{ animationDelay: `${element.delay}s` }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>

      <div className="container-premium relative z-10">
        <div className="text-center">
          {/* Premium Profile Section */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <div className="relative inline-block">
              <div className="w-56 h-56 mx-auto rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-purple-600 p-2 animate-glow">
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Yogesh Kumar Saini"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="absolute bottom-6 right-6">
                <div className="w-6 h-6 bg-green-400 rounded-full border-4 border-white shadow-lg">
                  <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
              >
                <div className="badge-featured flex items-center space-x-2 px-4 py-2">
                  <SparklesIcon className="w-4 h-4" />
                  <span>Available for Work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Premium Text Content */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-purple-600 font-semibold tracking-wide"
              >
                👋 Hello, I'm
              </motion.p>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight">
                <span className="block gradient-text">Yogesh</span>
                <span className="block text-gray-900 text-shadow-lg">Saini</span>
              </h1>
              
              <div className="relative">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-600 mb-2">
                  Full-Stack Developer
                </h2>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1 }}
                  className="h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto max-w-md"
                />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Crafting exceptional digital experiences with cutting-edge technologies. 
              Specialized in <span className="gradient-text font-semibold">MERN stack</span>, 
              <span className="gradient-text-secondary font-semibold"> AI/ML</span>, and 
              <span className="gradient-text-accent font-semibold"> modern web solutions</span> 
              that drive real-world impact.
            </motion.p>
          </motion.div>

          {/* Premium Action Buttons */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="#projects" className="btn-premium group">
                <span className="relative z-10 flex items-center space-x-3">
                  <RocketLaunchIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Explore My Work</span>
                  <ChevronDownIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
              </a>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="btn-outline-premium">
                <span className="flex items-center space-x-3">
                  <FaDownload className="w-4 h-4" />
                  <span>Download Resume</span>
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Premium Social Links */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center justify-center space-x-6 mt-16"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-14 h-14 bg-white/80 backdrop-blur-md rounded-2xl shadow-premium flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 hover:shadow-glow border border-white/20`}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-12 border-2 border-gray-300 rounded-full flex justify-center p-2"
        >
          <div className="w-1 h-3 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Premium Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
    </section>
  );
}
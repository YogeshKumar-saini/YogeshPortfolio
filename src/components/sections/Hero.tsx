'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import Button from '@/components/ui/Button';

export default function Hero() {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/YogeshKumar-saini', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/yogesh-saini', label: 'LinkedIn' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-primary-500 to-primary-600 p-1 animate-glow">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                alt="Yogesh Kumar Saini"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-primary-600 text-xl mb-4 font-medium">
              Hi there! 👋
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-dark-900 mb-6">
              I'm <span className="gradient-text">Yogesh</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-dark-600 mb-8 font-light">
              Full-Stack Developer & Data Scientist
            </h2>
            <p className="text-lg text-dark-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              Passionate about creating innovative solutions with modern technologies. 
              Specialized in MERN stack, AI/ML, and building scalable applications 
              that make a difference.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button size="lg" className="group">
              <a href="#projects" className="flex items-center">
                View My Work
                <ChevronDownIcon className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
            <Button variant="outline" size="lg">
              <a href="/resume.pdf" download className="flex items-center">
                <FaDownload className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center space-x-6"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-dark-600 hover:text-primary-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-dark-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-dark-300 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
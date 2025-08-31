'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { Skill } from '@/types';

export default function About() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
        setSelectedSkill(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const aboutHighlights = [
    {
      icon: '🎯',
      title: 'Problem Solver',
      description: 'Passionate about solving complex challenges with elegant, scalable solutions that make a real difference.'
    },
    {
      icon: '🚀',
      title: 'Innovation Driven',
      description: 'Always exploring cutting-edge technologies and methodologies to stay ahead of the curve.'
    },
    {
      icon: '🤝',
      title: 'Collaborative',
      description: 'Strong believer in teamwork, knowledge sharing, and building products that users love.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experience' },
    { number: '15+', label: 'Technologies Mastered' },
    { number: '100%', label: 'Client Satisfaction' },
  ];

  if (isLoading) {
    return (
      <section id="about" className="py-32 section-bg-1">
        <div className="container-premium">
          <div className="flex items-center justify-center h-64">
            <div className="spinner" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-32 section-bg-1 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl" />

      <div className="container-premium relative z-10">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
            <SparklesIcon className="w-5 h-5 text-purple-600" />
            <span className="text-purple-600 font-semibold">About Me</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="heading-premium">Crafting Digital</span>
            <br />
            <span className="gradient-text">Excellence</span>
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            A passionate developer with a relentless drive for innovation, 
            creating solutions that bridge the gap between imagination and reality.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="text-center"
            >
              <div className="card-premium p-8 hover-glow">
                <h3 className="text-4xl md:text-5xl font-black gradient-text mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* About Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {aboutHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.5 }}
              className="card-premium p-8 text-center hover-lift group"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {highlight.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{highlight.title}</h3>
              <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                My <span className="gradient-text">Expertise</span>
              </h3>
              <p className="text-xl text-gray-600">
                Click on any skill category to explore my capabilities
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSkill(skill)}
                  className={`relative cursor-pointer transition-all duration-500 ${
                    selectedSkill?._id === skill._id 
                      ? 'card-dark shadow-glow' 
                      : 'card-premium hover-glow'
                  }`}
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-5xl">{skill.icon}</div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        selectedSkill?._id === skill._id
                          ? 'bg-white text-purple-600'
                          : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      }`}>
                        {skill.count}
                      </div>
                    </div>
                    
                    <h4 className={`text-xl font-bold mb-2 ${
                      selectedSkill?._id === skill._id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {skill.title}
                    </h4>
                    
                    <p className={`text-sm ${
                      selectedSkill?._id === skill._id ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {skill.skills.length} specialized skills
                    </p>
                  </div>

                  {/* Selection Indicator */}
                  {selectedSkill?._id === skill._id && (
                    <motion.div
                      layoutId="skillSelector"
                      className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl"
                      style={{ zIndex: -1 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Selected Skill Details */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:sticky lg:top-32"
          >
            {selectedSkill && (
              <motion.div
                key={selectedSkill._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="card-premium p-10"
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="text-6xl">{selectedSkill.icon}</div>
                  <div>
                    <p className="text-purple-600 font-semibold mb-1">Expertise in</p>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {selectedSkill.title}
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {selectedSkill.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl hover:from-purple-50 hover:to-blue-50 transition-all duration-300"
                    >
                      <CheckBadgeIcon className="w-6 h-6 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Skill Progress Visualization */}
                <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Proficiency Level</h4>
                  <div className="progress-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '95%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="progress-fill"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Expert Level - 95%</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
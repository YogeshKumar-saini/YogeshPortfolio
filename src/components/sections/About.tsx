'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  const aboutText = [
    "A passionate and self-driven developer with a strong foundation in full-stack web development, data analytics, and cloud workflows. Specialized in MERN and Next.js with React, Tailwind CSS, TypeScript, MongoDB, PostgreSQL, and Express.js, along with practical experience in machine learning and deploying AI models into production.",
    
    "Driven by curiosity and consistent learning, I have explored UI/UX design, DevOps, MLOps, SEO, server management, and scalable software architecture. My projects include e-commerce platforms, portfolio dashboards, real-time applications, and AI-based tools for productivity and learning enhancement.",
    
    "I enjoy solving problems systematically, focusing on clean architecture, efficient algorithms, and deployment strategies. My goal is to build impactful solutions while continuously improving my skills, embracing new technologies, and adapting to evolving challenges in the tech landscape."
  ];

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="spinner" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-900 mb-6">
            About <span className="gradient-text">Myself</span>
          </h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto">
            Knack for crafting seamless full-stack and AI-powered applications
          </p>
        </motion.div>

        {/* About Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {aboutText.map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-dark-600 leading-relaxed"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedSkill(skill)}
                className={`card p-6 cursor-pointer relative group ${
                  selectedSkill?._id === skill._id 
                    ? 'bg-primary-500 text-white' 
                    : 'hover:bg-primary-50'
                }`}
              >
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className={`font-semibold text-lg mb-2 ${
                  selectedSkill?._id === skill._id ? 'text-white' : 'text-dark-800'
                }`}>
                  {skill.title}
                </h3>
                
                {/* Count Badge */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  selectedSkill?._id === skill._id
                    ? 'bg-white text-primary-600'
                    : 'bg-primary-500 text-white group-hover:scale-110'
                }`}>
                  {skill.count}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Skill Details */}
          <motion.div
            key={selectedSkill?._id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8 lg:p-12"
          >
            <p className="text-primary-600 mb-2">My skills as</p>
            <h3 className="text-3xl font-bold text-dark-900 mb-6">
              {selectedSkill?.title}
            </h3>
            <ul className="space-y-3">
              {selectedSkill?.skills.map((skill, index) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-dark-600"
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
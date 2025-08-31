'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, CodeBracketIcon, SparklesIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Project } from '@/types';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🌟', count: 0 },
    { id: 'web', name: 'Web Apps', icon: '🌐', count: 0 },
    { id: 'ai', name: 'AI/ML', icon: '🤖', count: 0 },
    { id: 'data', name: 'Data Science', icon: '📊', count: 0 },
    { id: 'mobile', name: 'Mobile', icon: '📱', count: 0 },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [projects, selectedCategory]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
        
        // Update category counts
        categories.forEach(category => {
          if (category.id === 'all') {
            category.count = data.length;
          } else {
            category.count = data.filter((p: Project) => p.category === category.id).length;
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-32 section-bg-2">
        <div className="container-premium">
          <div className="flex items-center justify-center h-64">
            <div className="spinner" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-32 section-bg-2 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />

      <div className="container-premium relative z-10">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
            <FunnelIcon className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">Portfolio</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            <span className="heading-premium">Featured</span>
            <br />
            <span className="gradient-text">Projects</span>
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
            Discover my latest work showcasing innovation, creativity, and technical excellence 
            across various domains and technologies.
          </p>
        </motion.div>

        {/* Premium Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative px-8 py-4 rounded-2xl font-semibold transition-all duration-500 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-glow'
                  : 'bg-white/80 backdrop-blur-md text-gray-700 hover:bg-white border border-gray-200/50 hover:shadow-lg'
              }`}
            >
              <span className="flex items-center space-x-3">
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  selectedCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Premium Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group card-premium overflow-hidden hover-lift"
              >
                {/* Premium Project Image */}
                <div className="relative aspect-premium overflow-hidden">
                  <img
                    src={project.images[0] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Premium Action Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-purple-600 hover:bg-white hover:shadow-glow transition-all duration-300"
                      >
                        <EyeIcon className="w-6 h-6" />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-purple-600 hover:bg-white hover:shadow-glow transition-all duration-300"
                      >
                        <CodeBracketIcon className="w-6 h-6" />
                      </motion.a>
                    )}
                  </div>

                  {/* Premium Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="badge-premium">
                      {project.category.toUpperCase()}
                    </span>
                    {project.featured && (
                      <span className="badge-featured flex items-center space-x-1">
                        <SparklesIcon className="w-3 h-3" />
                        <span>FEATURED</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Premium Project Info */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:gradient-text transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Premium Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 4).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-gray-100 to-purple-50 text-gray-700 text-sm rounded-xl font-medium border border-gray-200/50"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm rounded-xl font-bold">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Premium Action Buttons */}
                  <div className="flex space-x-3">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 hover:shadow-glow"
                      >
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold text-center hover:border-purple-300 hover:text-purple-600 transition-all duration-300"
                      >
                        View Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No projects found</h3>
            <p className="text-gray-500 text-lg">Try selecting a different category</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
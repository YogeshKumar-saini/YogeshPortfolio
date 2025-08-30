'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Project } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ProjectForm from './ProjectForm';

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setProjects(projects.filter(p => p._id !== id));
        toast.success('Project deleted successfully');
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleProjectSaved = () => {
    fetchProjects();
    handleModalClose();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-dark-900 mb-2">Projects</h2>
          <p className="text-dark-600">Manage your portfolio projects</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center space-x-2">
          <PlusIcon className="w-5 h-5" />
          <span>Add Project</span>
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card overflow-hidden group"
          >
            <div className="relative h-48">
              <img
                src={project.images[0] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop'}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </a>
                  )}
                  <button
                    onClick={() => handleEdit(project)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id!)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-primary-500 text-white text-xs rounded-full font-medium">
                  {project.category.toUpperCase()}
                </span>
              </div>
              
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full font-medium">
                    FEATURED
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="font-bold text-lg text-dark-900 mb-2">{project.title}</h3>
              <p className="text-dark-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 text-dark-600 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-dark-600 text-xs rounded">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleEdit(project)}
                  className="flex-1"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(project._id!)}
                  className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <FolderIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark-700 mb-2">No projects yet</h3>
          <p className="text-dark-500 mb-6">Start by adding your first project</p>
          <Button onClick={handleAdd}>Add Your First Project</Button>
        </div>
      )}

      {/* Project Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
        size="xl"
      >
        <ProjectForm
          project={editingProject}
          onSave={handleProjectSaved}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
}
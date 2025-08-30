'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Skill } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import SkillForm from './SkillForm';

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setSkills(skills.filter(s => s._id !== id));
        toast.success('Skill deleted successfully');
      } else {
        toast.error('Failed to delete skill');
      }
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const handleSkillSaved = () => {
    fetchSkills();
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
          <h2 className="text-3xl font-bold text-dark-900 mb-2">Skills</h2>
          <p className="text-dark-600">Manage your technical skills and expertise</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center space-x-2">
          <PlusIcon className="w-5 h-5" />
          <span>Add Skill</span>
        </Button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6 relative group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{skill.icon}</div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(skill)}
                  className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(skill._id!)}
                  className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-lg text-dark-900 mb-3">{skill.title}</h3>
            
            <div className="space-y-2">
              {skill.skills.slice(0, 5).map((skillItem, idx) => (
                <div key={idx} className="flex items-center text-sm text-dark-600">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-2" />
                  {skillItem}
                </div>
              ))}
              {skill.skills.length > 5 && (
                <p className="text-sm text-dark-500">+{skill.skills.length - 5} more skills</p>
              )}
            </div>

            {/* Count Badge */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {skill.count}
            </div>

            {/* Featured Badge */}
            {skill.featured && (
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full font-medium">
                  FEATURED
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛠️</div>
          <h3 className="text-xl font-semibold text-dark-700 mb-2">No skills yet</h3>
          <p className="text-dark-500 mb-6">Start by adding your first skill category</p>
          <Button onClick={handleAdd}>Add Your First Skill</Button>
        </div>
      )}

      {/* Skill Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingSkill ? 'Edit Skill' : 'Add New Skill'}
        size="lg"
      >
        <SkillForm
          skill={editingSkill}
          onSave={handleSkillSaved}
          onCancel={handleModalClose}
        />
      </Modal>
    </div>
  );
}
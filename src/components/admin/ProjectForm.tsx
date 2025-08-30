'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Project } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ProjectFormProps {
  project?: Project | null;
  onSave: () => void;
  onCancel: () => void;
}

interface ProjectFormData {
  title: string;
  name: string;
  description: string;
  detailedDescription: string;
  techStack: { value: string }[];
  images: { value: string }[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'ai' | 'data' | 'other';
}

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: project?.title || '',
      name: project?.name || '',
      description: project?.description || '',
      detailedDescription: project?.detailedDescription || '',
      techStack: project?.techStack.map(tech => ({ value: tech })) || [{ value: '' }],
      images: project?.images.map(img => ({ value: img })) || [{ value: '' }],
      githubUrl: project?.githubUrl || '',
      liveUrl: project?.liveUrl || '',
      featured: project?.featured || false,
      category: project?.category || 'web',
    },
  });

  const {
    fields: techFields,
    append: appendTech,
    remove: removeTech,
  } = useFieldArray({
    control,
    name: 'techStack',
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: 'images',
  });

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);

    try {
      const projectData = {
        ...data,
        techStack: data.techStack.map(tech => tech.value).filter(Boolean),
        images: data.images.map(img => img.value).filter(Boolean),
      };

      const url = project ? `/api/projects/${project._id}` : '/api/projects';
      const method = project ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        toast.success(project ? 'Project updated successfully' : 'Project created successfully');
        onSave();
      } else {
        toast.error('Failed to save project');
      }
    } catch (error) {
      toast.error('Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Project Title"
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
          placeholder="Amazing Web App"
        />
        <Input
          label="Project Name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
          placeholder="amazing-web-app"
        />
      </div>

      <Textarea
        label="Short Description"
        {...register('description', { required: 'Description is required' })}
        error={errors.description?.message}
        placeholder="Brief description of the project..."
        rows={3}
      />

      <Textarea
        label="Detailed Description"
        {...register('detailedDescription', { required: 'Detailed description is required' })}
        error={errors.detailedDescription?.message}
        placeholder="Detailed explanation of the project, features, and implementation..."
        rows={5}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-700 mb-2">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="form-input"
          >
            <option value="web">Web Application</option>
            <option value="mobile">Mobile App</option>
            <option value="ai">AI/ML Project</option>
            <option value="data">Data Science</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex items-center space-x-4 pt-8">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('featured')}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-dark-700">Featured Project</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="GitHub URL (Optional)"
          {...register('githubUrl')}
          placeholder="https://github.com/username/repo"
        />
        <Input
          label="Live Demo URL (Optional)"
          {...register('liveUrl')}
          placeholder="https://your-project.com"
        />
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">Tech Stack</label>
        <div className="space-y-2">
          {techFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <Input
                {...register(`techStack.${index}.value` as const)}
                placeholder="React, Node.js, MongoDB..."
                className="flex-1"
              />
              {techFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTech(index)}
                  className="w-10 h-10 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendTech({ value: '' })}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Technology</span>
          </button>
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">Project Images</label>
        <div className="space-y-2">
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <Input
                {...register(`images.${index}.value` as const)}
                placeholder="https://example.com/image.jpg"
                className="flex-1"
              />
              {imageFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="w-10 h-10 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendImage({ value: '' })}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Image URL</span>
          </button>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex space-x-4 pt-6 border-t">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="flex-1"
        >
          {project ? 'Update Project' : 'Create Project'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
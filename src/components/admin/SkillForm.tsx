'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Skill } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SkillFormProps {
  skill?: Skill | null;
  onSave: () => void;
  onCancel: () => void;
}

interface SkillFormData {
  title: string;
  icon: string;
  skills: { value: string }[];
  count: number;
  featured: boolean;
}

export default function SkillForm({ skill, onSave, onCancel }: SkillFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SkillFormData>({
    defaultValues: {
      title: skill?.title || '',
      icon: skill?.icon || '💻',
      skills: skill?.skills.map(s => ({ value: s })) || [{ value: '' }],
      count: skill?.count || 1,
      featured: skill?.featured ?? true,
    },
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit = async (data: SkillFormData) => {
    setIsSubmitting(true);

    try {
      const skillData = {
        ...data,
        skills: data.skills.map(s => s.value).filter(Boolean),
      };

      const url = skill ? `/api/skills/${skill._id}` : '/api/skills';
      const method = skill ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(skillData),
      });

      if (response.ok) {
        toast.success(skill ? 'Skill updated successfully' : 'Skill created successfully');
        onSave();
      } else {
        toast.error('Failed to save skill');
      }
    } catch (error) {
      toast.error('Failed to save skill');
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonIcons = ['💻', '🎨', '⚙️', '📱', '🤖', '📊', '🔧', '🌐', '⚡', '🚀'];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Skill Category Title"
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
          placeholder="Frontend Developer"
        />
        <div>
          <label className="block text-sm font-medium text-dark-700 mb-2">Count/Order</label>
          <input
            type="number"
            min="1"
            {...register('count', { required: 'Count is required', min: 1 })}
            className="form-input"
            placeholder="1"
          />
          {errors.count && (
            <p className="mt-1 text-sm text-red-600">{errors.count.message}</p>
          )}
        </div>
      </div>

      {/* Icon Selection */}
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">Icon</label>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {commonIcons.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => {
                const event = { target: { value: icon } } as any;
                register('icon').onChange(event);
              }}
              className="w-12 h-12 text-2xl border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors flex items-center justify-center"
            >
              {icon}
            </button>
          ))}
        </div>
        <Input
          {...register('icon', { required: 'Icon is required' })}
          error={errors.icon?.message}
          placeholder="💻 or custom emoji"
        />
      </div>

      {/* Skills List */}
      <div>
        <label className="block text-sm font-medium text-dark-700 mb-2">Skills</label>
        <div className="space-y-2">
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <Input
                {...register(`skills.${index}.value` as const)}
                placeholder="React, TypeScript, Node.js..."
                className="flex-1"
              />
              {skillFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="w-10 h-10 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendSkill({ value: '' })}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {/* Featured Toggle */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('featured')}
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <label className="text-sm font-medium text-dark-700">
          Show in featured skills section
        </label>
      </div>

      {/* Form Actions */}
      <div className="flex space-x-4 pt-6 border-t">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="flex-1"
        >
          {skill ? 'Update Skill' : 'Create Skill'}
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
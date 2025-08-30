import mongoose, { Schema, Document } from 'mongoose';
import { Project } from '@/types';

interface ProjectDocument extends Project, Document {}

const ProjectSchema = new Schema<ProjectDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  detailedDescription: {
    type: String,
    required: true,
  },
  techStack: [{
    type: String,
    required: true,
  }],
  images: [{
    type: String,
    required: true,
  }],
  githubUrl: {
    type: String,
    trim: true,
  },
  liveUrl: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'ai', 'data', 'other'],
    default: 'web',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model<ProjectDocument>('Project', ProjectSchema);
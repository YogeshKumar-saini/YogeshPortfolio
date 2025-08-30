import mongoose, { Schema, Document } from 'mongoose';
import { Skill } from '@/types';

interface SkillDocument extends Skill, Document {}

const SkillSchema = new Schema<SkillDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
  },
  skills: [{
    type: String,
    required: true,
  }],
  count: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Skill || mongoose.model<SkillDocument>('Skill', SkillSchema);
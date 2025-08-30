export interface Project {
  _id?: string;
  title: string;
  name: string;
  description: string;
  detailedDescription: string;
  techStack: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'ai' | 'data' | 'other';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Skill {
  _id?: string;
  title: string;
  icon: string;
  skills: string[];
  count: number;
  featured: boolean;
}

export interface User {
  _id?: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt?: Date;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt?: Date;
}
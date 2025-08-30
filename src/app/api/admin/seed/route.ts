import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Project from '@/models/Project';
import Skill from '@/models/Skill';

export async function POST() {
  try {
    await connectDB();

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });
    }

    // Create sample skills
    const skillsExist = await Skill.countDocuments();
    if (skillsExist === 0) {
      await Skill.insertMany([
        {
          title: 'Frontend Developer',
          icon: '💻',
          count: 1,
          featured: true,
          skills: [
            'React.js & Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Framer Motion',
            'Responsive Design',
            'State Management',
            'Performance Optimization'
          ]
        },
        {
          title: 'Backend Developer',
          icon: '⚙️',
          count: 2,
          featured: true,
          skills: [
            'Node.js & Express.js',
            'MongoDB & PostgreSQL',
            'REST APIs & GraphQL',
            'Authentication & JWT',
            'Microservices',
            'Database Design',
            'API Security'
          ]
        },
        {
          title: 'AI/ML Engineer',
          icon: '🤖',
          count: 3,
          featured: true,
          skills: [
            'Machine Learning',
            'Deep Learning',
            'TensorFlow & PyTorch',
            'Natural Language Processing',
            'Computer Vision',
            'Model Deployment',
            'Data Preprocessing'
          ]
        },
        {
          title: 'Data Scientist',
          icon: '📊',
          count: 4,
          featured: true,
          skills: [
            'Data Analysis',
            'Statistical Modeling',
            'Python & R',
            'Data Visualization',
            'Big Data Technologies',
            'Predictive Analytics',
            'Business Intelligence'
          ]
        },
        {
          title: 'DevOps Engineer',
          icon: '🚀',
          count: 5,
          featured: true,
          skills: [
            'Docker & Kubernetes',
            'AWS & Azure',
            'CI/CD Pipelines',
            'Infrastructure as Code',
            'Monitoring & Logging',
            'Linux Administration',
            'Security Best Practices'
          ]
        },
        {
          title: 'UI/UX Designer',
          icon: '🎨',
          count: 6,
          featured: true,
          skills: [
            'User Experience Design',
            'User Interface Design',
            'Figma & Adobe XD',
            'Prototyping',
            'Design Systems',
            'User Research',
            'Accessibility'
          ]
        }
      ]);
    }

    // Create sample projects
    const projectsExist = await Project.countDocuments();
    if (projectsExist === 0) {
      await Project.insertMany([
        {
          title: 'AI-Powered Task Manager',
          name: 'ai-task-manager',
          description: 'An intelligent task management application that uses AI to prioritize tasks, suggest optimal scheduling, and provide productivity insights.',
          detailedDescription: 'This project combines modern web development with artificial intelligence to create a smart task management system. The AI analyzes user behavior patterns, task completion rates, and deadlines to provide intelligent recommendations. Built with Next.js for the frontend, Node.js for the backend, and TensorFlow.js for client-side AI processing.',
          techStack: ['Next.js', 'TypeScript', 'TensorFlow.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
          images: [
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
          ],
          githubUrl: 'https://github.com/YogeshKumar-saini/ai-task-manager',
          liveUrl: 'https://ai-task-manager.vercel.app',
          featured: true,
          category: 'ai'
        },
        {
          title: 'E-Commerce Platform',
          name: 'modern-ecommerce',
          description: 'A full-featured e-commerce platform with advanced search, real-time inventory, and seamless payment integration.',
          detailedDescription: 'A comprehensive e-commerce solution built with modern technologies. Features include advanced product search with filters, real-time inventory management, secure payment processing with Stripe, order tracking, and an admin dashboard for complete store management.',
          techStack: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe', 'Redis', 'Tailwind CSS'],
          images: [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
          ],
          githubUrl: 'https://github.com/YogeshKumar-saini/modern-ecommerce',
          liveUrl: 'https://modern-ecommerce.vercel.app',
          featured: true,
          category: 'web'
        },
        {
          title: 'Data Analytics Dashboard',
          name: 'analytics-dashboard',
          description: 'A comprehensive analytics dashboard for visualizing complex datasets with interactive charts and real-time updates.',
          detailedDescription: 'An advanced data visualization platform that transforms raw data into actionable insights. Features interactive charts, real-time data streaming, custom report generation, and machine learning-powered trend analysis. Built with React, D3.js, and Python backend.',
          techStack: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'],
          images: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
          ],
          githubUrl: 'https://github.com/YogeshKumar-saini/analytics-dashboard',
          liveUrl: 'https://analytics-dashboard.vercel.app',
          featured: false,
          category: 'data'
        },
        {
          title: 'Real-Time Chat Application',
          name: 'realtime-chat',
          description: 'A modern chat application with real-time messaging, file sharing, and video calling capabilities.',
          detailedDescription: 'A feature-rich communication platform supporting real-time messaging, file sharing, voice and video calls, group chats, and message encryption. Built with Socket.io for real-time communication and WebRTC for peer-to-peer video calls.',
          techStack: ['Next.js', 'Socket.io', 'WebRTC', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
          images: [
            'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop'
          ],
          githubUrl: 'https://github.com/YogeshKumar-saini/realtime-chat',
          liveUrl: 'https://realtime-chat.vercel.app',
          featured: true,
          category: 'web'
        }
      ]);
    }

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}